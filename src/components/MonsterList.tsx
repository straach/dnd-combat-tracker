import { Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import IBaseMonster from '../models/IBaseMonster';
import { getAllMonsters } from '../resources/dndapi';
import MonsterItem from './MonsterItem';
import styled, { StyledComponent } from 'styled-components';
import IMonster from '../models/IMonster';

const MonsterListBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    height: 100%;
    overflow: auto;
`;

interface IMonsterListProps {
    onJoinEncounter: (monsters: IMonster[]) => void;
}

export function MonsterList({ onJoinEncounter }: IMonsterListProps) {
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

        <Row justify="center" style={{ height: '100%', overflow: 'auto' }}>
            <Col span={22}>{allMonstersOverview
                .filter(monster => monster.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
                .map((monster, index) => <MonsterItem
                    key={`${monster.name}${index}`}
                    monster={monster}
                    onJoinEncounter={onJoinEncounter}
                />)}
            </Col >
        </Row >
    </>
    );
}

export default MonsterList;