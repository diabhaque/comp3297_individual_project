import { Location, LocationData } from "../types/locationTypes";
import { getHostName } from "./utils";

export const getLocations = (): Promise<Location[] | null> => {
    const url = new URL(`https://${getHostName()}/api/locations`);
    const request = new Request(url.toString());

    return fetch(request)
        .then((r) => r.json())
        .then((r) => r as Location[])
        .catch((err) => {
            console.log(err)
            return null
        });
};

export const addLocation = (location: Location): Promise<Location | null> => {
    const request = new Request(`https://${getHostName()}/api/locations/`, {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(location)
    });

    let ok = false;
    return fetch(request)
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as Location;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err)
            return null
        });
};

export const getLocationData = (location: Location): Promise<LocationData[] | null> => {
    let params = {
        "q": JSON.stringify({
            "resource":location.resourceURL,
            "section": 1,
            "format":"json",
            "filters":[
                [1, "eq", ["01/03/2021"]]
            ]
        })
    }
    const url = new URL(location.apiEndpoint + '?' + new URLSearchParams(params).toString())
    const request = new Request(url.toString());

    let ok = false;
    return fetch(request)
        .then((r) => {
            ok = r.ok;
            return r.json();
        })
        .then((r) => {
            if (ok) {
                return r as LocationData[];
            } else {
                return null;
            }
        })
        .catch((err)=>{
            console.log(err)
            return null
        });
};
