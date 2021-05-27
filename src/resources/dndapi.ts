import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import IBaseMonster from '../models/IBaseMonster';
import ICondition from '../models/ICondition';
import IDnd5eApiReference, { IIndexResult } from '../models/IDnd5eApiReference';
import IMonster from '../models/Monster';
interface IGraphQLResult<T> {
    data: T;
}
interface IMonsterResult {
    monsters: IBaseMonster[];
}
const monstersGraphQLRequest = {
    query:
        '{ monsters(limit: 500) { index, name, alignment, size, hit_points, armor_class, type }}'
};

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


export const getConditions = async () => {
    const result = await instance.get<IIndexResult<IDnd5eApiReference[]>>(`/api/conditions`);
    return result.data.results;
}

export const getCondition = async (name: string) => {
    const result = await instance.get<ICondition>(`/api/conditions/${name}`);
    return result.data;
}
