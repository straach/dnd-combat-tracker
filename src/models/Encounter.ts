import moment from 'moment';
import ICharacter from './ICharacter';
import Monster from './IMonster';
import IMonster from './IMonster';
import Player from './IPlayer';
import IPlayer from './IPlayer';

export interface IEncounterData {
    round: number;
    players: IPlayer[];
    enemies: IMonster[];
    isStarted: boolean;
    currentCharacter: number;
}

class Encounter {
    public _round: number;
    private _players: IPlayer[];
    private _enemies: IMonster[];
    private _isStarted: boolean;
    private _currentCharacter: number;
    constructor({ round = 0, players = [], enemies = [], isStarted = false, currentCharacter = 0 }: IEncounterData) {
        this._round = round;
        this._players = players.map(player => new Player(player));
        this._enemies = enemies.map(monster => new Monster(monster));
        this._isStarted = isStarted;
        this._currentCharacter = currentCharacter;
    }
    public get round() {
        return this._round;
    }
    public get characters(): ICharacter[] {
        const characters = this._players as ICharacter[];
        return characters.concat(this._enemies);
    }

    public get aliveCharacters() {
        return this.characters
            .filter(char => (char.hit_points || 0) > 0)
            .sort((a, b) => (b.iniciative || 0) - (a.iniciative || 0))
    }
    public get deadCharacters() {
        return this.characters
            .filter(char => (char.hit_points || 0) <= 0)
            .sort((a, b) => (b.iniciative || 0) - (a.iniciative || 0))
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

    public addCharacter(add: ICharacter) {
        if (add instanceof Player) {
            this._players.push(add);
        }
        if (add instanceof Monster) {
            this._enemies.push(add);
        }

    }

    public removeCharacter(remove: ICharacter) {
        if (remove instanceof Player) {
            this._players.splice(this._players.indexOf(remove, 1));
        }
        if (remove instanceof Monster) {
            this._enemies.splice(this._enemies.indexOf(remove, 1));
        }
    }

    public updateCharacter(update: ICharacter) {
        if (update instanceof Player) {
            this._players = this._players.map(player => {
                if (player.name !== update.name) return player;
                return update;
            })
        }
        if (update instanceof Monster) {
            this._enemies = this._enemies.map(enemy => {
                if (enemy.name !== update.name) return enemy;
                return update;
            })
        }
        
    }

    public giveTurnToNextCharacter() {
        if (this.onlyOneCharacterIsAlive() || this.round === 0) {
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
        if (this.onlyOneCharacterIsAlive() || this.round === 0) {
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
            players: this._players,
            enemies: this._enemies,
            isStarted: this._isStarted
        }
    }

    private onlyOneCharacterIsAlive() {
        return this.characters.filter(char => (char.hit_points || 0) > 0).length <= 1;
    }

    private nextPlayerIsDead() {
        return (this.characters[this.nextCharacterIndex].hit_points || 0) <= 0;
    }
    private previousPlayerIsDead() {
        return (this.characters[this.previousCharacterIndex].hit_points || 0) <= 0;
    }
}

export default Encounter;