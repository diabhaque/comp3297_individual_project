import { Cascader } from "antd";
import { CascaderOptionType, CascaderValueType } from "antd/lib/cascader/index";
import { Location } from "../types/locationTypes";

interface LocationCascaderProps {
    locations: Location[];
    onChange: (value: CascaderValueType) => void;
}

export const LocationCascader = ({
    locations,
    onChange
}: LocationCascaderProps) => {
    const options = (locations: Location[]): CascaderOptionType[] =>
        locations.map((location) => {
            return {
                value: location.name,
                label: location.name
            };
        });

    const filter = (inputValue: string, path: any[]) => {
        return path.some(
            (option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );
    };

    return (
        <Cascader
            options={options(locations)}
            onChange={onChange}
            placeholder="Hong Kong"
            showSearch={{ filter }}
            defaultValue={["Hong Kong"]}
        />
    );
};
