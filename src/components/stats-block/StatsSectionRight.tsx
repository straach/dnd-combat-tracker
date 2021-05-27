import * as React from 'react';
import IMonster from '../../models/Monster';
import NameDescItem from './NameDescItem';
import StatActions from './StatActions';

export interface IStatsSectionRightProps {
    monster?: IMonster;
}

export function StatsSectionRight
    (props: IStatsSectionRightProps) {
    const { monster } = props;
    return (<>
        <StatActions title={'Actions'} value={monster?.actions} />
        <StatActions title={'Legendary Actions'} value={monster?.legendary_actions} />
    </>
    );
}
