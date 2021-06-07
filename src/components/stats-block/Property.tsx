import { isEmpty, isNumber } from 'lodash';
import React from 'react';

export interface IPropertyProps {
    title: string;
    children: any;
}

export default function Property({ title, children }: IPropertyProps) {
    if (!isNumber(children) && children != null && isEmpty(children)) return null;
    return (
        <div className="property-line">
            <h4>{title}: </h4>
            <p>{children}</p>
        </div>
    );
}
