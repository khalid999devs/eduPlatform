import { raw_msg_data } from "./chat";
import Card from "./smsCard";

const showTime = (time) => {
  let today = new Date();
  if (
    today.getTime() - time.getTime() <= 86400 * 1000 &&
    today.getDate() == time.getDate()
  ) {
    return "Today";
  } else if (today.getTime() - time.getTime() < 86400 * 2000) {
    return "Yesterday";
  } else return `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
};
const RootSms = ({ setReplyId }) => {
  return (
    <div className="rootsms flex-1 h-full relative overflow-y-scroll pr-2  ">
      {raw_msg_data
        .sort((a, b) => {
          if (a.time.getTime() < b.time.getTime()) return -1;
          else if (a.time.getTime() > b.time.getTime()) return 1;
          else return 0;
        })
        .map((msg, id) => {
          let preDate = id > 0 ? raw_msg_data[id - 1].time.getTime() : 0;

          //time short_key
          let time = msg.time.getTime();
          let hh = msg.time.getHours();
          let mm = msg.time.getMinutes();

          //return component
          return (
            <div
              className="flex flex-col items-center w-auto mx-auto my-2"
              key={id}
            >
              <div
                className={`date flex items-center gap-1 w-auto text-center ${
                  preDate == time ? "hidden" : ""
                }`}
              >
                <p className="w-fit text-slate-400/70 my-5 text-sm">
                  {showTime(msg.time)}
                  <span className="px-2 text-xs">
                    {(hh < 10 ? `0${hh}` : hh) +
                      " : " +
                      (mm < 10 ? `0${mm}` : mm)}
                  </span>
                </p>
              </div>
              <Card
                key={id}
                sender={msg.sender}
                isTeacher={msg.isTeacher}
                message={msg.message}
                handleReply={() => setReplyId(id)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default RootSms;
