import React from 'react';

export interface IObscureDataContext {
    isObscured: boolean;
    toggleIsObscured: () => void;
}
export const ObscureDataContext = React.createContext<IObscureDataContext>({
    isObscured: true,
    toggleIsObscured: () => { },
});