interface IDnd5eApiReference {
    index: string;
    name: string;
    url: string;
}

export default IDnd5eApiReference;

export interface IIndexResult<T> {
    count: number;
    results: T;
}