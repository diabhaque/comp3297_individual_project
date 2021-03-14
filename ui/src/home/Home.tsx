import { useEffect, useState } from "react";
import { Location, LocationData } from "../types/locationTypes";
import { addLocation, getLocations, getLocationData } from "../client/requests";
import { AddLocationModal } from "./AddLocationModal";
import { LocationDataTable } from "./LocationDataTable";
import { LocationSelector } from "./LocationSelector";
import "antd/dist/antd.css";
import { ValueType } from "rc-input-number/lib/utils/MiniDecimal";

export const Home = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location | null>(
        null
    );
    const [
        currentLocationData,
        setCurrentLocationData
    ] = useState<LocationData | null>(null);

    useEffect(() => {
        let isCancelled = false;

        getLocations().then((r) => {
            if (!isCancelled) {
                setLocations(r);
                setCurrentLocation(
                    r.filter((location) => location.name === "Hong Kong")[0]
                );
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        if (currentLocation !== null) {
            getLocationData(currentLocation).then((r) => {
                if (r !== null) {
                    setCurrentLocationData(r[0]);
                } else {
                    console.log("Could not retrieve location data!");
                }
            });
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
            if (r !== null) {
                setLocations(locations.concat([r]));
            } else {
                console.log("Error!");
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
