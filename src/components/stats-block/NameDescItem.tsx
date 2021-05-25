import { INameDescItem } from "../../models/IMonster";

interface INameDescItemProps {
    value: INameDescItem;
}
const NameDescItem = (props: INameDescItemProps) => {
    const { name, desc } = props.value;
    return <div className="property-block">
        <h4>{name}: </h4>
        <p>{desc}</p>
    </div>
}

export default NameDescItem;