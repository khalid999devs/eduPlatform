
import { MdClose } from "react-icons/md";
import { useReducer, useState } from "react";
import ChatBox from "../discussion/chat";
import AddCourse from "../addcourse/addCourse";
import Card from "./card";
import DefaultScreen from "./DefaultScreen";
import Stundet from "../student/student";
import AllCourse from "../courses/AllCourses";

const initState = localStorage.getItem("dashKey") || null; //local key to handle dashboard panel
const initTitle = localStorage.getItem("titleKey") || ""; //local key to handle dashboard panel

//root layout of admin panel
const AdminRoot = () => {
  const [rootTitle, settitle] = useState(initTitle); //for showing or hiding menubar
  const [state, dispatch] = useReducer(switchPanel, initState); //reducer for switching keys of left panel

  //reducer
  function switchPanel(state, action) {
    switch (action.type) {
      case action.payload:
        localStorage.setItem("dashKey", action.payload);
        localStorage.setItem("titleKey", action.title);
        settitle(action.title);
        return localStorage.getItem("dashKey");
      default:
        return state;
    }
  }

  return (
    <div className="bg-transparent p-5 rounded-lg flex justify-between items-start relative h-screen overflow-y-hidden bg-slate-100">

    </div>
  );
};

export default AdminRoot;
//extra components


const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5">
        {data.map((val, id) => {
          return (
            <Card
              key={id}
              color={val.color}
              title={val.title}
              taka={val.taka}
              per={val.per}
              perExtra={val.perExtra}
            />
          );
        })}
      </div>
    </>
  );
};

const data = [
  // card -1
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-purple-500 to-purple-200",
  },
  // card -2
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-orange-500 to-orange-200",
  },
  // card -3
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-red-500 to-red-200",
  },
  // card -4
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-sky-500 to-sky-200",
  },
];
