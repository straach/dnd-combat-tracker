import { Button, Popover, Col, Row, InputNumber } from 'antd';
import React, { useState } from 'react';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { IoMdListBox } from "react-icons/io";
import IBaseMonster from '../models/IBaseMonster';
import IMonster from '../models/IMonster';
import { getMonster } from '../resources/dndapi';
import CharacterBox from './CharacterBox';
import StatsBlockWide from './stats-block/StatsBlockWide';
import { cloneDeep } from 'lodash';
import Player from '../models/IPlayer';
import Monster from '../models/IMonster';


interface IMonsterItemProps {
    monster: IBaseMonster;
    onJoinEncounter: (monsters: IMonster[]) => void;
}
const MonsterItem = ({ monster, onJoinEncounter }: IMonsterItemProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(1);
    const [iniciative, setIniciative] = useState<number>(10);
    const [fullStats, setFullStats] = useState<IMonster | undefined>(undefined);
    const handleOnVisibleChange = (visible: boolean) => {
        if (visible && !fullStats) {
            getMonster(monster.index)
                .then(setFullStats)
                .then(() => setShow(true));
        } else {
            setShow(visible);
        }
    }
    const handleJoinPress = () => {
        if (!fullStats) {
            getMonster(monster.index).then(handleMonsterJoin);
            return;
        }
        handleMonsterJoin(fullStats);
    }

    const handleMonsterJoin = (monster: IMonster) => {
        const stats: IMonster[] = [];
        for (let i = 0; i <= amount - 1; i++) {
            stats.push(new Monster(cloneDeep<IMonster>(monster)));
        }
        onJoinEncounter(stats);
        setAmount(1);
    }
    return <Row style={{ width: '100%', backgroundColor: 'white', margin: '10px 0px' }}>
        <Col>
            <Button onClick={handleJoinPress} ><BsBoxArrowLeft size={30} /></Button>
            <InputNumber min={0} value={amount} onChange={setAmount} /> x
            <InputNumber min={0} value={iniciative} onChange={setIniciative} />iniciative
            <Popover
                visible={show}
                onVisibleChange={handleOnVisibleChange}
                content={<>{show && <StatsBlockWide monster={fullStats} />}</>} placement="left">
                <IoMdListBox size={40} />
            </Popover>
            {monster.name} {monster.size} {monster.type} {monster.hit_points}
        </Col>
    </Row>
}

export default MonsterItem;