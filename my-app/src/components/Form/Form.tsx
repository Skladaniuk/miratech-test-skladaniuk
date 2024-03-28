import React, { useState } from 'react';
import { Task } from '../../App';
import styles from './Form.module.scss';



type FormProps = {
    onSubmit: (data: Task) => void;
};

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string | null>('');

    const handlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handlerDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ id: '', title, description, completed: false });
        reset();
    };

    const reset = () => {
        setTitle('');
        setDescription('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                <h2 className={styles.title}>Title</h2>
                <input
                    className={styles.input}
                    type="text"
                    name="title"
                    value={title}
                    onChange={handlerTitleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={styles.label}>
                <h2 className={styles.title}>Description</h2>
                <input
                    className={styles.input}
                    type="text"
                    name="description"
                    value={description || ''}
                    onChange={handlerDescriptionChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <button className={styles.button} type="submit">
                Add task
            </button>
        </form>
    );
};