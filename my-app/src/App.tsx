import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { List } from './components/List/List';
import { Form } from './components/Form/Form';
import { Filter } from './components/Filter/Filter';
import styles from './App.module.scss';

export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
};

function App() {
  const [list, setList] = useState<Task[]>(() => {
    const storedList = window.localStorage.getItem('list');
    return storedList ? JSON.parse(storedList) : [];
  });
  const [filter, setFilter] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const addItem = (data: Task) => {
    for (const item of list) {
      if (data.title === item.title) {
        alert(`${data.title} is already in list`);
        return;
      }
    }

    const item: Task = {
      id: nanoid(),
      title: data.title,
      description: data.description,
      completed: false,
    };

    setList((prevState) => [item, ...prevState]);
  };

  const deleteItem = (itemId: string) => {
    setList(list.filter((item) => item.id !== itemId));
  };

  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleItem = (): Task[] => {
    const normalizedFilter = filter.toLocaleLowerCase();
    let filteredList = list.filter(({ title }) =>
      title.toLocaleLowerCase().includes(normalizedFilter)
    );

    if (filterType === 'completed') {
      filteredList = filteredList.filter((item) => item.completed);
    } else if (filterType === 'uncompleted') {
      filteredList = filteredList.filter((item) => !item.completed);
    }

    return filteredList;
  };

  const changeFilterType = (type: string) => {
    setFilterType(type);
  };

  const toggleComplete = (itemId: string) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Task</h1>
      <Form onSubmit={addItem} />
      <Filter
        onChangeFilterType={changeFilterType}
        filter={filter}
        changeFilter={changeFilter}
        filterType={filterType}
      />
      <List
        list={getVisibleItem()}
        onDeleteItem={deleteItem}
        onToggleComplete={toggleComplete}
        setList={setList}
      />
    </div>
  );
}

export default App;