import * as React from 'react';
import IMonster from '../../models/IMonster';
import AbilityScore from './AbilityScore';

interface IAbilityStatsProps {
    monster?: IMonster;
}

const AbilityStats: React.FunctionComponent<IAbilityStatsProps> = ({ monster }) => {
    return <><div className="ability-strength">
        <h4>STR</h4>
        <p><AbilityScore total={monster?.strength} /></p>
    </div>
        <div className="ability-dexterity">
            <h4>DEX</h4>
            <p><AbilityScore total={monster?.dexterity} /></p>
        </div>
        <div className="ability-constitution">
            <h4>CON</h4>
            <p><AbilityScore total={monster?.constitution} /></p>
        </div>
        <div className="ability-intelligence">
            <h4>INT</h4>
            <p><AbilityScore total={monster?.intelligence} /></p>
        </div>
        <div className="ability-wisdom">
            <h4>WIS</h4>
            <p><AbilityScore total={monster?.wisdom} /></p>
        </div>
        <div className="ability-charisma">
            <h4>CHA</h4>
            <p><AbilityScore total={monster?.charisma} /></p>
        </div></>;
};

export default AbilityStats;
