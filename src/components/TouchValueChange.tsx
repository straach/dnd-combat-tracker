import { Button, InputNumber, InputNumberProps } from 'antd';
import * as React from 'react';

export type ITouchValueChangeProps = InputNumberProps<number> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<HTMLInputElement> | undefined;
} & {
    title?: string
}
export function TouchValueChange(props: ITouchValueChangeProps) {
    const {onChange, size, value} = props;
    const onReduce = () => {
        onChange?.((value && value > 0) ? value-1 : 0);
    }
    const onIncrease = () => {
        onChange?.((value) ? value+1 : 1);
    }
    return (
        <>
            <Button size={size} onClick={onReduce}>-</Button>
            <InputNumber
                {...props}
            /> 
            <Button size={size} onClick={onIncrease} type="primary">+</Button>
        </ >
    );
}
