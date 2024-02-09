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
const RootSms = ({ setReplyId, chats = [], isAdmin }) => {
  return (
    <div className="flex-1 overflow-y-scroll pr-2">
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
    </div>
  );
};

export default RootSms;
