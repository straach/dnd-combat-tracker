import moment from 'moment';
import IPlayerProps from './models/IPlayerProps';

export interface IEncounterData {
    round: number;
    characters: IPlayerProps[];
    isStarted: boolean;
    currentCharacter: number;
}

class Encounter {
    public _round: number;
    private _characters: IPlayerProps[];
    private _isStarted: boolean;
    private _currentCharacter: number;
    constructor({ round = 0, characters = [], isStarted = false, currentCharacter = 0 }: IEncounterData) {
        this._round = round;
        this._characters = characters;
        this._isStarted = isStarted;
        this._currentCharacter = currentCharacter;
    }
    public get round() {
        return this._round;
    }
    public get characters() {
        return this._characters;
    }

    public get aliveCharacters() {
        return this._characters.filter(char => (char.health || 0) > 0).sort((a, b) =>  (b.iniciative || 0) - (a.iniciative || 0))
    }
    public get deadCharacters() {
        return this._characters.filter(char => (char.health || 0) <= 0).sort((a, b) => (b.iniciative || 0) - (a.iniciative || 0))
    }
    public get timePassed() {
        if (!this.isStarted) {
            return '--:--:--';
        }
        return moment.utc((this._round - 1) * 6 * 1000).format('HH:mm:ss');
    }
    public get currentCharacter() {
        return this._characters[this._currentCharacter];
    }

    public get isStarted() {
        return this._isStarted;
    }

    public get canBeStarted() {
        return this._characters.length > 1;
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
            return this._characters.length - 1;
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
        return this._currentCharacter === this._characters.length - 1;
    }
    private currentCharactersFirstInRound() {
        return this._currentCharacter === 0;
    }

    public addCharacter(add: IPlayerProps) {
        this._characters.push(add);
    }
    public removeCharacter(remove: IPlayerProps) {
        this._characters.splice(this._characters.indexOf(remove, 1));
    }
    public updateCharacter(update: IPlayerProps) {
        this._characters = this._characters.map(player => {
            if (player.name !== update.name) return player;
            return update;
        })
    }

    public giveTurnToNextPlayer() {
        if (this.onlyOneCharacterIsAlive() || this.round === 0) {
            this.endEncounter();
            return;
        }
        if (this.currentCharacterIsLastInRound()) {
            this._round = this._round + 1;
        }
        if (this.nextPlayerIsDead()) {
            this._currentCharacter = this.nextCharacterIndex;
            this.giveTurnToNextPlayer();
        } else {
            this._currentCharacter = this.nextCharacterIndex;
        }
    }

    public giveTurnToPreviousPlayer() {
        if (this.onlyOneCharacterIsAlive() || this.round === 0) {
            this.endEncounter();
            return;
        }
        if (this.currentCharactersFirstInRound()) {
            this._round = this._round - 1;
        }

        if (this.previousPlayerIsDead()) {
            this._currentCharacter = this.previousCharacterIndex;
            this.giveTurnToPreviousPlayer();
        } else {
            this._currentCharacter = this.previousCharacterIndex;
        }
    }

    public toEncounterData(): IEncounterData {
        return {
            round: this._round,
            currentCharacter: this._currentCharacter,
            characters: this._characters,
            isStarted: this._isStarted
        }
    }

    private onlyOneCharacterIsAlive() {
        return this._characters.filter(char => (char.health || 0) > 0).length <= 1;
    }

    private nextPlayerIsDead() {
        return (this._characters[this.nextCharacterIndex].health || 0) <= 0;
    }
    private previousPlayerIsDead() {
        return (this._characters[this.previousCharacterIndex].health || 0) <= 0;
    }
}

export default Encounter;