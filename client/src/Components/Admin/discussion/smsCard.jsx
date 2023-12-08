import React from "react";
import { MdOutlineReply } from "react-icons/md";
import { user } from "../context/authContext";
const Card = ({ sender, message, isTeacher, handleReply }) => {
  return (
    <div
      className={`w-fit max-w-[75%] py-2 mb-4 rounded-xl relative  ${
        isTeacher
          ? "bg-blue-500 text-right ml-auto pl-6 pr-2 rounded-br-none text-white "
          : "bg-blue-950 text-stone-100 shadow-md shadow-fuchsia-100/10 text-left mr-auto pl-2 pr-6 rounded-bl-none"
      } group `}
    >
      <h3 className={`font-bold mb-2 text-base`}>{sender}</h3>
      <p className={` break-words text-sm`}>{message}</p>

      <div
        className={`absolute top-1/2 -translate-y-1/2  ${
          isTeacher
            ? "right-full -translate-x-1/2"
            : "left-full translate-x-1/2 "
        } text-slate-400 dark:opacity-50 text-lg
        ${user.isTeacher == isTeacher ? "hidden" : "visible"}
         group-[]:opacity-0 group-hover:opacity-50 transition-opacity duration-100 ease-linear delay-300 p-2 hover:bg-neutral-700/50 rounded-full
        `}
        onClick={handleReply}
      >
        <span>
          <MdOutlineReply />
        </span>
      </div>
    </div>
  );
};

export default Card;
