import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import YouTubePlayer from "../../YTPlayer/YTPlayer";
function Video({ sl, id, title = "", link = "", desc = "" }) {
  const [showVid, setShowVid] = useState(false);

  const handleVideo = () => {
    setShowVid((pre) => !pre);
  };
  const vidLink = link.slice(17, 17 + 11);
  console.log(link);
  return (
    <div className="grid grid-cols-4 gap items-center justify-between my-px p-1 border border-red-600 rounded-md text-base text-center group">
      <p
        className="text-center group-hover:bg-rose-400 w-10 h-10 flex items-center justify-center rounded-full mx-auto transition-colors"
        type="button"
      >
        <b>{sl}</b>
      </p>
      <p className="text-left pl-5">{title}</p>
      <span
        className="flex items-center justify-center gap-1 hover:ring-red-500 hover:ring transition-all cursor-default"
        target="_blank"
        title={title}
        onClick={handleVideo}
      >
        <AiFillPlayCircle fill="#2f2f2f" /> Play Now
      </span>

      <p className="text-left border m-2 w-auto p-2">
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

      {showVid && (
        <YouTubePlayer
          key={`${vidLink}+${id}`}
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
