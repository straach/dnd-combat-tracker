import { Card, InputNumber, Popover } from 'antd';
import React, { useContext } from 'react';
import { IObscureDataContext, ObscureDataContext } from '../obscure-data-context';

const PopoverContent = ({ title, value, onChange, units }: IStatItem) => {
    return <Card title={title} bordered={false} >
        <InputNumber size="large" value={value} onChange={onChange} style={{ width: 50 }} /> {units}
    </Card>

}
interface IStatItem {
    title: string;
    value: number;
    units: string;
    onChange: (newVal: number) => void;
}
const StatItem = ({ title, value, units, onChange }: IStatItem) => {
    const { isObscured } = useContext<IObscureDataContext>(ObscureDataContext);
    return (<div style={{ marginLeft: 10, textAlign: 'center', fontSize: 16, width: 170 }}>
        {isObscured ?
            <Popover content={<PopoverContent title={title} value={value} units={units} onChange={onChange} />}>
                {title}
            </Popover> :
            <>{title}: <InputNumber size="small" value={value} onChange={onChange} style={{ width: 50, marginLeft: 10 }} /> {units}</>
        }
    </div >);
}

export default StatItem;