import { Button } from 'antd';
import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import useLocalStorage from '../hooks/useLocalStorageHook';
import ICharacter from '../models/ICharacter';
import Player, { IPlayer } from '../models/Player';
import PlayerInTeam from './PlayerInTeam';

interface IPlayerList {
    onJoinEncounter: (players: Player) => void
}

export default function PlayerList({ onJoinEncounter }: IPlayerList) {
    const [players, setPlayers] = useLocalStorage<IPlayer[]>('players', [] as IPlayer[]);
    const handleJoinEncounter = (player: IPlayer) => {
        onJoinEncounter(new Player(player));
    }
    const handleUpdateCharacter = (char: IPlayer, replaceIndex: number) => {
        setPlayers(players.map((player: IPlayer, index: number) => {
            if (replaceIndex !== index) return player;
            return char;
        }));
    }
    const handleRemovePlayer = (index: number) => {
        const reducedList = [...players];
        reducedList.splice(index, 1);
        setPlayers(reducedList);
    }
    const handleAddNewPlayer = () => {
        const newPlayerList = [...players];
        newPlayerList.push({ uuid: uuid(), name: 'A', hit_points: 1, iniciative: 0, conditions: [] });
        setPlayers(newPlayerList);
    }
    return (<>{
        players.map((player, index) => <PlayerInTeam
            key={`${index}${players.length}`}
            value={player}
            onChange={c => handleUpdateCharacter(c, index)}
            onRemove={() => handleRemovePlayer(index)}
            onJoinEncounter={handleJoinEncounter} />)
    }

        <Button onClick={handleAddNewPlayer}>add</Button>
    </>

    );
}
