import React, { useState, FunctionComponent } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Conditions from './Condition';
import StatItem from './StatItem';
import { GiDeathSkull } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import { BsArrowsExpand, BsArrowsCollapse } from "react-icons/bs";
import { Button, Row, Col, Input } from 'antd';
import IPlayerProps from '../models/IPlayerProps';
import { AiOutlineDelete } from 'react-icons/ai';

const data = {
    "index": "aboleth",
    "name": "Aboleth",
    "size": "Large",
    "type": "aberration",
    "subtype": null,
    "alignment": "lawful evil",
    "armor_class": 17,
    "hit_points": 135,
    "hit_dice": "18d10",
    "speed": {
        "walk": "10 ft.",
        "swim": "40 ft."
    },
    "strength": 21,
    "dexterity": 9,
    "constitution": 15,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 18,
    "proficiencies": [
        {
            "value": 6,
            "proficiency": {
                "index": "saving-throw-con",
                "name": "Saving Throw: CON",
                "url": "/api/proficiencies/saving-throw-con"
            }
        },
        {
            "value": 8,
            "proficiency": {
                "index": "saving-throw-int",
                "name": "Saving Throw: INT",
                "url": "/api/proficiencies/saving-throw-int"
            }
        },
        {
            "value": 6,
            "proficiency": {
                "index": "saving-throw-wis",
                "name": "Saving Throw: WIS",
                "url": "/api/proficiencies/saving-throw-wis"
            }
        },
        {
            "value": 12,
            "proficiency": {
                "index": "skill-history",
                "name": "Skill: History",
                "url": "/api/proficiencies/skill-history"
            }
        },
        {
            "value": 10,
            "proficiency": {
                "index": "skill-perception",
                "name": "Skill: Perception",
                "url": "/api/proficiencies/skill-perception"
            }
        }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
        "darkvision": "120 ft.",
        "passive_perception": 20
    },
    "languages": "Deep Speech, telepathy 120 ft.",
    "challenge_rating": 10,
    "xp": 5900,
    "special_abilities": [
        {
            "name": "Amphibious",
            "desc": "The aboleth can breathe air and water."
        },
        {
            "name": "Mucous Cloud",
            "desc": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.",
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/ability-scores/con"
                },
                "dc_value": 14,
                "success_type": "none"
            }
        },
        {
            "name": "Probing Telepathy",
            "desc": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature."
        }
    ],
    "actions": [
        {
            "name": "Multiattack",
            "desc": "The aboleth makes three tentacle attacks.",
            "options": {
                "choose": 1,
                "from": [
                    [
                        {
                            "name": "Tentacle",
                            "count": 3,
                            "type": "melee"
                        }
                    ]
                ]
            },
            "damage": []
        },
        {
            "name": "Tentacle",
            "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
            "attack_bonus": 9,
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/ability-scores/con"
                },
                "dc_value": 14,
                "success_type": "none"
            },
            "damage": [
                {
                    "damage_type": {
                        "index": "acid",
                        "name": "Acid",
                        "url": "/api/damage-types/acid"
                    },
                    "damage_dice": "2d6+5"
                }
            ]
        },
        {
            "name": "Tail",
            "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
            "attack_bonus": 9,
            "damage": [
                {
                    "damage_type": {
                        "index": "bludgeoning",
                        "name": "Bludgeoning",
                        "url": "/api/damage-types/bludgeoning"
                    },
                    "damage_dice": "3d6+5"
                }
            ]
        },
        {
            "name": "Enslave",
            "desc": "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.",
            "usage": {
                "type": "per day",
                "times": 3
            },
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/ability-scores/wis"
                },
                "dc_value": 14,
                "success_type": "none"
            },
            "damage": []
        }
    ],
    "legendary_actions": [
        {
            "name": "Detect",
            "desc": "The aboleth makes a Wisdom (Perception) check."
        },
        {
            "name": "Tail Swipe",
            "desc": "The aboleth makes one tail attack."
        },
        {
            "name": "Psychic Drain (Costs 2 Actions)",
            "desc": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.",
            "attack_bonus": 0,
            "damage": [
                {
                    "damage_type": {
                        "index": "psychic",
                        "name": "Psychic",
                        "url": "/api/damage-types/psychic"
                    },
                    "damage_dice": "3d6"
                }
            ]
        }
    ],
    "url": "/api/monsters/aboleth"
}

const char = {
    fullStats: data,
    stats: {

    },

}
const Box = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: rgba(255,255,255,0.5);
    margin-top: 6px;
    height: 60px;
    transition: 0.1s ease-in;
`;

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
    value: IPlayerProps;
    isActive: boolean;
    hasTurn: boolean;
    onPrev: () => void;
    onNext: () => void;
    onChange: (player: IPlayerProps) => void;
    onRemove: () => void;
}
const CharacterInEncounter: FunctionComponent<IEncounterCharacter> = ({ value, hasTurn, isActive, onChange, onPrev, onNext, onRemove }) => {
    const [showComments, setShowComments] = useState(false);
    return (<><Box style={{ transform: hasTurn ? 'scale(1.05, 1.05)' : 'none', opacity: ((value.health || 0) <= 0 ? 0.3 : 1) }}>
        <HealthStatus health={value.health || 0}></HealthStatus>
        <CharacterName >{value.name} ({value.iniciative})</CharacterName>
        <CharacterName >
            <StatItem title="AC" value={value.armorClass || 0} isHidden={false} onChange={armorClass => onChange({ ...value, armorClass })} />
            <StatItem title="Health" value={value.health || 0} isHidden={false} onChange={health => onChange({ ...value, health })} />
        </CharacterName>
        <CharacterName >
            <Conditions availableConditions={['a', 'b', 'c', 'd']} />
        </CharacterName>
        <CharacterName >
            <GiDeathSkull onClick={() => onChange({ ...value, health: 0 })} /> InstaKill
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