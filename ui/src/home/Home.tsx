import { useEffect, useState } from "react";
import { Location, LocationData, NewLocationData } from "../types/locationTypes";
import { addLocation, getLocations, getLocationData, getNewLocationData } from "../client/requests";
import { AddLocationModal } from "./AddLocationModal";
import { LocationDataTable } from "./LocationDataTable";
import { LocationSelector } from "./LocationSelector";
import { notification } from 'antd';
import "antd/dist/antd.css";
import { ValueType } from "rc-input-number/lib/utils/MiniDecimal";
import { IconType } from "antd/lib/notification/index";

const openNotificationWithIcon = (type: IconType, title: string, body: string) => {
    notification[type]({
      message: title,
      description: body,
      placement: 'bottomLeft'
    });
  };

export const Home = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location | null>(
        null
    );
    const [
        currentLocationData,
        setCurrentLocationData
    ] = useState<NewLocationData | null>(null);

    useEffect(() => {
        let isCancelled = false;

        getLocations().then((r) => {
            if (!isCancelled && r) {
                setLocations(r);
                setCurrentLocation(
                    r.filter((location) => location.name === "Hong Kong")[0]
                );
            }else{
                openNotificationWithIcon('error', 'Error', 'Unable to retrieve location data!')
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        if (currentLocation) {
            getNewLocationData(currentLocation).then((r)=>{
                if (r !== null) {
                    setCurrentLocationData(r[0]);
                } else {
                    console.log("Could not retrieve location data!");
                    openNotificationWithIcon('error', 'Error', 'Unable to retrieve location data!')
                }
            })
        }
    }, [currentLocation]);

    const onLocationSelectorChange = (value: ValueType) => {
        setCurrentLocation(
            locations.filter(
                (location) => location.name === value.toString()
            )[0]
        );
    };

    const onAddLocationSubmit = (location: Location) => {
        // CHECK FOR CORRECT RESPONSE
        addLocation(location).then((r) => {
            if (r) {
                setLocations(locations.concat([r]));
            } else {
                console.log("Error!");
                openNotificationWithIcon('error', 'Error', 'Unable to add location to database!')
            }
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    fontSize: "50px",
                    fontWeight: "bolder"
                }}
            >
                Cov Retrieve
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingBottom: "1vh",
                    paddingTop: "1vh",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black"
                }}
            >
                <LocationSelector
                    locations={locations}
                    onChange={onLocationSelectorChange}
                />
                <AddLocationModal onSubmit={onAddLocationSubmit} />
            </div>

            <div>
                {currentLocationData && (
                    <LocationDataTable locationData={currentLocationData} />
                )}
            </div>
        </div>
    );
};
