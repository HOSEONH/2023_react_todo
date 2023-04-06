import React, { useState } from 'react';

import './todoStyle.css'

const TodoContainer = (props) => {
    const [todoList, setTodoList] = useState([
        { id: "4월 5일", list: "첫번째 할일", checked: true },
        { id: "4월 6일", list: "두번째 할일", checked: true }
    ]);
    const [todoValue, setTodoValue] = useState("");
    const [showAll, setShowAll] = useState(false);

    const addTodo = () => {
        const newTodoList = todoList.concat({
            id: date(new Date()),
            list: todoValue,
            checked: false,
        });
        setTodoList(newTodoList);
        setTodoValue("");
    };

    const inputChange = (e) => {
        setTodoValue(e.target.value);
    };

    const date = (dateObj) => {
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        return `${month}월 ${day}일`;
    };

    const deleteTodo = (item) => {
        const newTodoList = todoList.filter((t) => t !== item);
        setTodoList(newTodoList);
    };

    const handleShowAllClick = () => {
        setShowAll(true);
    };

    const handleShowTodayClick = () => {
        setShowAll(false);
    };

    const today = date(new Date());

    const filteredTodoList = showAll
        ? todoList
        : todoList.filter((item) => item.id === today);

    return (
        <div
            className='div'
        >
            <h1 className='h1'>Todo-list</h1>
            <input
                className='input'
                type="text" value={todoValue} onChange={inputChange} />
            <button 
                className='input_btn'
                onClick={addTodo}>
                    +
            </button>
            <hr />
            <button 
                onClick={handleShowAllClick}
                className='btn1'
            >
                    모든 할일
            </button>
            <button
                onClick={handleShowTodayClick}
                className='btn2'
            >
                오늘 할일
            </button>
            <ul className='ul'>
                {filteredTodoList.map((item, i) => (
                    <li
                    key={i}
                    className={item.checked && "on"}
                    >
                        <input
                            id='check'
                            type="checkbox"
                            checked={item.checked}
                            readOnly
                            onClick={() => {
                                const newTodoList = todoList.map((t) => {
                                    if (item !== t) {
                                        return t;
                                    } else {
                                        return { ...t, checked: !t.checked };
                                    }
                                });
                                setTodoList(newTodoList);
                            }}
                        />
                        <p>{item.id}</p>
                        <label htmlFor="check"></label>{item.list}
                        <button
                            className='li_btn'
                            onClick={() => deleteTodo(item)}>
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoContainer;