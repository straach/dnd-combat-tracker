import * as React from 'react';
import { INameDescItem } from '../../models/Monster';
import NameDescItem from './NameDescItem';

export interface IActionsProps {
    title: string;
    value?: INameDescItem[];
}

function StatActions(props: IActionsProps) {
    const { title, value } = props;
    if (!value || value.length <= 0) {
        return <></>;
    }
    return (
        <div className="actions">
            <h3>{title}</h3>
            {value.map((action, index) => <NameDescItem key={index} value={action} />)}
        </div>
    );
}
export default StatActions;