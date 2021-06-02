import { Button, Col, Divider, Input, Popover, Space } from 'antd';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GiDeathSkull } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import styled from 'styled-components';
import { IActionableCharacter } from '../models/ActionableCharacter';
import Monster from '../models/Monster';
import Conditions from './Condition';
import ExpandableCharacterBox from './ExpandableCharacterBox';
import StatItem from './StatItem';
import StatsBlockWide from './stats-block/StatsBlockWide';

const VerticalCenterContentCol = styled(Col)`
    display: flex;
    align-items: center;
`;

interface IEncounterCharacter {
    value: IActionableCharacter;
    isActive: boolean;
    hasTurn: boolean;
    onChange: (char: IActionableCharacter) => void;
    onRemove: () => void;
}

const CharacterInEncounter = ({ value, hasTurn, isActive, onRemove, onChange }: IEncounterCharacter) => {
    const handleHitPointsChange = (hitPoints: number) => {
        value.changeHitPoints(hitPoints);
        onChange(value);
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
    return (<ExpandableCharacterBox
        hasHealthStats={isMonster}
        isPlayer={!isMonster}
        max_hit_points={value.max_hit_points}
        hit_points={value.hit_points}
        collapsedArea={<Input.TextArea
            style={{ width: '100%', marginLeft: 20, backgroundColor: '#f0f0f0' }}
            placeholder="Comment"
            value={value.comment}
            onChange={handleCommentChange} />}
        style={{
            transform: hasTurn ?
                'scale(1.05, 1.05)' :
                'none',
            opacity: ((value.hit_points || 0) <= 0 ? 0.3 : 1)
        }}>
        <VerticalCenterContentCol span={8}>
            {value.name}  <Divider type="vertical" />{value.iniciative}
            {isMonster && <>
                <Divider type="vertical"></Divider><Popover
                    content={<StatsBlockWide monster={value as Monster} />}>
                    <IoMdListBox title="stats" size={35} />
                </Popover></>}
        </VerticalCenterContentCol>
        <VerticalCenterContentCol span={7} >
            <Conditions conditions={value.conditions} onChange={handleConditionChange} />
        </VerticalCenterContentCol>
        <VerticalCenterContentCol span={7} >
            {isMonster && <StatItem title="Health" value={value.hit_points || 0} units={'HP'} onChange={handleHitPointsChange} />}
        </VerticalCenterContentCol>
        <VerticalCenterContentCol span={1}>
            {isActive ? <Button size="large" onClick={() => handleHitPointsChange(0)} title="InstaKill">
                <GiDeathSkull size={30} />
            </Button> :
                <Button onClick={onRemove} size="large" ><AiOutlineDelete title="Delete" size={30} /></Button>
            }
        </VerticalCenterContentCol>
    </ExpandableCharacterBox>
    );
}

export default CharacterInEncounter;