import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import IDnd5eApiReference from '../models/IDnd5eApiReference';
import { getConditions } from '../resources/dndapi';


interface IConditionProps {
    conditions: any[];
    onChange: (conditions: any[]) => void;
}

const Conditions = ({ conditions = [], onChange }: IConditionProps) => {
    const [allConditions, setAllConditions] = useState<any[]>([]);
    useEffect(() => {
        getConditions()
            .then(conditions => conditions
                .map((condition: IDnd5eApiReference) =>
                    ({ value: condition.index, label: condition.name })))
            .then(c => {
                setAllConditions(c);
            })
            ;
    }, []);
    return (<Select
        size="small"
        mode="multiple"
        showArrow
        allowClear
        style={{ width: '180px' }}
        placeholder="Select Condition"
        value={conditions || []}
        onChange={onChange}
        options={allConditions}
    />

    );
}

export default Conditions;