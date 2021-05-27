import ActionableCharacter, { IActionableCharacter } from "./ActionableCharacter";
import IBaseMonster from "./IBaseMonster";
import IDnd5eApiReference from "./IDnd5eApiReference";
import IUnique from "./IUnique";
import KeyedObject from "./KeyedObject";

interface ISpeed {
    walk: string;
    swim: string;
    fly: string;
    burrow: string;
}

interface IProficiency {
    value: number;
    proficiency: IDnd5eApiReference;
}

interface ISenses extends KeyedObject<string | number> {
    passive_perception: number;
}

export interface INameDescItem {
    name: string;
    desc: string;
}
// todo form
interface IForm {
    id: string;
    name: string;
    url: string;
}

export interface IMonster extends IBaseMonster, IActionableCharacter, IUnique {
    subtype: string;
    hit_dice: number;
    forms: IForm[];
    speed: ISpeed;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    proficiencies: IProficiency[];
    damage_vulnerabilities: string[];
    damage_resistances: string[];
    damage_immunities: string[];
    condition_immunities: IDnd5eApiReference[];
    senses: ISenses;
    languages: string;
    special_abilities: INameDescItem[];
    actions: INameDescItem[]
    legendary_actions: INameDescItem[];
    url: string;
}

class Monster extends ActionableCharacter implements IMonster {
    subtype: string;
    hit_dice: number;
    forms: IForm[];
    speed: ISpeed;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    proficiencies: IProficiency[];
    damage_vulnerabilities: string[];
    damage_resistances: string[];
    damage_immunities: string[];
    condition_immunities: IDnd5eApiReference[];
    senses: ISenses;
    languages: string;
    special_abilities: INameDescItem[];
    actions: INameDescItem[];
    legendary_actions: INameDescItem[];
    url: string;
    index: string;
    alignment: string;
    challenge_rating: number;
    size: string;
    type: string;
    comment?: string | undefined;

    constructor(monster: IMonster) {
        super(monster.uuid, monster.name, monster.hit_points, monster.max_hit_points, monster.iniciative, monster.armor_class, monster.comment, monster.conditions);
        this.subtype = monster.subtype;
        this.hit_dice = monster.hit_dice;
        this.forms = monster.forms;
        this.speed = monster.speed;
        this.strength = monster.strength;
        this.dexterity = monster.dexterity;
        this.constitution = monster.constitution;
        this.intelligence = monster.intelligence;
        this.wisdom = monster.wisdom;
        this.charisma = monster.charisma;
        this.proficiencies = monster.proficiencies;
        this.damage_vulnerabilities = monster.damage_vulnerabilities;
        this.damage_resistances = monster.damage_resistances;
        this.damage_immunities = monster.damage_immunities;
        this.condition_immunities = monster.condition_immunities;
        this.senses = monster.senses;
        this.languages = monster.languages;
        this.special_abilities = monster.special_abilities;
        this.actions = monster.actions;
        this.legendary_actions = monster.legendary_actions;
        this.url = monster.url;
        this.index = monster.index;
        this.alignment = monster.alignment;
        this.challenge_rating = monster.challenge_rating;
        this.size = monster.size;
        this.type = monster.type;
    }

}


export default Monster;