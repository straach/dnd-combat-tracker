import { Card, Popover } from 'antd';
import React from 'react';
import { TouchValueChange } from './TouchValueChange';

const PopoverContent = ({ title, value, onChange, units }: IStatItem) => {
    return <Card title={title} bordered={false} >
        <TouchValueChange size="large" value={value} onChange={onChange} style={{ width: 55 }} /> {units}
    </Card>

}
interface IStatItem {
    title: string;
    value: number;
    units: string;
    onChange: (newVal: number) => void;
}
const StatItem = ({ title, value, units, onChange, isOnHoverView }: IStatItem & {isOnHoverView: boolean}) => {
    return (<div style={{ marginLeft: 10, textAlign: 'center', fontSize: 16, width: 170 }}>
        {isOnHoverView ? <span style={{ cursor: 'pointer' }}>
            <Popover
                content={<PopoverContent
                    title={title}
                    value={value}
                    units={units}
                    onChange={onChange} />} >
                {title}
            </Popover> </span> :
            <>{title}:<br/> <TouchValueChange
                size="small"
                value={value}
                onChange={onChange}
                style={{ width: 50, marginLeft: 5 }}
            /> </>
        }
    </div >);
}

export default StatItem;