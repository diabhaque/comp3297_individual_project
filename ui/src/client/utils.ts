import { LocationData, NewLocationData, Location } from "../types/locationTypes";

export const getHostName = (): string => {
    return "cov-retrieve.herokuapp.com"; 
    // return "localhost:8000"
};

export const produceNewLocationData = (location: Location, r: any): NewLocationData[] | null =>{
    const pastEight: LocationData[] = r.slice(-8)
    const main: LocationData = pastEight[pastEight.length - 1]
    console.log(main)

    return [{
        "Name of Location": location.name,
        "As of date": main["As of date"],
        "Total number of confirmed cases": main["Number of confirmed cases"],
        "Total number of confirmed cases per million of the population": main["Number of confirmed cases"]/location.populationSize,
        "Total number of fatalities": main["Number of death cases"],
        "Total number of fatalities per million of population": main["Number of death cases"]/location.populationSize,
        "Number of new cases today": main["Number of confirmed cases"] - pastEight[pastEight.length - 2]["Number of confirmed cases"],
        "7-day average number of new cases": (main["Number of confirmed cases"] - pastEight[0]["Number of confirmed cases"]) / 7,
        "Number of new fatalities today": main["Number of death cases"] - pastEight[pastEight.length - 2]["Number of death cases"],
        "7-day average number of new fatalities": (main["Number of death cases"] - pastEight[0]["Number of death cases"]) / 7
    }]
}