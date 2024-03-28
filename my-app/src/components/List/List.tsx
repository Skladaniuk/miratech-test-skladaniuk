import styles from './List.module.scss';
import { Item } from '../Item/Item';
import { Task } from '../../App';
import { Dispatch, SetStateAction } from 'react';

type ListProps = {
    list: Task[];
    onDeleteItem: (itemId: string) => void;
    onToggleComplete: (itemId: string) => void;
    setList: Dispatch<SetStateAction<Task[]>>;
};

export const List = ({ list, onDeleteItem, onToggleComplete, setList }: ListProps) => {

    return (     
        <div>
            <ul className={styles.list}>
                {list.map((item) => (
                    <li>
                        <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleComplete={onToggleComplete} />
                   </li> 
                ))}
            </ul>
        </div>

    )
};