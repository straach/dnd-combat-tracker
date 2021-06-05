import moment from 'moment';
import { IActionableCharacter } from './ActionableCharacter';
import { default as IMonster, default as Monster } from './Monster';
import { default as IPlayer, default as Player } from './Player';

export interface IEncounterData {
    round: number;
    players: IPlayer[];
    monsters: IMonster[];
    isStarted: boolean;
    currentCharacter: number;
}

class Encounter {
    public _round: number;
    private _characters: IActionableCharacter[];
    private _isStarted: boolean;
    private _currentCharacter: number;
    constructor({ round = 0, players = [], monsters = [], isStarted = false, currentCharacter = 0 }: IEncounterData) {
        this._round = round;
        this._characters = (players.map(player => new Player(player)) as IActionableCharacter[])
            .concat(monsters.map(monster => new Monster(monster)));
        this._isStarted = isStarted;
        this._currentCharacter = currentCharacter;
    }
    public get round() {
        return this._round;
    }
    public get characters() {
        return this._characters.sort((a, b) => (b.iniciative || 0) - (a.iniciative || 0));
    }

    public get aliveCharacters() {
        return this.characters
            .filter(char => (char.hit_points || 0) > 0);

    }
    public get deadCharacters() {
        return this.characters
            .filter(char => (char.hit_points || 0) <= 0);
    }
    public get timePassed() {
        if (!this.isStarted) {
            return '--:--:--';
        }
        return moment.utc((this._round - 1) * 6 * 1000).format('HH:mm:ss');
    }
    public get currentCharacter() {
        return this.characters[this._currentCharacter];
    }

    public get isStarted() {
        return this._isStarted;
    }

    public get canBeStarted() {
        return this.characters.length > 1;
    }

    private get nextCharacterIndex() {
        if (this.currentCharacterIsLastInRound()) {
            return 0;
        } else {
            return this._currentCharacter + 1;
        }
    }

    private get previousCharacterIndex() {
        if (this._currentCharacter === 0) {
            return this.characters.length - 1;
        } else {
            return this._currentCharacter - 1;
        }
    }
    public startEncounter() {
        if (this._isStarted) {
            throw new Error('already started');
        }
        this._round = 1;
        this._isStarted = true;
    }
    public endEncounter() {
        if (!this._isStarted) {
            throw new Error('not yet started');
        }
        this._round = 0;
        this._isStarted = false;
    }
    private currentCharacterIsLastInRound() {
        return this._currentCharacter === this.characters.length - 1;
    }
    private currentCharactersFirstInRound() {
        return this._currentCharacter === 0;
    }

    public addCharacter(add: IActionableCharacter) {
        this._characters.push(add);
    }

    public removeCharacter(remove: IActionableCharacter) {
        this._characters.splice(this._characters.findIndex(char => char.uuid === remove.uuid), 1);
    }

    public updateCharacter(update: IActionableCharacter) {
        this._characters = this._characters.map(player => {
            if (player.uuid !== update.uuid) return player;
            return update;
        })
        if (this.allEnemiesAreDead()) {
            this.endEncounter();
        }
    }

    public giveTurnToNextCharacter() {
        if (this.allEnemiesAreDead()) {
            this.endEncounter();
            return;
        }
        if (this.currentCharacterIsLastInRound()) {
            this._round = this._round + 1;
        }
        if (this.nextPlayerIsDead()) {
            this._currentCharacter = this.nextCharacterIndex;
            this.giveTurnToNextCharacter();
        } else {
            this._currentCharacter = this.nextCharacterIndex;
        }
    }

    public giveTurnToPreviousCharacter() {
        if (this.allEnemiesAreDead()) {
            this.endEncounter();
            return;
        }
        if (this.currentCharactersFirstInRound()) {
            this._round = this._round - 1;
        }

        if (this.previousPlayerIsDead()) {
            this._currentCharacter = this.previousCharacterIndex;
            this.giveTurnToPreviousCharacter();
        } else {
            this._currentCharacter = this.previousCharacterIndex;
        }
    }

    public toEncounterData(): IEncounterData {
        return {
            round: this._round,
            currentCharacter: this._currentCharacter,
            players: this.characters.filter(char => char instanceof Player) as IPlayer[],
            monsters: this.characters.filter(char => char instanceof Monster) as IMonster[],
            isStarted: this._isStarted
        }
    }

    private onlyOneCharacterIsAlive() {
        return this.characters.filter(char => (char.hit_points || 0) > 0).length <= 1;
    }

    private allEnemiesAreDead() {
        return !this.characters.some(char => char instanceof Monster && char.hit_points > 0);
    }

    private nextPlayerIsDead() {
        return (this.characters[this.nextCharacterIndex].hit_points || 0) <= 0;
    }
    private previousPlayerIsDead() {
        return (this.characters[this.previousCharacterIndex].hit_points || 0) <= 0;
    }
}

export default Encounter;