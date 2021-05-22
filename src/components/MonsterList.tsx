import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorageHook';
import IDnd5eApiReference from '../models/IDnd5eApiReference';
import IMonster from '../models/IMonster';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { IoMdListBox } from "react-icons/io";
import { getAllMonsters } from '../resources/dndapi';
import { AutoComplete, Input, InputNumber, Button, Row, Col, Popover } from 'antd';
import styled from 'styled-components';
import IBaseMonster from '../models/IBaseMonster';
import StatsBlockWide from './StatsBlockWide';

const BasicMonsterDiv = styled.div`
    background-color: white;
    width: 80%;
`;

interface IBasicMonsterItemProps {
    monster: IBaseMonster;
}
const BasicMonsterItem = ({ monster }: IBasicMonsterItemProps) => {
    return <BasicMonsterDiv>
        <Button onClick={() => { }} ><BsBoxArrowLeft size={30} /></Button>
        {monster.name} {monster.size} {monster.type} {monster.hit_points}
        <Popover content={<StatsBlockWide />}>
            <IoMdListBox />
        </Popover>
    </BasicMonsterDiv>
}

export interface IMonsterListProps {
}

export function MonsterList(props: IMonsterListProps) {
    const [allMonstersOverview, setAllMonsterOverview] = useState<IBaseMonster[]>([]);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        getAllMonsters()
            .then(monsters => {
                setAllMonsterOverview(monsters)
            })
    }, []);
    return (<>
        <Row>
            <Col >
                <Input value={filter} onChange={event => setFilter(event.target.value)} />

            </Col>
        </Row>

        <Row style={{ height: '100%' }}>
            <Col span={24} style={{ height: '100%', overflow: 'auto' }}>{allMonstersOverview
                .filter(monster => monster.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
                .map(monster => <BasicMonsterItem monster={monster} />)}
            </Col >
        </Row >
    </>
    );
}

export default MonsterList;