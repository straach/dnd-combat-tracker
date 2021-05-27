import { Col, Input, Row, Divider, List } from 'antd';
import React, { useEffect, useState } from 'react';
import IBaseMonster from '../models/IBaseMonster';
import { getAllMonsters } from '../resources/dndapi';
import MonsterItem from './MonsterItem';
import styled, { StyledComponent } from 'styled-components';
import IMonster from '../models/Monster';
import Monster from '../models/Monster';
import useLocalStorage from '../hooks/useLocalStorageHook';
import useLastMonsters from '../hooks/useLastMonsters';

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
    onJoinEncounter: (monsters: Monster[]) => void;
}

export function MonsterList({ onJoinEncounter }: IMonsterListProps) {
    const { lastMonsters, pushMonster } = useLastMonsters(3);
    const [allMonstersOverview, setAllMonsterOverview] = useState<IBaseMonster[]>([]);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        getAllMonsters()
            .then(monsters => {
                setAllMonsterOverview(monsters)
            })
    }, []);

    const handleOnJoinEncounter = (monsters: IMonster[]) => {
        pushMonster(monsters[0]);
        onJoinEncounter(monsters);
    }

    return (<>
        <Row>
            <Col >
                <Input value={filter} onChange={event => setFilter(event.target.value)} />
            </Col>
        </Row>
        <Row justify="center" style={{ backgroundColor: 'white' }}>
            <Col span={22}>
                <List
                    header={<div>Recents</div>}
                    bordered
                    dataSource={lastMonsters}
                    renderItem={(monster, index) => (
                        <List.Item>
                            <MonsterItem
                                key={`${monster.name}${index}`}
                                monster={monster}
                                onJoinEncounter={handleOnJoinEncounter}
                            />
                        </List.Item>
                    )}
                />
            </Col >
        </Row >
        <Row justify="center" style={{ height: '100%', overflow: 'auto' }}>
            <Col span={22}>
                <List
                    header={<div>Search Results</div>}
                    bordered
                    dataSource={(filter.length > 2 ? allMonstersOverview : [])
                        .filter(monster => monster.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)}
                    renderItem={(monster, index) => (
                        <List.Item>
                            <MonsterItem
                                key={`${monster.name}${index}`}
                                monster={monster}
                                onJoinEncounter={handleOnJoinEncounter}
                            />
                        </List.Item>
                    )}
                />
            </Col >
        </Row >
    </>
    );
}

export default MonsterList;