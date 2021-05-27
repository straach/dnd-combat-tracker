import ICharacter from "./ICharacter";
import ICharacterActions from "./ICharacterActions";
import { uuid as createUuid } from 'uuidv4';
import IUnique from "./IUnique";

export interface IActionableCharacter extends ICharacterActions, ICharacter, IUnique {
    max_hit_points: number;
};

class ActionableCharacter implements IActionableCharacter {
    uuid: string;
    name: string;
    hit_points: number;
    max_hit_points: number;
    armor_class?: number | undefined;
    iniciative: number;
    comment?: string | undefined;
    conditions: string[];
    /**
     *
     */
    constructor(
        uuid: string,
        name: string,
        hit_points: number,
        max_hit_points: number,
        iniciative: number,
        armor_class?: number | undefined,
        comment?: string | undefined,
        conditions: string[] = [],
    ) {
        this.uuid = uuid || createUuid();
        this.name = name;
        this.hit_points = hit_points;
        this.max_hit_points = max_hit_points || hit_points;
        this.armor_class = armor_class;
        this.iniciative = iniciative;
        this.comment = comment;
        this.conditions = conditions;
    }
    changeComment(comment: string) {
        this.comment = comment;
    };
    changeHitPoints(hit_points: number) {
        this.hit_points = hit_points;
    };
    changeConditions(conditions: string[]) {
        this.conditions = conditions;
    };

}
export default ActionableCharacter;