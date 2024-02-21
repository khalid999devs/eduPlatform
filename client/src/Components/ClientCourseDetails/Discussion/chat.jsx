import { useEffect, useRef, useState } from "react";
import InputBox from "./inputBox";
import RootSms from "./rootsms";
import { client } from "../../../axios/discussion";
import { useParams } from "react-router-dom";
const fetchChat = (id, setChats) => {
  client.getDiscussion(id, setChats);
};

function ChatBox({ isAdmin }) {
  const [replyId, setReplyId] = useState(-1);
  const [chats, setChats] = useState([]);
  const { cid } = useParams();
  const scrollRef = useRef(null);
  useEffect(() => {
    setInterval(() => {
      fetchChat(cid, setChats);
      // console.warn('calling multiple');
    }, 10000);
  }, []);
  useEffect(() => {
    fetchChat(cid, setChats);
  }, [cid]);

  return (
    <div className="bg-trans_bluish/0 rounded-md py-1 max-w-6xl  mx-auto h-[65vh] overflow-y-hidden">
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
        >
          {chats.length === 0 ? (
            <h2 className="text-center text-4xl text-gray-500 mt-32 mb-auto pointer-events-none select-none">
              Send a message to start discussion
            </h2>
          ) : null}
        </RootSms>
        <InputBox
          replyId={replyId}
          setReplyId={setReplyId}
          cid={cid}
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
