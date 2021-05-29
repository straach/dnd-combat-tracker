import { Button, Input, Popover, Space } from 'antd';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsArrowsCollapse, BsPersonFill } from "react-icons/bs";
import { GiDeathSkull, GiEvilMinion } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import styled from 'styled-components';
import { IActionableCharacter } from '../models/ActionableCharacter';
import Monster from '../models/Monster';
import Player from '../models/Player';
import Box from './CharacterBox';
import Conditions from './Condition';
import StatItem from './StatItem';
import StatsBlockWide from './stats-block/StatsBlockWide';

const CharacterName = styled.div`
    font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
    color: #000;
    font-size: 16px;
    line-height: 1.2em;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-weight: bold;
    margin-left: 15px;
    flex: 0.5 1 500px;
    align-self: center;
    display: flex;
`;

const HealthBar = styled.div`
    flex: 0 0 20px;
    align-self: auto;
    height: 100%;
`;
interface IHealthStatusProps {
    hit_points: number;
    max_hit_points: number;
}
const HealthStatus = ({ hit_points, max_hit_points }: IHealthStatusProps) => {
    const percentageOf = (percentage: number, ofMaximum: number) => {
        return ofMaximum / 100 * percentage;
    }
    return <HealthBar
        style={{
            backgroundColor: (hit_points <= percentageOf(10, max_hit_points) ? '#BB2020' :
                (hit_points <= percentageOf(50, max_hit_points) ? 'yellow'
                    : 'green'))
        }}>
    </HealthBar >;
}
interface TypeLogoProps {
    value: IActionableCharacter;
}
const TypeLogo = ({ value }: TypeLogoProps) => {
    if (value instanceof Player) {
        return <BsPersonFill size={40} />
    }
    return <GiEvilMinion size={40} />
}
interface IEncounterCharacter {
    value: IActionableCharacter;
    isActive: boolean;
    hasTurn: boolean;
    onPrev: () => void;
    onNext: () => void;
    onChange: (char: IActionableCharacter) => void;
    onRemove: () => void;
}
const CharacterInEncounter = ({ value, hasTurn, isActive, onPrev, onNext, onRemove, onChange }: IEncounterCharacter) => {
    const handleHitPointsChange = (hitPoints: number) => {
        value.changeHitPoints(hitPoints);
        onChange(value);
    }
    const handleArmorClassChange = (hitPoints: number) => {
        // value.change(hitPoints);
        // onChange();
        //armorClass => onChange({ ...value, armor_class: armorClass })
    }
    const handleCommentChange = (event: any) => {
        value.changeComment(event.target.value);
        onChange(value);
    }
    const handleConditionChange = (conditions: any[]) => {
        value.changeConditions(conditions);
        onChange(value);
    }
    const isMonster = value instanceof Monster;
    const [showComments, setShowComments] = useState(false);
    return (<><Box style={{ transform: hasTurn ? 'scale(1.05, 1.05)' : 'none', opacity: ((value.hit_points || 0) <= 0 ? 0.3 : 1) }}>
        <HealthStatus hit_points={value.hit_points || 0} max_hit_points={value.max_hit_points}></HealthStatus>
        <CharacterName >
            <TypeLogo value={value} />{value.name} ({value.iniciative})</CharacterName>
        <CharacterName >
            <StatItem title="AC" value={value.armor_class || 0} onChange={handleArmorClassChange} />
            <StatItem title="Health" value={value.hit_points || 0} onChange={handleHitPointsChange} />
        </CharacterName>
        <CharacterName >
            <Conditions conditions={value.conditions} onChange={handleConditionChange} />
        </CharacterName>
        <CharacterName >
            <Space>
                <GiDeathSkull size={30} onClick={() => handleHitPointsChange(0)} title="InstaKill"/> 
            {isMonster && <Popover
                content={<StatsBlockWide monster={value as Monster} />}>
                <IoMdListBox title="stats" size={35} />
            </Popover>}
            <BsArrowsCollapse size={30} title="Show comment" onClick={() => setShowComments(!showComments)} />
            </Space>
        </CharacterName>
        {hasTurn && isActive && <CharacterName>
            <Button onClick={() => onPrev()}>prev</Button>
            <Button onClick={() => onNext()} type="primary">next</Button>
        </CharacterName>}
        {!isActive && <CharacterName >
            <Button onClick={onRemove} ><AiOutlineDelete title="Delete" size={30} /></Button>
        </CharacterName>}
    </Box>
        {showComments && <Box>Comment: <Input.TextArea value={value.comment} onChange={handleCommentChange} /></Box>}
    </>
    );
}

export default CharacterInEncounter;