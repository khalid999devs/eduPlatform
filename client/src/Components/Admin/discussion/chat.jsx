import { useEffect, useRef, useState } from "react";
import InputBox from "./inputBox";
import RootSms from "./rootsms";
import { admin } from "../../../axios/discussion";
const fetchChat = (id, setChats) => {
  admin.getDiscussion(id, setChats);
};

function ChatBox({ courseId, isAdmin }) {
  const [replyId, setReplyId] = useState(-1);
  const [chats, setChats] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchChat(courseId, setChats);
    setInterval(() => {
      fetchChat(courseId, setChats);
    }, 15000);
  }, [courseId]);
  return (
    <div className="bg-trans_bluish/0 rounded-md py-1 max-w-6xl  mx-auto h-[85vh] overflow-y-hidden">
      <div className="px-4 pb-0 flex flex-col h-full w-auto">
        <RootSms
          setReplyId={setReplyId}
          chats={chats.sort((a, b) => {
            let x = a.createdAt;
            let y = b.createdAt;
            if (x < y) return -1;
            else if (x > y) return 1;
            else return 0;
          })}
          isAdmin={isAdmin}
          ref={scrollRef}
        />
        <InputBox
          replyId={replyId}
          setReplyId={setReplyId}
          cid={courseId}
          replyMsg={
            chats.sort((a, b) => {
              let x = a.createdAt;
              let y = b.createdAt;
              if (x < y) return -1;
              else if (x > y) return 1;
              else return 0;
            })[replyId]
          }
        />
      </div>
    </div>
  );
}

export default ChatBox;
