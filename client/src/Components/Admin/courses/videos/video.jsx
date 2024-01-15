import { AiFillYoutube } from "react-icons/ai";
function Video({ title, link, length }) {
  return (
    <div className="grid grid-cols-3 gap items-center justify-between my-px p-1 border border-red-600 rounded-md text-base text-center">
      <p className="text-left">{title}</p>
      <a
        className="flex items-center justify-center gap-1 hover:ring-red-500 hover:ring transition-all"
        href={link}
        target="_blank"
        title={link}
      >
        <AiFillYoutube fill="red" /> youtube
      </a>
      <p className="w-fit">{length}s</p>
    </div>
  );
}

export default Video;
