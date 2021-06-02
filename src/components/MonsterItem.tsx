import { Button, Popover, Col, Row, InputNumber } from 'antd';
import React, { useState } from 'react';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { IoMdListBox } from "react-icons/io";
import IBaseMonster from '../models/IBaseMonster';
import IMonster from '../models/Monster';
import { getMonster } from '../resources/dndapi';
import StatsBlockWide from './stats-block/StatsBlockWide';
import { cloneDeep } from 'lodash';
import Player from '../models/Player';
import Monster from '../models/Monster';


interface IMonsterItemProps {
    monster: IBaseMonster;
    onJoinEncounter: (monsters: Monster[]) => void;
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
            const monsterData = cloneDeep<IMonster>(monster);
            monsterData.iniciative = iniciative;
            stats.push(new Monster(monsterData));
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