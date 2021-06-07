import { Button, Checkbox, Col, Divider, Layout, Row, Space, Typography } from 'antd';
import { isEmpty } from 'lodash';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import CharacterInEncounter from './components/CharacterInEncounter';
import LicenseFooter from './components/LicenseFooter';
import { MonsterList } from './components/MonsterList';
import PlayerList from './components/PlayerList';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorageHook';
import { IActionableCharacter } from './models/ActionableCharacter';
import Encounter, { IEncounterData } from './models/Encounter';
import { IObscureDataContext, ObscureDataContext } from './obscure-data-context';

const { Title } = Typography;
const { Header, Content } = Layout;
const Main = styled.div`
  width: 80%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  min-width: 800px;
`;

function Game() {
  const [expandedSide, setExpandedSide] = useState<'left' | 'right' | null>(null);
  const [encounterData, setEncounterData] = useLocalStorage<IEncounterData>('charactersInEncounter', {} as IEncounterData);
  const { isObscured, toggleIsObscured } = useContext<IObscureDataContext>(ObscureDataContext);
  const encounter = new Encounter(encounterData);
  const handleNextTurn = () => {
    encounter.giveTurnToNextCharacter();
    setEncounterData(encounter.toEncounterData());
  }
  const handlePrevTurn = () => {
    encounter.giveTurnToPreviousCharacter();
    setEncounterData(encounter.toEncounterData());
  }
  const handleJoinEncounter = (char: IActionableCharacter) => {
    encounter.addCharacter(char);
    setEncounterData(encounter.toEncounterData());
  }
  const handleMultijoinEncounter = (chars: IActionableCharacter[]) => {
    chars.forEach(char => encounter.addCharacter(char));
    setEncounterData(encounter.toEncounterData());
  }
  const handleLeaveEncounter = (char: IActionableCharacter) => {
    encounter.removeCharacter(char);
    setEncounterData(encounter.toEncounterData());
  }
  const handleUpdatePlayerInEncounter = (char: IActionableCharacter) => {
    encounter.updateCharacter(char);
    setEncounterData(encounter.toEncounterData());
  }
  const handleToggleStartEncounter = () => {
    if (encounter.isStarted) {
      encounter.endEncounter();
    } else {
      encounter.startEncounter();
    }
    setEncounterData(encounter.toEncounterData());
  }
  const handleClearEncounter = () => {
    setEncounterData({} as IEncounterData);
  }
  return (<Layout style={{ minHeight: '100%', height: '100%' }}>
    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row justify="space-between">
        {!encounter.isStarted && <a className="github-fork-ribbon left-bottom fixed"
          href="https://github.com/straach/dnd-combat-tracker"
          data-ribbon="Fork me on GitHub"
          title="Fork me on GitHub">Fork me on GitHub</a>}
        <Col span={6}>
          <Title level={3} style={{ color: 'white', marginTop: 13 }}>DnD Combat Tracker</Title>
        </Col>
        <Col>
          <Space>
            Round: {encounter.round} Time: {encounter.timePassed}
            <Checkbox checked={isObscured} onChange={toggleIsObscured} /> Obscure Data
            <Button title="Start or Stop encounter" onClick={handleToggleStartEncounter}>{encounter.isStarted ? 'End' : 'Start'}</Button>
            <Button title="Clear encounter from all participants" onClick={handleClearEncounter} disabled={encounter.isStarted}>Clear</Button>
            <><Divider type="vertical"></Divider>
              <Button title="Give turn to previous player" onClick={() => handlePrevTurn()} disabled={!encounter.isStarted}>prev</Button>
              <Button title="Give turn to next player" onClick={() => handleNextTurn()} disabled={!encounter.isStarted} type="primary">next</Button>
            </>
          </Space>
        </Col>
      </Row>
    </Header>

    <Sidebar
      title={'Players in Adventure'}
      collapsed={expandedSide !== 'left'}
      onCollapsedChange={(collapsed: boolean) =>
        setExpandedSide(collapsed ? null : 'left')}
    >
      <PlayerList
        onJoinEncounter={handleJoinEncounter}
      />
    </Sidebar>
    <Content>
      <Main>
        {isEmpty(encounter.aliveCharacters)
          && isEmpty(encounter.deadCharacters) &&
          <Row align="middle" justify="center">
            <Col>
              <Title level={4}>Start adding characters and monsters in the menus on the side</Title>
            </Col>
          </Row>
        }

        {encounter.aliveCharacters.length > 0 &&
          <><Divider plain>Active</Divider><div>
            {encounter.aliveCharacters.map((char: IActionableCharacter, index: number) =>
              <CharacterInEncounter
                isActive={encounter.isStarted}
                key={`${char.name}+${index}`}
                value={char}
                hasTurn={char === encounter.currentCharacter && encounter.isStarted}
                onChange={handleUpdatePlayerInEncounter}
                onRemove={() => handleLeaveEncounter(char)}
              />)}
          </div></>}

        {encounter.deadCharacters.length > 0 &&
          <><Divider plain>Dead</Divider>
            <div>
              {encounter.deadCharacters.map((char: IActionableCharacter, index: number) => <CharacterInEncounter
                isActive={encounter.isStarted}
                key={`${char.name}+${index}`}
                value={char}
                hasTurn={false}
                onChange={handleUpdatePlayerInEncounter}
                onRemove={() => handleLeaveEncounter(char)}
              />)}
            </div>
          </>
        }
      </Main>
      {!encounter.isStarted && <LicenseFooter />}
    </Content >
    <Sidebar
      title={'Add Monster to Encounter'}
      isMonster={true}
      align="right"
      collapsed={expandedSide !== 'right'}
      onCollapsedChange={(collapsed: boolean) =>
        setExpandedSide(collapsed ? null : 'right')}
    >
      <MonsterList onJoinEncounter={handleMultijoinEncounter} />
    </Sidebar>
  </Layout >);
}

export default Game;
