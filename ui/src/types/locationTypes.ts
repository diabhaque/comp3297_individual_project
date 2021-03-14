export type Location = {
    name: string;
    populationSize: number;
    apiEndpoint: string;
    resourceURL: string;
};

export type LocationData = {
    "As of time": string,
    "As of date": string,
    "Number of cases fulfilling the reporting criteria": string,
    "Number of cases still hospitalised for investigation": string,
    "Number of confirmed cases": number,
    "Number of death cases": number,
    "Number of discharge cases": number,
    "Number of hospitalised cases in critical condition": number,
    "Number of probable cases": number,
    "Number of ruled out cases": string
}