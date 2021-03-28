import { Select } from "antd";
import { ValueType } from "rc-input-number/lib/utils/MiniDecimal";
import { Location } from "../types/locationTypes";

interface LocationSelectorProps {
    locations: Location[];
    onChange: (value: ValueType) => void;
}

const { Option } = Select;

export const LocationSelector = ({
    locations,
    onChange
}: LocationSelectorProps) => {

    const options = locations.map((location)=><Option key={location.name} value={location.name}>{location.name}</Option>)

    return (
        <Select
            showSearch
            style={{ width: 200 }}
            onChange={onChange}
            defaultValue={undefined}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
                option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
                optionA.value.toLowerCase().localeCompare(optionB.value.toLowerCase())
            }
        >
            {options}
        </Select>
    );
};
