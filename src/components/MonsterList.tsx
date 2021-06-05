import { Col, Input, Row, Divider, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import IBaseMonster from '../models/IBaseMonster';
import { getAllMonsters } from '../resources/dndapi';
import MonsterItem from './MonsterItem';
import styled, { StyledComponent } from 'styled-components';
import IMonster from '../models/Monster';
import Monster from '../models/Monster';
import useLocalStorage from '../hooks/useLocalStorageHook';
import useLastMonsters from '../hooks/useLastMonsters';

const { Title } = Typography;
const Content = styled.div`
flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
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
    const find = (filter.length >= 2 ? allMonstersOverview : [])
        .filter(monster => monster.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    return (
        <Content>
            <Row style={{ flex: '0 1 50px', alignSelf: 'auto', width: '100%' }}>
                <Col offset={1} span={22}>
                    <Input value={filter} placeholder="Type to search" onChange={event => setFilter(event.target.value)} />
                </Col>
            </Row>
            {!filter ? <><Divider>Recently added</Divider>
                <Row>
                    <Col offset={1} span={22}>
                        {lastMonsters.map((monster, index) => <MonsterItem
                            key={`${monster.name}${index}`}
                            monster={monster}
                            onJoinEncounter={handleOnJoinEncounter}
                        />)}

                    </Col >
                </Row ></> :
                <Row style={{ flex: '1 1 auto', alignSelf: 'auto', padding: 5, width: '100%', overflow: 'auto' }}>
                    <Col offset={1} span={22} style={{}}>
                        <>{find.length > 0 ? find.map((monster, index) => <MonsterItem
                            key={`${monster.name}${index}`}
                            monster={monster}
                            onJoinEncounter={handleOnJoinEncounter}
                        />)
                            : <>Please use search term</>}
                            <Divider />
                        </>
                    </Col>
                </Row>
                // <div  >
                //     <Divider>Results</Divider>
                //     <Row justify="center">
                //         <Col offset={1} span={22} style={{ height: '100%', overflow: 'auto' }}>
                //             {find.length > 0 ? find.map((monster, index) => <MonsterItem
                //                 key={`${monster.name}${index}`}
                //                 monster={monster}
                //                 onJoinEncounter={handleOnJoinEncounter}
                //             />)
                //                 : <>Please use search term</>}
                //         </Col >
                //     </Row >
                // </div>
            }
        </Content >

    );
}

export default MonsterList;