import React, { useState } from 'react';
import Game from './Game';
import { ObscureDataContext } from './obscure-data-context';

export interface IAppProps {
}

export function App(props: IAppProps) {
    const [isObscured, setIsObscured] = useState<boolean>(true);
    const toggleIsObscured = () => {
        setIsObscured(!isObscured);
    }

    return (
        <ObscureDataContext.Provider value={{ isObscured, toggleIsObscured }}>
            <Game />
        </ObscureDataContext.Provider>

    );
}
