import React, { useState, FunctionComponent } from 'react';
import { InputNumber } from 'antd';

interface IStatItem {
    title: string;
    value: number;
    isHidden: boolean;
    onChange: (newVal: number) => void;
}
const StatItem: FunctionComponent<IStatItem> = ({ title, value, onChange, isHidden }) => {
    return (<div style={{ width: 60, border: 'solid 1px', height: 50, marginRight: 20 }}>
        <div>{title}</div>
        <div><InputNumber size="small" value={value} onChange={onChange} style={{ width: 50 }} /></div>
    </div>);
}

export default StatItem;