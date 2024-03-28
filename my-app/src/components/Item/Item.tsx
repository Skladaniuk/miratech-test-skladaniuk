import styles from './Item.module.scss';
import { Task } from '../../App';

type ItemProps = {
    item: Task;
    onDeleteItem: (itemId: string) => void;
    onToggleComplete: (itemId: string) => void;
};

export const Item = ({ item, onDeleteItem, onToggleComplete }: ItemProps) => {
    return (
        <div className={`${styles.item} ${item.completed ? styles.completed : ''}`}>
            <div style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.title}: {item.description}
            </div>
            <div className={styles.itemActions}>
                <button type="button" onClick={() => onDeleteItem(item.id)}>
                    Delete
                </button>
                <button type="button" onClick={() => onToggleComplete(item.id)}>
                    {item.completed ? 'Undo' : 'Complete'}
                </button>
            </div>
        </div>
    );
};