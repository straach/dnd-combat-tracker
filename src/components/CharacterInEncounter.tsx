import React, { useState, FunctionComponent } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Conditions from './Condition';
import StatItem from './StatItem';
import { GiDeathSkull } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import { BsArrowsExpand, BsArrowsCollapse } from "react-icons/bs";
import { Button, Row, Col, Input } from 'antd';
import IPlayer from '../models/IPlayer';
import { AiOutlineDelete } from 'react-icons/ai';
import Box from './CharacterBox';
import ICharacter from '../models/ICharacter';



const CharacterName = styled.div`
    font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
    color: #000;
    font-size: 16px;
    line-height: 1.2em;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-weight: bold;
    margin-left: 15px;
    flex: 0.5 1 500px;
    align-self: center;
    display: flex;
`;

const HealthBar = styled.div`
    flex: 0 0 20px;
    align-self: auto;
    height: 100%;
`;
const HealthStatus = ({ health }: { health: number }) => {
    return <HealthBar
        style={{
            backgroundColor: health <= 10 ? '#BB2020' : (health <= 50 ? 'yellow' : 'green')
        }}>
    </HealthBar >;
}

interface IEncounterCharacter {
    value: ICharacter;
    isActive: boolean;
    hasTurn: boolean;
    onPrev: () => void;
    onNext: () => void;
    onChange: (character: ICharacter) => void;
    onRemove: () => void;
}
const CharacterInEncounter: FunctionComponent<IEncounterCharacter> = ({ value, hasTurn, isActive, onChange, onPrev, onNext, onRemove }) => {
    const [showComments, setShowComments] = useState(false);
    return (<><Box style={{ transform: hasTurn ? 'scale(1.05, 1.05)' : 'none', opacity: ((value.hit_points || 0) <= 0 ? 0.3 : 1) }}>
        <HealthStatus health={value.hit_points || 0}></HealthStatus>
        <CharacterName >{value.name} ({value.iniciative})</CharacterName>
        <CharacterName >
            <StatItem title="AC" value={value.armor_class || 0} isHidden={false} onChange={armorClass => onChange({ ...value, armor_class: armorClass })} />
            <StatItem title="Health" value={value.hit_points || 0} isHidden={false} onChange={health => onChange({ ...value, hit_points: health })} />
        </CharacterName>
        <CharacterName >
            <Conditions availableConditions={['a', 'b', 'c', 'd']} />
        </CharacterName>
        <CharacterName >
            <GiDeathSkull onClick={() => onChange({ ...value, hit_points: 0 })} /> InstaKill
            <IoMdListBox /> Stats
            <BsArrowsCollapse onClick={() => setShowComments(!showComments)} />
        </CharacterName>
        {hasTurn && isActive && <CharacterName>
            <Button onClick={() => onPrev()}>prev</Button>
            <Button onClick={() => onNext()} type="primary">next</Button>
        </CharacterName>}
        {!isActive && <CharacterName >
            <Button onClick={onRemove} ><AiOutlineDelete size={30} /></Button>
        </CharacterName>}
    </Box>
        {showComments && <Box>Comment: <Input.TextArea value={value.comment} onChange={event => onChange({ ...value, comment: event.target.value })} /></Box>}
    </>
    );
}

export default CharacterInEncounter;