import { Input, InputNumber, Row, Col, Switch, Button } from 'antd';
import React, { useState, FunctionComponent } from 'react';
import { IPlayer } from '../models/Player';
import { BsBoxArrowRight } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import ICharacter from '../models/ICharacter';
import ExpandableCharacterBox from './ExpandableCharacterBox';

interface IPlayerInputProps {
    value: IPlayer;
    onChange: (value: IPlayer) => void;
    onRemove: () => void;
    onJoinEncounter: (player: IPlayer) => void;
}

const PlayerInTeam: FunctionComponent<IPlayerInputProps> = ({ value, onChange, onJoinEncounter, onRemove }) => {
    return <ExpandableCharacterBox
        hasHealthStats={false}
    >
        asd
    </ExpandableCharacterBox>
    return (<Row style={{ backgroundColor: 'grey' }}>
        <Col>
            Name: <Input value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} />
        </Col>
        <Col>
            Health: <InputNumber value={value.hit_points} onChange={(number) => onChange({ ...value, hit_points: number })} />
        </Col>
        <Col>
            Armor Class: <InputNumber value={value.armor_class} onChange={(number) => onChange({ ...value, armor_class: number })} />
        </Col>
        <Col>
            Passive Perception: <InputNumber value={value.passivePerception} onChange={(number) => onChange({ ...value, passivePerception: number })} />
        </Col>
        <Col>
            Iniciative: <InputNumber value={value.iniciative} onChange={(number) => onChange({ ...value, iniciative: number })} />
        </Col>
        <Col>
            <Button onClick={onRemove} ><AiOutlineDelete size={30} /></Button>
            <Button onClick={() => onJoinEncounter(value)} ><BsBoxArrowRight size={30} /></Button>
        </Col>
    </Row>);
}

export default PlayerInTeam;