import * as React from 'react';
import PlayerInTeam  from './PlayerInTeam';
import { Button, Modal, Form, Input, Radio, FormItemProps } from 'antd';
import useLocalStorage from '../hooks/useLocalStorageHook';
import IPlayer from '../models/IPlayer';
import Player from '../models/IPlayer';

interface IPlayerList {
    onJoinEncounter: (players: IPlayer) => void
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
        newPlayerList.push({});
        setPlayers(newPlayerList);
    }
    return (<>{
        players.map((player, index) => <PlayerInTeam
            key={`${player.name}+${index}`}
            value={player}
            onChange={c => handleUpdateCharacter(c, index)}
            onRemove={() => handleRemovePlayer(index)}
            onJoinEncounter={handleJoinEncounter} />)
    }

        <Button onClick={handleAddNewPlayer}>add</Button>
    </>

    );
}
