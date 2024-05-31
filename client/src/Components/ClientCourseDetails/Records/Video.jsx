import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function Video({ sl, title = "", link = "", desc = "" }) {
  const navigate = useNavigate();
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
        onClick={() => {
          // navigate(link);
          let vid = link.split("/");
          navigate(vid[vid.length - 1]);
        }}
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
    </div>
  );
}

export default Video;
