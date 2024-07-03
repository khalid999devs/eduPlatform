import { AiFillPlayCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
function Video({ sl, title = "", link = "", desc = "" }) {

  const { cid } = useParams()
  const vid = link.split("/");
  return (
    <div className="grid grid-cols-4 gap items-center justify-between my-px p-1 border border-red-600 rounded-md text-base text-center group">
      <p
        className="text-center group-hover:bg-rose-400 w-10 h-10 flex items-center justify-center rounded-full mx-auto transition-colors"
        type="button"
      >
        <b>{sl}</b>
      </p>
      <p className="text-left pl-5">{title}</p>
      <a href={`record/${vid[vid.length - 1]}`}
        className="flex items-center justify-center gap-1 bg-rose-200 hover:bg-red-400 hover:text-white cursor-pointer rounded-md transition-all cursor-default"
        title={title}
      >
        <AiFillPlayCircle fill="#2f2f2f" /> Play Now
      </a>

      <p className="text-left border m-2 w-auto p-2">
        <b>Description: </b>
        {desc.split("\n").map((value) => {
          return (
            <>
              {" "}
              <span key={`value_${value}`}>{value}</span> <br />{" "}
            </>
          );
        })}
      </p>
    </div>
  );
}

export default Video;
