import { Button, Col, Divider, Layout, Row, Space, Checkbox } from 'antd';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import './App.css';
import CharacterInEncounter from './components/CharacterInEncounter';
import { MonsterList } from './components/MonsterList';
import PlayerList from './components/PlayerList';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorageHook';
import { IActionableCharacter } from './models/ActionableCharacter';
import Encounter, { IEncounterData } from './models/Encounter';
import { IObscureDataContext, ObscureDataContext } from './obscure-data-context';
import { getAllMonsters } from './resources/dndapi';

const { Header, Content, Footer } = Layout;
const Main = styled.div`
  width: 80%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  min-width: 800px;
`;

function Game() {
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
  const deadCharacters = encounter.deadCharacters;
  return (<Layout style={{ minHeight: '100%' }}>
    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row justify="space-between">
        <Col span={5}>
          DnD Combat Tracker
      </Col>
        <Col>
          <Space>
            Round: {encounter.round} Time: {encounter.timePassed}
            <Checkbox checked={isObscured} onChange={toggleIsObscured} /> Obscure Data
            <Button onClick={handleToggleStartEncounter}>{encounter.isStarted ? 'End' : 'Start'}</Button>
            <Button onClick={handleClearEncounter}>Clear</Button>
          </Space>
        </Col>
      </Row>
    </Header>

    <Sidebar >
      <PlayerList
        onJoinEncounter={handleJoinEncounter}
      />
    </Sidebar>
    <Content>
      <Main>
        <Divider plain>Active</Divider>
        {encounter.aliveCharacters.map((char: IActionableCharacter, index: number) =>
          <CharacterInEncounter
            isActive={encounter.isStarted}
            key={`${char.name}+${index}`}
            value={char}
            hasTurn={char === encounter.currentCharacter && encounter.isStarted}
            onChange={handleUpdatePlayerInEncounter}
            onNext={handleNextTurn}
            onPrev={handlePrevTurn}
            onRemove={() => handleLeaveEncounter(char)}
          />)}
        {deadCharacters.length > 0 &&
          <><Divider plain>Dead</Divider>
            {deadCharacters.map((char: IActionableCharacter, index: number) => <CharacterInEncounter
              isActive={encounter.isStarted}
              key={`${char.name}+${index}`}
              value={char}
              hasTurn={false}
              onChange={handleUpdatePlayerInEncounter}
              onNext={() => { }}
              onPrev={() => { }}
              onRemove={() => { }}
            />)}
          </>
        }
      </Main>
    </Content>
    <Sidebar align="right" >
      <MonsterList onJoinEncounter={handleMultijoinEncounter} />
    </Sidebar>
    <Footer style={{ textAlign: 'center' }}></Footer>
  </Layout >);
}

export default Game;
