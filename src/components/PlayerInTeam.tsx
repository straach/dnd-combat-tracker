import { Button, Input, InputNumber, Row, Space } from 'antd';
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
        <Row style={{ fontSize: 12, marginLeft: 10, marginTop: 5 }}>
            <Col span={6}>
                <Input value={value.name} placeholder="Name" onChange={(event) => onChange({ ...value, name: event.target.value })} />
            </Col>
            <Col offset={1} span={3}>
                Armor Class: <InputNumber value={value.armor_class} onChange={(number) => onChange({ ...value, armor_class: number })} />
            </Col>
            <Col offset={1} span={3}>
                Passive Perception: <InputNumber value={value.passivePerception} onChange={(number) => onChange({ ...value, passivePerception: number })} />
            </Col>
            <Col offset={1} span={3}>
                Iniciative: <InputNumber value={value.iniciative} onChange={(number) => onChange({ ...value, iniciative: number })} />
            </Col>
            <Col offset={2} span={3} style={{ display: 'flex', justifyContent: 'end' }}>
                <Space>
                    <Button onClick={onRemove} ><AiOutlineDelete size={30} /></Button>
                    <Button onClick={() => onJoinEncounter(value)} ><BsBoxArrowRight size={30} /></Button>
                </Space>
            </Col>
        </Row>
    </ExpandableCharacterBox>
}

export default PlayerInTeam;