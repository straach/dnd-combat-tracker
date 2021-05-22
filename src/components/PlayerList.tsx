import * as React from 'react';
import PlayerInTeam  from './PlayerInTeam';
import { Button, Modal, Form, Input, Radio, FormItemProps } from 'antd';
import useLocalStorage from '../hooks/useLocalStorageHook';
import IPlayerProps from '../models/IPlayerProps';

interface IPlayerList {
    onJoinEncounter: (players: IPlayerProps) => void
}

export default function PlayerList({ onJoinEncounter }: IPlayerList) {
    const [players, setPlayers] = useLocalStorage<IPlayerProps[]>('players', [] as IPlayerProps[]);
    const handleJoinEncounter = (player: IPlayerProps) => {
        onJoinEncounter(player);
    }
    const handleUpdateCharacter = (char: IPlayerProps, replaceIndex: number) => {
        setPlayers(players.map((player: IPlayerProps, index: number) => {
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
