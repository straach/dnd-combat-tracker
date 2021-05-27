import IBaseMonster from "../models/IBaseMonster";
import { IMonster } from "../models/Monster";
import useLocalStorage from "./useLocalStorageHook";

const useLastMonsters = (maximum: number) => {
    const [lastMonsters, setLastMonsters] = useLocalStorage<IBaseMonster[]>('lastMonsters', [] as IBaseMonster[]);
    const pushMonster = (add: IMonster) => {
        if (lastMonsters.length === maximum) {
            lastMonsters.shift();
        }
        lastMonsters.push(add);
        setLastMonsters(lastMonsters);
    }
    return { lastMonsters, pushMonster }
}

export default useLastMonsters;