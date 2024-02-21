import React, { useEffect, useRef, useState } from "react";
import Card from "./smsCard";
import { FaHandPointDown } from "react-icons/fa";

const showTime = (time) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let today = new Date();
  if (
    today.getTime() - time.getTime() <= 86400 * 1000 &&
    today.getDate() == time.getDate()
  ) {
    return "Today";
  } else if (today.getTime() - time.getTime() < 86400 * 2000) {
    return "Yesterday";
  } else
    return `${time.getDate()}-${months[time.getMonth()]}-${time.getFullYear()}`;
};
const RootSms = React.forwardRef(
  ({ setReplyId, chats = [], isAdmin, children }, ref) => {
    const containerRef = useRef(null);
    const [willScroll, setWillScroll] = useState(false);
    const handleScroll = () => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };
    useEffect(() => {
      handleScroll();
    }, [chats?.length > 0]);

    const checkScroll = () => {
      setWillScroll(
        containerRef.current?.scrollHeight - containerRef.current?.scrollTop >
          1000
      );
    };
    return (
      <div
        className="flex-1 overflow-y-scroll pr-2"
        ref={containerRef}
        onScroll={checkScroll}
      >
        {children}
        {chats.map((msg, id) => {
          let user = chats[0] ? JSON.parse(msg?.user) : "";
          let preTime = new Date(id > 0 ? chats[id - 1].createdAt : 0);
          let preDate = `${preTime.getDate()}-${preTime.getMonth()}-${preTime.getFullYear()}`;
          let msgTime = new Date(msg?.createdAt);

          let msgDate = `${msgTime.getDate()}-${msgTime.getMonth()}-${msgTime.getFullYear()}`;

          //return component
          return (
            <div
              className="flex flex-col items-center w-auto mx-auto my-2"
              key={id}
            >
              {/* show date */}
              <div
                className={`date flex items-center gap-1 w-auto text-center ${
                  preDate == msgDate ? "hidden" : ""
                }`}
              >
                <p className="w-fit text-slate-400/70 my-5 text-sm">
                  {showTime(msgTime)}
                </p>
              </div>
              <Card
                key={id}
                sender={user?.fullName}
                isTeacher={user?.role}
                message={msg.question}
                reply={msg?.commentreplies}
                sentTime={msg?.createdAt}
                files={JSON.parse(msg?.filesUrl)}
                isAdmin={isAdmin}
                handleReply={() => setReplyId(id)}
              />
            </div>
          );
        })}

        <button
          className={`absolute bg-gray-700 text-white font-bold rounded-full w-10 h-10 left-1/2 -translate-x-1/2 mb-10 ${
            willScroll
              ? "opacity-100 bottom-20"
              : "bottom-10 opacity-0 pointer-events-none"
          } transition-all`}
          onClick={handleScroll}
        >
          <FaHandPointDown className="mx-auto" />
        </button>

        <div className="scrollDown" ref={ref}></div>
      </div>
    );
  }
);

export default RootSms;
