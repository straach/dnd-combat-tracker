import { Button, Col, Divider, Input, Popover, Row } from 'antd';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaFirstAid } from 'react-icons/fa';
import { ImAidKit } from 'react-icons/im';
import { BsPersonFill } from 'react-icons/bs';
import { GiDeathSkull, GiEvilMinion, GiHealthNormal } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import { IActionableCharacter } from '../models/ActionableCharacter';
import Monster from '../models/Monster';
import Conditions from './Condition';
import ExpandableCharacterBox from './ExpandableCharacterBox';
import StatItem from './StatItem';
import StatsBlockWide from './stats-block/StatsBlockWide';

const { Col: CenteredCol } = ExpandableCharacterBox;

interface IQuickActionButton {
    isActive: boolean;
    isAlive: boolean;
    onInstaKill: () => void;
    onRevive: () => void;
    onRemove: () => void;
}
const QuickActionButton = ({ isActive, isAlive, onInstaKill, onRevive, onRemove }: IQuickActionButton) => {
    const instaKill = <Button size="large" onClick={onInstaKill} title="InstaKill">
        <GiDeathSkull size={30} />
    </Button>;
    const revive = <Button size="large" onClick={onRevive} title="Revive">
        <ImAidKit title="Revive" size={30} />
    </Button>;
    const deleteBtn = <Button onClick={onRemove} size="large" title="Delete" ><AiOutlineDelete title="Delete" size={30} /></Button>;

    if (!isActive) {
        return deleteBtn;
    }

    if (isAlive) {
        return instaKill;
    }

    return revive;
}
const TypeLogo = ({ isPlayer }: { isPlayer: boolean }) => {
    if (isPlayer) {
        return <BsPersonFill size={40} />
    }
    return <GiEvilMinion size={40} />
}
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
        hasHealthStats={true}
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
            opacity: (value.isAlive ? 1 : 0.3)
        }}>

        <Row>
            <CenteredCol span={2}>
                <span style={{ marginLeft: 5 }}><TypeLogo isPlayer={!isMonster} /></span>
            </CenteredCol>
            <Col span={22}>
                <Row style={{ height: '100%' }}>
                    <CenteredCol span={8}>
                        {value.name}  <Divider type="vertical" />{value.iniciative}
                        {isMonster && <>
                            <Divider type="vertical"></Divider><Popover
                                content={<StatsBlockWide monster={value as Monster} />}>
                                <IoMdListBox title="stats" size={35} />
                            </Popover></>}
                    </CenteredCol>
                    <CenteredCol span={7} >
                        <Conditions conditions={value.conditions} onChange={handleConditionChange} />
                    </CenteredCol>
                    <CenteredCol span={7} >
                        {isMonster && <StatItem title="Health" value={value.hit_points || 0} units={'HP'} onChange={handleHitPointsChange} />}
                    </CenteredCol>
                    <CenteredCol span={1}>
                        <QuickActionButton
                            isActive={isActive}
                            isAlive={value.isAlive}
                            onInstaKill={() => handleHitPointsChange(0)}
                            onRemove={onRemove}
                            onRevive={() => handleHitPointsChange(1)}
                        />
                    </CenteredCol>
                </Row>
            </Col>
        </Row>



    </ExpandableCharacterBox>
    );
}

export default CharacterInEncounter;