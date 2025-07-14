import React, { useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";
import { useRef } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRaf = useRef();

  const add = () => {
    const inputText = inputRaf.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRaf.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-full max-w-md flex flex-col p-6 sm:p-8 md:p-10 min-h-[500px] rounded-xl shadow-lg">
      {/* ............title........ */}
      <div className="flex items-center gap-3 mt-4">
        <img className="w-8 sm:w-10" src={todo_icon} alt="" />
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          To-Do List
        </h1>
      </div>

      {/* input box */}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center my-6 gap-3 bg-gray-200 rounded-full p-2">
        <input
          ref={inputRaf}
          className="bg-transparent border-0 outline-none flex-1 h-12 sm:h-14 px-4 text-sm sm:text-base placeholder:text-slate-600 content-between"
          type="text"
          placeholder="Add your task"
        />

        <button
          onClick={add}
          className="rounded-full bg-pink-600 h-12 sm:h-14 px-4 sm:px-6 text-white text-base font-medium transition hover:bg-pink-700"
        >
          ADD +
        </button>
      </div>

      {/* ......todo list...... */}
      <div className="overflow-y-auto max-h-[320px]">
        {todoList.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
