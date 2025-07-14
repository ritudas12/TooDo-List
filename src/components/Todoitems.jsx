import React from "react";

import tick3 from "../assets/tick3.png";

import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center justify-between my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img className="w-5 sm:w-7" src={isComplete ? tick3 : not_tick} alt="" />
        <p
          className={`text-slate-700 text-sm sm:text-base decoration-slate-500
            ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt=""
        className="w-4 sm:w-5 cursor-pointer transition hover:scale-110"
      />
    </div>
  );
};

export default Todoitems;
