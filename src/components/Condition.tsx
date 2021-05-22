import React, { useState, FunctionComponent } from 'react';
import { Select } from 'antd';

const Conditions: FunctionComponent<any> = ({ activeConditions = [], availableConditions = [], onChange }) => {
    return (<Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Select Condition"
        onChange={onChange}
    >
        {availableConditions.map((available: string) => {
            return <Select.Option key={available} value={available}>{available}</Select.Option>;
        })}
    </Select >
    );
}

export default Conditions;