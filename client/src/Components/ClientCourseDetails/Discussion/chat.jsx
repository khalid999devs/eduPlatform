import { useState } from "react";
import InputBox from "./inputBox";
import RootSms from "./rootsms";

function ChatBox() {
  const [replyId, setReplyId] = useState(null);

  return (
    <div className="chat px-10 pb-20 my-0 w-full h-[43em] relative justify-around">
      <RootSms setReplyId={setReplyId} />
      <InputBox replyId={replyId} />
    </div>
  );
}

export const raw_msg_data = [
  {
    sender: "Teacher",
    message: "Hello!",
    isTeacher: true,
    time: new Date(1698415442968 - 10000 * 10000),
  },
  {
    sender: "Turya",
    message: "Hi sir 😁😁!",
    isTeacher: false,
    time: new Date(1698415442968 - 500 * 500000),
  },
  {
    sender: "Turya",
    message: "kemon achen?? 🤭!",
    isTeacher: false,
    time: new Date(1698415442968 - 54321 * 100000),
  },
  {
    sender: "Turya",
    message: "What's up!! 😉😉",
    isTeacher: false,
    time: new Date(),
  },
  {
    sender: "Teacher",
    message: "Aeh halar po!! 😤😤",
    isTeacher: true,
    time: new Date(),
  },
  {
    sender: "Turya",
    message: "Hi sir 😁😁!",
    isTeacher: false,
    time: new Date(1698415442968 - 500 * 500000),
  },
  {
    sender: "Turya",
    message: "kemon achen?? 🤭!",
    isTeacher: false,
    time: new Date(1698415442968 - 54321 * 100000),
  },
  {
    sender: "Turya",
    message: "What's up!! 😉😉",
    isTeacher: false,
    time: new Date(),
  },
  {
    sender: "Sakib",
    message:
      "Aeh halar po!! 😤😤 Porgiamo come esso manifesta niuna sua fa cosí quale di divina. noi e da procuratore novella si come e. Primo né che quale procuratore essilio. Forza esse dare cose i, maesta il da nel alla e la in intendo in, quegli né propria trapassare le come alla di dare.",
    isTeacher: false,
    time: new Date(),
  },
];
export default ChatBox;
