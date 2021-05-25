import ICharacter from "./ICharacter";

interface IBaseMonster extends ICharacter {
    index: string;
    name: string;
    alignment: string;
    challenge_rating: number;
    size: string;
    hit_points: number;
    armor_class: number;
    type: string;
    iniciative?: number;
}

export default IBaseMonster;