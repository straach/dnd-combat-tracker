import ICharacter from "./ICharacter";

interface IBaseMonster extends ICharacter {
    index: string;
    alignment: string;
    challenge_rating: number;
    size: string;
    type: string;
}

export default IBaseMonster;