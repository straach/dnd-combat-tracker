import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import IBaseMonster from '../models/IBaseMonster';
import IMonster from '../models/IMonster';
interface IGraphQLResult<T> {
    data: T;
}
interface IMonsterResult {
    monsters: IBaseMonster[];
}
const monstersGraphQLRequest = {
    query:
        '{ monsters(limit: 500) { index, name, alignment, size, hit_points, armor_class, type }}' };

const API_BASE_URL = `https://www.dnd5eapi.co/`
const cache = setupCache({
    maxAge: 30 * 60 * 60 * 1000
});

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    adapter: cache.adapter
});


export const getAllMonsters = async () => {
    const result = await instance.post<IGraphQLResult<IMonsterResult>>(`/graphql`, monstersGraphQLRequest);
    return result.data.data.monsters;
}

export const getMonster = async (monster: string) => {
    const result = await instance.get<IMonster>(`/api/monsters/${monster}`);
    return result.data;
}
