import { Table } from "antd";
import { LocationData, NewLocationData } from "../types/locationTypes";

interface LocationDataTableProps {
    locationData: NewLocationData;
}

export const LocationDataTable = ({ locationData }: LocationDataTableProps) => {
    const columns = Object.keys(locationData).map((field) => {
        return {
            title: field,
            dataIndex: field,
            key: field
        };
    });

    return (
        <Table dataSource={[{ ...locationData, key: 1 }]} columns={columns} pagination={false}/>
    );
};
