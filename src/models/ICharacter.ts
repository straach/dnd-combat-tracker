import ICharacterActions from "./ICharacterActions";

interface ICharacter {
    name: string;
    hit_points: number;
    armor_class?: number;
    iniciative: number;
    comment?: string;
    conditions: string[];
}

export default ICharacter;