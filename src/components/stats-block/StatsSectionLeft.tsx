import { isEmpty } from 'lodash';
import * as React from 'react';
import IMonster from '../../models/Monster';
import { GenericApiReferences } from '../GenericApiReference';
import AbilityStats from './AbilityStats';
import KeyedList from './KeyedList';
import NameDescItem from './NameDescItem';
import Property from './Property';
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
                <div>
                    <Property title={'Armor Class'}>
                        {monster?.armor_class}
                    </Property>
                    <Property title={'Hit Points'}>
                        {monster?.hit_points}
                    </Property>
                    <Property title={'Speed'}>
                        <KeyedList value={monster?.speed}></KeyedList>
                    </Property>
                </div>
                <TopStatsSeparator />
                <div className="abilities">
                    <AbilityStats monster={monster} />
                </div>
                <TopStatsSeparator />
                <div>
                    <Property title={'Damage Immunities'}>
                        {monster?.damage_immunities}
                    </Property>
                    <Property title={'Condition Immunities'}>
                        {!isEmpty(monster?.condition_immunities) &&
                            <GenericApiReferences value={monster?.condition_immunities} />}
                    </Property>
                    <Property title={'Senses'}>
                        <KeyedList value={monster?.senses} />
                    </Property>
                    <Property title={'Languages'}>
                        {monster?.languages}
                    </Property>
                    <Property title={'Challenge rating'}>
                        {monster?.challenge_rating}
                    </Property>
                </div>
            </div>
            <TopStatsSeparator />

            {(monster?.special_abilities || [])
                .map((ability, index) => <NameDescItem key={index} value={ability} />)}
        </>);
}
