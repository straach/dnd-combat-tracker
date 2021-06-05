import { Button, InputNumber, Popover, Row } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { IoMdListBox } from "react-icons/io";
import IBaseMonster from '../models/IBaseMonster';
import { default as IMonster, default as Monster } from '../models/Monster';
import { getMonster } from '../resources/dndapi';
import ExpandableCharacterBox from './ExpandableCharacterBox';
import StatsBlockWide from './stats-block/StatsBlockWide';
const { Col } = ExpandableCharacterBox;

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
    return <ExpandableCharacterBox
        hasHealthStats={false}>
        <Row style={{ fontSize: 12, margin: '0px 10px 0px 15px' }}>
            <Col span={2}>
                <Button onClick={handleJoinPress} size="large"><BsBoxArrowLeft size={30} /></Button>
            </Col>
            <Col offset={1} span={4}>
                Amount:  <InputNumber min={0} value={amount} onChange={setAmount} />

            </Col>
            <Col offset={1} span={4}>
                iniciative: <InputNumber min={0} value={iniciative} onChange={setIniciative} />
            </Col>
            <Col offset={1} span={4}>
                <Popover
                    visible={show}
                    onVisibleChange={handleOnVisibleChange}
                    content={<>{show && <StatsBlockWide monster={fullStats} />}</>} placement="left">
                    <IoMdListBox size={40} />
                </Popover>
            </Col>
            <Col span={6}>
                {monster.name} {monster.size} {monster.type} {monster.hit_points}
            </Col>
        </Row>
    </ExpandableCharacterBox >
}

export default MonsterItem;