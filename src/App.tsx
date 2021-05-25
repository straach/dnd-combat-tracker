import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { Layout, Row, Col, Button, Divider } from 'antd';
import PlayerInTeam from './components/PlayerInTeam';
import IPlayer from './models/IPlayer';
import CharacterInEncounter from './components/CharacterInEncounter';
import Sidebar from './components/Sidebar';
import PlayerList from './components/PlayerList';
import useLocalStorage from './hooks/useLocalStorageHook';
import Encounter, { IEncounterData } from './models/Encounter';
import { MonsterList } from './components/MonsterList';
import IMonster from './models/IMonster';
import ICharacter from './models/ICharacter';

const { Header, Content, Footer } = Layout;
const Main = styled.div`
  width: 80%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  min-width: 800px;
`;

function App() {
  const [encounterData, setEncounterData] = useLocalStorage<IEncounterData>('charactersInEncounter', {} as IEncounterData);
  const encounter = new Encounter(encounterData);
  const handleNextTurn = () => {
    encounter.giveTurnToNextCharacter();
    // setEncounterData(encounter.toEncounterData());
  }
  const handlePrevTurn = () => {
    encounter.giveTurnToPreviousCharacter();
    // setEncounterData(encounter.toEncounterData());
  }
  const handleJoinEncounter = (char: ICharacter) => {
    encounter.addCharacter(char);
    // setEncounterData(encounter.toEncounterData());
  }
  const handleMultijoinEncounter = (chars: ICharacter[]) => {
    chars.forEach(char => encounter.addCharacter(char));
    //setEncounterData(encounter.toEncounterData());
  }
  const handleLeaveEncounter = (char: ICharacter) => {
    encounter.removeCharacter(char);
    //setEncounterData(encounter.toEncounterData());
  }
  const handleUpdatePlayerInEncounter = (char: ICharacter) => {
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
    //setEncounterData(encounter.toEncounterData());
  }
  const deadCharacters = encounter.deadCharacters;
  return (<Layout style={{ minHeight: '100%' }}>
    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row>
        <Col span={18}>
          DnD Combat Tracker
      </Col>
        <Col>
          Round: {encounter.round} Time: {encounter.timePassed}
          <Button onClick={handleToggleStartEncounter}>Start/End</Button>
          <Button onClick={handleClearEncounter}>Clear</Button>
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
        {encounter.aliveCharacters.map((char: ICharacter, index: number) =>
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
            {deadCharacters.map((char: ICharacter, index: number) => <CharacterInEncounter
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

export default App;
