import React from 'react';
import { Select } from 'antd';

const CustomSelect = ({placeholder, options, setChooseId, setIsLoading, width, setLabelValue}) => {
    const onChange = (value, obj) => {
        if(setIsLoading){
            setIsLoading(true);
            value ? setTimeout(() => setChooseId(value), 1000) : setTimeout(() => setChooseId(""), 1000)
        }
        if(setLabelValue){
            setLabelValue(obj.label);
            setChooseId(value);
            console.log(obj.label)
        }
        else{
            setChooseId(value);
        }
    };

    return (
        <Select
            style={{width: `${width}`}}
            showSearch
            allowClear
            size='large'
            placeholder={placeholder}
            optionFilterProp="label"
            onChange={onChange}
            options={options}
        />
    )
};
export default CustomSelect;