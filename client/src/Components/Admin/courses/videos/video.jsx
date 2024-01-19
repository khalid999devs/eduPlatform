import { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { deleteClass } from "../../../../axios/global";
import YouTubePlayer from "../../../YTPlayer/YTPlayer";
function Video({ sl, id, title = "", link = "", desc = "" }) {
  const [toggle, setToggle] = useState(false);
  const [showVid, setShowVid] = useState(false);
  const handleToggle = () => {
    setToggle((pre) => !pre);
  };
  const handleVideo = () => {
    setShowVid((pre) => !pre);
  };
  const vidLink = link.slice(17, 17 + 11);
  return (
    <div className="grid grid-cols-3 gap items-center justify-between my-px p-1 border border-red-600 rounded-md text-base text-center">
      <p
        className="text-center hover:cursor-pointer hover:bg-rose-400 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
        type="button"
        onClick={handleToggle}
      >
        <b>{sl}</b>
      </p>
      <p className="text-left pl-5">{title}</p>
      <span
        className="flex items-center justify-center gap-1 hover:ring-red-500 hover:ring transition-all cursor-default"
        target="_blank"
        title={link}
        onClick={handleVideo}
      >
        <AiFillYoutube fill="red" /> youtube
      </span>

      <div
        className={`grid-cols-4 grid col-span-4 items-center border-t-2 border-t-black mt-2 overflow-y-hidden transition-all duration-300 ${
          toggle ? "opacity-100 max-h-max" : "opacity-0 max-h-0"
        }`}
      >
        <p className="text-left border m-2 w-auto col-span-3">
          <b>Description: </b>
          {desc.split("\n").map((value) => {
            return (
              <>
                {" "}
                <span key={value}>{value}</span> <br />{" "}
              </>
            );
          })}
        </p>
        <button
          className="bg-red-500 rounded-md text-white capitalize px-3 py-1 "
          onClick={() => {
            if (
              prompt("Do you want to delete this class? [y/n]").toLowerCase() ==
              "y"
            )
              deleteClass(id);
            else alert("Cancel deletation");
          }}
        >
          Delete
        </button>
      </div>
      {showVid && (
        <YouTubePlayer
          key={vidLink + id}
          id={id}
          videoId={vidLink}
          handleVideo={handleVideo}
          showVid={showVid}
        />
      )}
    </div>
  );
}

export default Video;
