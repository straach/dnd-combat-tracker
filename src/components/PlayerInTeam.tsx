import { Button, Input, InputNumber, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsBoxArrowRight } from 'react-icons/bs';
import { IPlayer } from '../models/Player';
import ExpandableCharacterBox from './ExpandableCharacterBox';

const { Col } = ExpandableCharacterBox;

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
        <Row style={{ fontSize: 12, margin: '0px 10px 0px 15px' }}>
            <Col span={6}>
                <Input value={value.name} placeholder="Name" onChange={(event) => onChange({ ...value, name: event.target.value })} />
            </Col>
            <Col offset={1} span={3}>
                Armor Class: <InputNumber value={value.armor_class} onChange={(number) => onChange({ ...value, armor_class: number })} />
            </Col>
            <Col offset={1} span={4}>
                Passive Perception: <InputNumber value={value.passivePerception} onChange={(number) => onChange({ ...value, passivePerception: number })} />
            </Col>
            <Col offset={1} span={3}>
                Iniciative: <InputNumber value={value.iniciative} onChange={(number) => onChange({ ...value, iniciative: number })} />
            </Col>
            <Col offset={1} span={3} >
                <div style={{ display: 'flex' }} >
                    <Button onClick={onRemove} size="large" title="Delete from team"><AiOutlineDelete size={30} /></Button>
                    <Button style={{ marginLeft: 5 }} size="large" onClick={() => onJoinEncounter(value)} title="Join encounter" ><BsBoxArrowRight size={30} /></Button>
                </div>
            </Col>
        </Row>
    </ExpandableCharacterBox>
}

export default PlayerInTeam;