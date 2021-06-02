import { Card, InputNumber, Popover } from 'antd';
import React, { useContext } from 'react';
import { IObscureDataContext, ObscureDataContext } from '../obscure-data-context';

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
    return (<div style={{ marginLeft: 10, textAlign: 'center', fontSize: 16 }}>
        <div>
            {isObscured ?
                <Popover content={<PopoverContent title={title} value={value} onChange={onChange} />}>
                    {title}
                </Popover> :
                <>{title}: <InputNumber size="small" value={value} onChange={onChange} style={{ width: 50, marginLeft: 10 }} /> HP</>
            }
        </div ></div>);
}

export default StatItem;