import ICharacter from "./ICharacter";

export interface IPlayer extends ICharacter {
    hit_points?: number;
    name?: string;
    armor_class?: number;
    speed?: number;
    passivePerception?: number;
    iniciative?: number;
    comment?: string;
}

class Player implements IPlayer {
    hit_points?: number;
    name?: string;
    armor_class?: number;
    speed?: number;
    passivePerception?: number;
    iniciative?: number;
    comment?: string;

    constructor(player: IPlayer) {
        this.hit_points = player.hit_points;
        this.name = player.name;
        this.armor_class = player.armor_class;
        this.iniciative = player.iniciative;
        this.passivePerception = player.passivePerception;
        this.speed = player.speed;
        this.comment = player.comment;
    }
}
export default Player;