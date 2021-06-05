import React from 'react';
import IDnd5eApiReference from "../models/IDnd5eApiReference";

interface IGenericApiReference {
    value?: IDnd5eApiReference;
}
interface IGenericApiReferences {
    value?: IDnd5eApiReference[];
}
const GenericApiReference = ({ value }: IGenericApiReference) => {
    return <span>{value && value.name}</span>
}

export const GenericApiReferences = ({ value }: IGenericApiReferences) => {
    const together = (value || []).map(v => v.name).join(', ');
    return <span>{together}</span>
}

export default GenericApiReference;