import IDnd5eApiReference from "./IDnd5eApiReference";

interface ISpeed {
    walk: string;
    swim: string;
    fly: string;
}

interface IProficiency {
    value: number;
    proficiency: IDnd5eApiReference;
}

interface ISenses {
    passive_perception: number;
    [key: string]: string | number;
}

interface INameDescItem {
    name: string;
    desc: string;
}

interface IForm {
    id: string;
    name: string;
    url: string;
}

interface IMonster {
    index: string;
    name: string;
    size: string;
    type: string;
    subtype: string;
    alignment: string;
    armor_class: number;
    hit_points: string;
    hit_dice: string;
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
    condition_immunities: string[];
    senses: ISenses;
    languages: string;
    challenge_rating: number;
    special_abilities: INameDescItem[];
    actions: INameDescItem[]
    legendary_actions: INameDescItem[];
    url: string;
}

export default IMonster;