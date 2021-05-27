import ActionableCharacter, { IActionableCharacter } from "./ActionableCharacter";
import ICharacter from "./ICharacter";
import IUnique from "./IUnique";

export interface IPlayer extends ICharacter, IUnique {
    speed?: number;
    passivePerception?: number;
}

class Player extends ActionableCharacter implements IPlayer, IActionableCharacter {
    speed?: number;
    passivePerception?: number;

    constructor(player: IPlayer) {
        super(player.uuid, player.name, player.hit_points, player.hit_points, player.iniciative, player.armor_class, player.comment, player.conditions);
        this.passivePerception = player.passivePerception;
        this.speed = player.speed;
    }
}
export default Player;  