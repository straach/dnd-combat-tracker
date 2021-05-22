import { Input, InputNumber, Row, Col, Switch, Button } from 'antd';
import React, { useState, FunctionComponent } from 'react';
import IPlayerProps from '../models/IPlayerProps';
import { BsBoxArrowRight } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
const ALL_PLAYER_CHARACTERS = 'ALL_PLAYER_CHARACTERS';



interface IPlayerInputProps {
    value: IPlayerProps;
    onChange: (value: IPlayerProps) => void;
    onRemove: () => void;
    onJoinEncounter: (player: IPlayerProps) => void;
}

const PlayerInTeam: FunctionComponent<IPlayerInputProps> = ({ value, onChange, onJoinEncounter, onRemove }) => {
    return (<Row style={{ backgroundColor: 'grey' }}>
        <Col>
            Name: <Input value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} />
        </Col>
        <Col>
            Health: <InputNumber value={value.health} onChange={(number) => onChange({ ...value, health: number })} />
        </Col>
        <Col>
            Armor Class: <InputNumber value={value.armorClass} onChange={(number) => onChange({ ...value, armorClass: number })} />
        </Col>
        <Col>
            Speed: <InputNumber value={value.speed} onChange={(number) => onChange({ ...value, speed: number })} />
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