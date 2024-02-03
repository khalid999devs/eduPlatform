import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import { getQuesClient, getSingleExamClient } from "../../../axios/global";

const MCQExam = () => {
  const { cid, examid } = useParams();
  const [differ, setDif] = useState(0);
  const [exDetails, setExdetails] = useState({});
  const [questions, setques] = useState([]);
  const [stdAns, setAns] = useState([]);
  // fetch questions
  const startTime = new Date(exDetails?.examStartTime);
  const endTime = new Date(exDetails?.examEndTime);
  const curTime = new Date();

  useEffect(() => {
    getQuesClient(examid, "question", setques);
    getSingleExamClient(cid, examid, setExdetails);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setAns(
        questions.map((e) => {
          return { questionId: e?.id, optionId: [] };
        })
      );
    }
  }, [questions?.length > 0]);
  //timer
  useEffect(() => {
    if (curTime >= startTime && curTime <= endTime) setDif(endTime - curTime);
    setInterval(() => {
      setDif((pre) => pre - 1);
    }, 1000);
  }, [endTime,startTime,curTime]);
  return (
    <div className="p-4 rounded w-full my-32 mx-auto">
      {/*it will show remainder timer  */}
      <Timer differ={differ} />{" "}
      <ExamInfo data={exDetails} startTime={startTime} endTime={endTime} />
      <h1 className="text-xl text-center font-bold my-4">MCQ Exam</h1>
      {questions.map((ques, id) => (
        <div
          key={id}
          className="bg-white w-5/6 mx-auto px-5 py-3 my-5 rounded-lg"
        >
          <h2 className="text-lg mt-5 font-semibold pointer-events-none select-none">
            {id + 1}. {ques?.title}
          </h2>

          <ul className="my-1">
            {ques?.quesOptions.map((option, index) => {
              let fID = stdAns.findIndex((ele) => ele.questionId === ques?.id);
              let oID = stdAns[fID]?.optionId?.findIndex(
                (opt) => option?.id === opt
              );
              return (
                <li
                  key={`q${id}?ans${index}`}
                  className={`flex items-center gap-2 space-y-1 cursor-pointer hover:bg-secondary-main rounded-md transition-colors p-1 touch-pan-left ${
                    differ < 0 ? "pointer-events-none" : ""
                  }`}
                  onClick={() => {
                    if (
                      fID >= 0 &&
                      differ >= 0 &&
                      stdAns[fID]?.optionId?.findIndex(
                        (ele) => ele === option?.id
                      ) === -1
                    )
                      stdAns[fID]?.optionId?.push(option?.id);
                    console.log(stdAns[fID]?.optionId?.at(oID) === option?.id);
                  }}
                >
                  <span
                    className={`p-px text-black ring-black w-5 h-5 flex justify-center items-center ring-1 rounded-full ${
                      stdAns[fID]?.optionId?.at(oID) === option?.id
                        ? "bg-secondary-main"
                        : "bg-primary-main"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <label
                    className="block pointer-events-none"
                    htmlFor={option + index}
                  >
                    {option?.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {differ >= 0 ? (
        <button className="bg-onPrimary-main ring ring-slate-500 rounded-sm text-primary-main px-4 py-2 text-base mt-5">
          Submit
        </button>
      ) : null}
    </div>
  );
};
const ExamInfo = ({ data, startTime, endTime }) => {
  let examDur = endTime?.getTime() - startTime?.getTime();
  return (
    <div className="text-left px-5 py-2 bg-white">
      <h2>Exam name: {data?.name}</h2>
      <h2>Exam topic: {data?.topic}</h2>
      <h2>Total Mark: {data?.totalMarks}</h2>
      <h2>
        Total Duration: {duration(examDur).hh}:{duration(examDur).mm}:
        {duration(examDur).ss}
      </h2>
    </div>
  );
};
function duration(differ) {
  let x = Math.abs(differ >= 0 ? differ : 0);

  x /= 1000;
  x = parseInt(x);

  return {
    hh: Math.floor(x / 3600),
    mm: Math.floor((x % 3600) / 60),
    ss: x % 60,
  };
}
export default MCQExam;
