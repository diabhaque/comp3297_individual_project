export type Location = {
    name: string;
    populationSize: number;
    apiEndpoint: string;
    resourceURL: string;
};

export type LocationData = {
    "As of time": string;
    "As of date": string;
    "Number of cases fulfilling the reporting criteria": string;
    "Number of cases still hospitalised for investigation": string;
    "Number of confirmed cases": number;
    "Number of death cases": number;
    "Number of discharge cases": number;
    "Number of hospitalised cases in critical condition": number;
    "Number of probable cases": number;
    "Number of ruled out cases": string;
};

export type NewLocationData = {
    "Name of Location": string;
    "As of date": string;
    "Total number of confirmed cases": number;
    "Total number of confirmed cases per million of the population": number;
    "Total number of fatalities": number;
    "Total number of fatalities per million of population": number;
    "Number of new cases today": number;
    "7-day average number of new cases": number;
    "Number of new fatalities today": number;
    "7-day average number of new fatalities": number;
};
