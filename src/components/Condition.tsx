import { Popover, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import IDnd5eApiReference from '../models/IDnd5eApiReference';
import { getConditions, getCondition } from '../resources/dndapi';

// function tagRender(props: any) {
//     const { label, value, closable, onClose } = props;
//     const [conditionDescription, setConditionDescription] = useState<string>('-');
//     useEffect(() => {
//         getCondition(value)
//             .then(condition => setConditionDescription(condition.desc.join(', ')));
//     }, []);
//     return (
//         <Popover
//             content={<>{conditionDescription}</>}
//         >
//             <Tag

//                 closable={closable}
//                 onClose={onClose}
//             >
//                 {label}
//             </Tag>
//         </Popover>
//     );
// }
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
        mode="multiple"
        showArrow
        allowClear
        // tagRender={tagRender}
        style={{ width: '180px' }}
        placeholder="Select Condition"
        value={conditions || []}
        onChange={onChange}
        options={allConditions}
    />

        // {
        //     conditions.map((available: string) => {
        //         return <Select.Option key={available} value={available}>{available}</Select.Option>;
        //     })
        // }
    );
}

export default Conditions;