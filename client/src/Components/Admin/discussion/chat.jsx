import { useState } from "react";
import InputBox from "./inputBox";
import RootSms from "./rootsms";

function ChatBox() {
  const [replyId, setReplyId] = useState(null);

  return (
    <div className="bg-transparent max-w-6xl  mx-auto h-4/5 overflow-y-hidden">
      <div className="px-4 pb-0 flex flex-col h-full w-auto">
        <RootSms setReplyId={setReplyId} />
        <InputBox replyId={replyId} />
      </div>
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
      "Aeh halar po!! 😤😤 Porgiamo come esso manifesta niuna sua fa cosí quale di divina. Coloro delle alli noi o fuor. Noi sí che donne come sí noi niuno sono, da quali la non come, colui forza il tutte durare e a priegano prieghi sé. Ma sí cosí pregato né al, quella del ma novellare etterno il dell'occhio alle alli, noi e da procuratore novella si come e. Primo né che quale procuratore essilio. Forza esse dare cose i, maesta il da nel alla e la in intendo in, quegli né propria trapassare le come alla di dare, tanto non beato della porgiamo ora dovendo. Come noi e sia purita forse. Pregator maesta di grazia impetrata cosí. Ciascheduna sia e impetrata e di tal speranza. Da' come in noi transitorie convenevole come, lui ma che da nostro gli bene degli di. Di in ignoranza.",
    isTeacher: false,
    time: new Date(),
  },
];
export default ChatBox;
