import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
function Video({ sl, title = "", link = "", desc = "" }) {
  const { cid } = useParams();
  const vid = link.split("/");
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap items-center justify-between my-px p-1 shadow-lg shadow-gray-500 hover:shadow-inner bg-slate-800 text-white rounded-md text-base text-center group">
      <p
        className="text-center group-hover:bg-rose-400 w-10 h-10 flex items-center justify-center rounded-full mx-auto transition-colors"
        type="button"
      >
        <b>{sl}</b>
      </p>

      <p className="text-left pl-5">{title || "Class link"}</p>

      <a
        href={`record/${vid[vid.length - 1]}`}
        className="flex items-center justify-center gap-1 p-2 w-fit mx-auto border bg-white text-black text cursor-pointer rounded-md transition-all"
        title={title}
        onClick={() => {
          localStorage.setItem("customTitle", title);
        }}
      >
        <AiFillPlayCircle />
        <span className="lg:block hidden">Play</span>
      </a>

      <div className="text-left border-l-2 border-white m-2 w-auto p-2 hidden lg:block">
        <p className="font-medium">Description: </p>
        <p>
          {desc.split("\n").map((value) => {
            return (
              <React.Fragment key={`value_${value}`}>
                {" "}
                <span>{value}</span> <br />{" "}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default Video;
