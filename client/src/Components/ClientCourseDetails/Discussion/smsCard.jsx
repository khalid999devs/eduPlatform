import React from "react";
import { MdOutlineReply, MdDeleteOutline, MdReply } from "react-icons/md";
import { reqImgWrapper, reqPdfWrapper } from "../../../assets/requests";
import { FaFileAlt } from "react-icons/fa";
const Card = ({
  sender,
  message,
  isTeacher,
  handleReply,
  files = [],
  sentTime,
  reply = [],
}) => {
  function handleDelete() {
    // await client.deleteChat()
    alert("Will be available soon!");
  }
  return (
    <div
      className={`w-fit max-w-[75%] p-2 mb-4 rounded-xl relative  ${
        isTeacher === "user"
          ? "bg-white text-right ml-auto rounded-br-none text-root_bluish shadow-md "
          : "bg-gradient-to-tr from-blue-400 to-blue-600 text-stone-100 text-left mr-auto rounded-bl-none"
      } group`}
    >
      <div>
        <h3 className={`font-bold mb-2 text-sm text-teal-400`}>{sender}</h3>
        <p className={` break-words text-xs`}>{message}</p>

        <div
          className={`absolute top-1/2 -translate-y-1/2 hidden ${
            isTeacher === "user"
              ? "right-full -translate-x-1/2"
              : "left-full translate-x-1/2 "
          } text-slate-400 dark:opacity-50 text-lg
        ${isTeacher === "user" ? "hidden" : "visible"}
         group-[]:opacity-0 group-hover:opacity-50 transition-opacity duration-100 ease-linear delay-300 p-2 hover:bg-neutral-700/50 rounded-full
        `}
          onClick={handleReply}
        >
          <span>
            <MdOutlineReply />
          </span>
        </div>
        {/* image component */}
        <div className="flex flex-wrap">
          {files.map((file, id) => {
            if (file?.filename?.includes(".pdf"))
              return (
                <a
                  className="w-fit m-px h-fit"
                  href={reqPdfWrapper(file?.path)}
                  key={`file-${id}-pdf`}
                  target="_blank"
                  download={true}
                >
                  <button className="relative flex items-center gap-1 mb-2 w-auto h-fit left-0 top-4 text-white bg-slate-600 whitespace-nowrap p-2 size max-w-sm rounded-md shadow-sm">
                    <FaFileAlt fill="#fffa" /> {file?.originalname}
                  </button>
                </a>
              );
            return (
              <a
                key={`img${id}%${id}`}
                href={reqImgWrapper(file?.path)}
                target="_blank"
                className="w-fit m-px h-fit"
              >
                <img
                  className="aspect-square max-w-xs h-auto w-36 m-1 rounded-md overflow-hidden"
                  width={500}
                  height={300}
                  src={reqImgWrapper(file?.path)}
                  alt={file?.filename}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* delete btn & reply */}

      <div>
        <button
          className="bg-orange-500 rounded-full p-1 text-lg absolute top-1/2 -left-14 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none hidden delay-300 transition-opacity"
          onClick={handleDelete}
        >
          <MdDeleteOutline fill="white" enableBackground={"true"} />
        </button>

        <button
          className={`bg-slate-500 rounded-full p-1 text-lg absolute top-1/2 ${
            isTeacher === "user" ? "-left-14" : "-right-14"
          } -translate-y-1/2 opacity-0 group-hover:opacity-100 delay-300 transition-opacity`}
          onClick={handleReply}
        >
          <MdReply fill="white" enableBackground={"true"} />
        </button>
      </div>

      {/* reply box */}
      {reply?.length > 0 ? (
        <div className="text-left text-xs p-2 min-h-fit">
          <p>Reply:</p>
          {reply.map((rep, id) => {
            const files = JSON.parse(rep?.filesUrl);
            return (
              <div
                className="border border-l-2 text-black bg-gray-200 hover:bg-gray-300 transition-colors duration-200 ease-in-out border-l-rose-500  rounded-md my-1"
                key={`msgId${id}`}
              >
                <p className="font-semibold p-1">
                  From:{" "}
                  {JSON.parse(rep?.user)?.fullName ||
                    JSON.parse(rep?.user)?.userName}
                </p>
                <p className="font-light p-1">{rep?.reply}</p>
                <div className="w-full grid grid-cols-1">
                  {files?.length > 0
                    ? files.map((file, id) => {
                        if (file?.filename?.includes(".pdf"))
                          return (
                            <a
                              className="w-fit m-px h-fit"
                              href={reqPdfWrapper(file?.path)}
                              download={true}
                              target="_blank"
                              key={`reply-file-${id}pdf`}
                            >
                              <button className="flex items-center w-fit h-fit text-black whitespace-nowrap p-2 m-3 size max-w-sm rounded-md shadow-lg shadow-slate-900">
                                <FaFileAlt fill="#25fa" /> {file?.originalname}
                              </button>
                            </a>
                          );
                        return (
                          <a
                            key={`${id}%${id}`}
                            href={reqImgWrapper(file?.path)}
                            target="_blank"
                            className="w-fit h-fit m-px"
                          >
                            <img
                              className="aspect-square max-w-xs h-auto w-36 m-1 rounded-md overflow-hidden"
                              width={500}
                              height={300}
                              src={reqImgWrapper(file?.path)}
                              alt={file?.filename}
                            />
                          </a>
                        );
                      })
                    : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {/* show time */}
      <p
        className={`text-xs mt-3 group-hover:opacity-100 opacity-0 transition-opacity select-none text-slate-600 font-semibold`}
      >
        sent {showTime(sentTime)}
      </p>
    </div>
  );
};
function showTime(time) {
  const date = new Date(time);
  return printTime(date.getHours(), date.getMinutes());
}
function addZero(e) {
  return e < 10 ? `0${e}` : e;
}
function printTime(hh, mm) {
  return `${addZero(checkHours(hh).time)}:${addZero(mm)}  ${
    checkHours(hh).format
  }`;
}
function checkHours(hour) {
  if (hour == 0) {
    return {
      time: 12,
      format: "AM",
    };
  }
  if (hour > 0 && hour <= 12) {
    return {
      time: hour,
      format: hour == 12 ? "PM" : "AM",
    };
  }
  if (hour > 12 && hour <= 23) {
    return {
      time: hour - 12,
      format: "PM",
    };
  }
}
export default Card;
