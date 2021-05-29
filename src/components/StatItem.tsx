import { Card, InputNumber, Popover } from 'antd';
import React, { useContext } from 'react';
import { IObscureDataContext, ObscureDataContext } from '../obscure-data-context';

interface IPopoverContent {
    value: number;
    onChange: (newVal: number) => void;
}
const PopoverContent = ({ title, value, onChange }: IStatItem) => {
    return <Card title={title} bordered={false} >
        <InputNumber size="large" value={value} onChange={onChange} style={{ width: 50 }} />
    </Card>

}
interface IStatItem {
    title: string;
    value: number;
    onChange: (newVal: number) => void;
}
const StatItem = ({ title, value, onChange }: IStatItem) => {
    const { isObscured } = useContext<IObscureDataContext>(ObscureDataContext);
    return (<div style={{ width: 60, border: 'solid 1px', height: 50, marginRight: 20, textAlign: 'center' }}>
        <div>{title}</div>
        {isObscured ? <Popover content={<PopoverContent title={title} value={value} onChange={onChange} />}>
            ---
        </Popover> :
            <InputNumber size="small" value={value} onChange={onChange} style={{ width: 50 }} />}
    </div >);
}

export default StatItem;