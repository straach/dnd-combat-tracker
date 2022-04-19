interface ICharacterActions {
    changeComment: (comment: string) => void;
    changeHitPoints: (hit_points: number) => void;
    changeConditions: (conditions: string[]) => void;
    changeIniciative: (iniciative: number) => void;

}
export default ICharacterActions;