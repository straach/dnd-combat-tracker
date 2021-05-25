import KeyedObject from "../../models/KeyedObject";

interface IKeyedList {
    value?: KeyedObject<any>;
}
const KeyedList = (props: IKeyedList) => {
    if (!props.value) {
        return <></>;
    }
    const entries = Object.entries(props.value).map(([key, value]) => `${key}: ${value}`)
    const joined = entries.join(', ');
    return <span>{joined}</span>;
}

export default KeyedList;