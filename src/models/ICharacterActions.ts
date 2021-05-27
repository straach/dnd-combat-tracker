interface ICharacterActions {
    changeComment: (comment: string) => void;
    changeHitPoints: (hit_points: number) => void;
    changeConditions: (conditions: string[]) => void;

}
export default ICharacterActions;