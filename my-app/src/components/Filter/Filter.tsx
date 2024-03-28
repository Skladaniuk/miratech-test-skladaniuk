import styles from './Filter.module.scss';

type FilterProps = {
    onChangeFilterType: (type: string) => void;
    filter: string;
    changeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterType: string;
};

export const Filter = ({ onChangeFilterType, filter, changeFilter, filterType }: FilterProps) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <p>Find task:</p>
                <input className={styles.input} type="text" value={filter} onChange={changeFilter} />
            </label>
            <button
                className={`${styles.button} ${filterType === 'all' ? styles.active : ''}`}
                onClick={() => onChangeFilterType('all')}
            >
                All
            </button>
            <button
                className={`${styles.button} ${filterType === 'completed' ? styles.active : ''}`}
                onClick={() => onChangeFilterType('completed')}
            >
                Completed
            </button>
            <button
                className={`${styles.button} ${filterType === 'uncompleted' ? styles.active : ''}`}
                onClick={() => onChangeFilterType('uncompleted')}
            >
                Uncompleted
            </button>
        </div>
    )
};