import * as React from 'react';
import IMonster from '../../models/IMonster';
import { GenericApiReferences } from '../GenericApiReference';
import AbilityStats from './AbilityStats';
import KeyedList from './KeyedList';
import NameDescItem from './NameDescItem';
import TopStatsSeparator from './TopStatsSeparator';

export interface IStatsSectionLeftProps {
    monster?: IMonster;
}

export function StatsSectionLeft(props: IStatsSectionLeftProps) {
    const { monster } = props;
    return (
        <><div className="creature-heading">
            <h1>{monster?.name}</h1>
            <h2>{monster?.size} {monster?.type}{monster?.subtype && ` (${(monster?.subtype)})`}, {monster?.alignment}</h2>
        </div>
            <TopStatsSeparator />
            <div className="top-stats">
                <div className="property-line first">
                    <h4>Armor Class: </h4>
                    <p>{monster?.armor_class}</p>
                </div>
                <div className="property-line">
                    <h4>Hit Points: </h4>
                    <p>{monster?.hit_points}</p>
                </div>
                <div className="property-line last">
                    <h4>Speed: </h4>
                    <p><KeyedList value={monster?.speed} /></p>
                </div>
                <TopStatsSeparator />
                <div className="abilities">
                    <AbilityStats monster={monster} />
                </div>
                <TopStatsSeparator />
                <div className="property-line first">
                    <h4>Damage Immunities: </h4>
                    <p>{monster?.damage_immunities}</p>
                </div>
                <div className="property-line">
                    <h4>Condition Immunities: </h4>
                    <p><GenericApiReferences value={monster?.condition_immunities} />
                    </p>
                </div>
                <div className="property-line">
                    <h4>Senses: </h4>
                    <p><KeyedList value={monster?.senses} /></p>
                </div>
                <div className="property-line">
                    <h4>Languages: </h4>
                    <p>{monster?.languages}</p>
                </div>
                <div className="property-line last">
                    <h4>Challenge rating: </h4>
                    <p>{monster?.challenge_rating}</p>
                </div>
            </div>
            <TopStatsSeparator />

            {(monster?.special_abilities || [])
                .map(ability => <NameDescItem value={ability} />)}
        </>);
}
