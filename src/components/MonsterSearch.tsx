import { AutoComplete, Input, InputNumber, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import IDnd5eApiReference from '../models/IDnd5eApiReference';
import IMonster from '../models/IMonster';
import { getAllMonsters, getMonster } from '../resources/dndapi';

interface IMonsterInputProps {
    onAdd: (addNo: number) => void;
}
function MonsterInput({ onAdd }: IMonsterInputProps) {
    const [amount, setAmount] = useState<number>(1);
    return <>
        <InputNumber min={0} value={amount} onChange={setAmount} />
        <Button onClick={() => onAdd(amount)}>Add</Button>
    </>
}

interface IOption {
    value: any;
    label: any;
    more: IDnd5eApiReference;
}

const monsterToOption = (monster: IDnd5eApiReference): IOption => {
    return {
        value: monster.name,
        label: <div>{monster.name}</div>,
        more: monster,
    }
}

export interface IMonsterListProps {
    onSelect: (monsters: IMonster[]) => void;
}
export function MonsterSearch(props: IMonsterListProps) {
    const [allMonsters, setAllMonsters] = useState<IOption[]>([] as IOption[]);
    const [searchResult, setSearchResult] = useState<IOption[]>([] as IOption[]);
    const [preSelectedMonster, setPreSelectedMonster] = useState<IMonster | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    useEffect(() => {
        // getAllMonsters()
        //     .then(monsters => (monsters || []).map(monsterToOption)
        //     )
        //     .then(monsters => setAllMonsters(monsters))
    }, []);
    const handleOnChange = (search: string) => {
        setInputValue(search);
        setPreSelectedMonster(null);
    }
    const handleSearch = (search: string) => {
        setSearchResult(allMonsters
            .filter(monster => monster.more.name.toLowerCase()
                .indexOf(search.toLowerCase()) > -1))
    }
    const handleSelect = (_value: string, optionData: any) => {
        getMonster(optionData.more.index)
            .then(monster => setPreSelectedMonster(monster))
        // props.onSelect(monster)
    }
    const handleOnAdd = (amount: number) => {
        // props.onSelect(monster)
    }

    return (
        <>
            <AutoComplete
                style={{ width: '60%' }}
                options={searchResult}
                onSelect={handleSelect}
                onSearch={handleSearch}
                onChange={handleOnChange}
                value={inputValue}
            >
                <Input
                    size="large"
                    allowClear={true}
                    placeholder="input here"
                />
            </AutoComplete>
            <MonsterInput onAdd={handleOnAdd} />
        </>
    );
}

export default MonsterSearch;