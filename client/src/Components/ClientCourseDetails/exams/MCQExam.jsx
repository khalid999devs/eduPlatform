import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import {
  addStudentAns,
  getQuesClient,
  getSingleExamClient,
} from "../../../axios/global";

const MCQExam = () => {
  const { cid, examid } = useParams();
  const [exDetails, setExdetails] = useState({});
  const [questions, setques] = useState([]);
  const [stdAns, setAns] = useState([]);
  const [submition, setSubmition] = useState(false);
  const [message, setMessage] = useState("");
  // fetch questions
  useEffect(() => {
    getQuesClient(examid, "question", setques);
    getSingleExamClient(cid, examid, setExdetails);
  }, []);

  const startTime = new Date(Number(exDetails?.examStartTime));
  const endTime = new Date(Number(exDetails?.examEndTime));

  const [time, settime] = useState(new Date());
  const [localDuration, setlocaldur] = useState(null);

  useEffect(() => {
    const loop = setInterval(() => {
      let newTime = new Date();
      settime(newTime);
    }, 1000);
    return () => clearInterval(loop);
  }, []);
  useEffect(() => {
    if (endTime.getTime() - time.getTime() > 0)
      setlocaldur(endTime.getTime() - time.getTime());
  }, [time]);
  useEffect(() => {
    if (questions.length > 0) {
      setAns(
        questions.map((e) => {
          return { questionId: e?.id, optionsId: [] };
        })
      );
    }
    // prevent false reload while in exam
    function blockReload(event) {
      if (questions?.length > 0) {
        event?.preventDefault();
      }
    }
    window.addEventListener("beforeunload", blockReload);
    return () => {
      window.removeEventListener("beforeunload", blockReload);
    };
  }, [questions]);

  useEffect(() => {
    if (localDuration !== null)
      if (localDuration <= 0) {
        setSubmition(true);
        handleSubmit();
      }
  }, [localDuration]);
  // console.log(questions);
  const OptionsMemo = ({ id, quesId, studentAns, quesOptions }) => {
    return (
      <ul className="my-1">
        {quesOptions?.map((option, index) => {
          return (
            <li
              key={`q${id}?ans${index}`}
              className={`flex items-center gap-2 space-y-1 cursor-pointer hover:bg-secondary-main rounded-md transition-colors p-1 touch-pan-left  `}
              onClick={() => {
                if (
                  studentAns?.optionsId?.findIndex(
                    (ele) => ele === option?.id
                  ) === -1
                ) {
                  let curID = stdAns?.findIndex(
                    (oData) => oData?.questionId === quesId
                  );

                  let curData = stdAns[curID];
                  curData = {
                    questionId: quesId,
                    optionsId: [...stdAns[curID]?.optionsId, option?.id],
                  };
                  let arr = stdAns;
                  arr[curID] = curData;
                  setAns(arr);
                }
              }}
            >
              <span
                className={`p-px text-black ring-black w-5 h-5 flex justify-center items-center ring-1 rounded-full ${
                  studentAns?.optionsId?.includes(option?.id)
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
    );
  };

  async function handleSubmit(e) {
    e?.preventDefault();

    try {
      addStudentAns(
        {
          courseId: cid,
          examId: examid,
          submittedTime: Number(Date.now()),
          answers: stdAns,
        },
        examid,
        setMessage
      ).then(() => {
        // window.location.assign('../../');
        alert("Exam finished", message);
      });
    } catch (error) {
      setSubmition(false);
      console.log(error);
    }
  }

  return (
    <div className="p-4 rounded w-full my-32 mx-auto">
      {/* submiting shadow page */}
      {submition && (
        <div className="bg-black/40 text-white font-bold text-3xl text-center fixed top-0 left-0 right-0 bottom-0 justify-center items-center">
          <p className="relative top-1/2 -translate-y-1/2">
            Exam Time over. Submiting your answers...
          </p>
        </div>
      )}
      {/*it will show remainder timer  */}
      <Timer durTime={localDuration} classes={"fixed top-20 right-5"} />{" "}
      <ExamInfo
        data={exDetails}
        startTime={startTime?.toLocaleTimeString()}
        endTime={endTime?.toLocaleTimeString()}
        examDur={endTime?.getTime() - startTime?.getTime()}
      />
      <h1 className="text-xl text-center font-bold my-4">MCQ Exam</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((ques, id) => (
          <div
            key={id}
            className="bg-white w-5/6 mx-auto px-5 py-3 my-5 rounded-lg"
          >
            <h2 className="text-lg mt-5 font-semibold pointer-events-none select-none">
              {id + 1}. {ques?.title}
            </h2>

            <OptionsMemo
              id={id}
              quesId={ques?.id}
              studentAns={stdAns[id]}
              quesOptions={ques?.quesOptions}
            />
          </div>
        ))}
        {message && (
          <p className="p-3 bg-orange-200/30 border border-orange-500 text-orange-800 rounded-md w-fit">
            {message}
          </p>
        )}
        {localDuration > 0 ? (
          <button
            className="bg-onPrimary-main ring ring-slate-500 rounded-sm text-primary-main px-4 py-2 text-base mt-5"
            type="submit"
            hidden={message?.trim() === "Thank you. We have got your answer"}
          >
            Submit
          </button>
        ) : null}
      </form>
    </div>
  );
};
const ExamInfo = ({ data, startTime, endTime, examDur }) => {
  return (
    <div className="text-left px-5 py-2 bg-white">
      <h2>Exam name: {data?.name}</h2>
      <h2>Exam topic: {data?.topic}</h2>
      <h2 className="font-semibold">Total Mark: {data?.totalMarks}</h2>
      <h2>Start Time: {startTime}</h2>
      <h2>Finish Time: {endTime}</h2>

      <h2 className="font-semibold">
        Total Duration: {duration(examDur).hh?.toString().padStart(2, 0)}:
        {duration(examDur).mm?.toString().padStart(2, 0)}:
        {duration(examDur).ss?.toString().padStart(2, 0)}
      </h2>
      <p className="rounded-md p-3 bg-red-500 text-white">
        NB:- If you have already taken the exam then just leave the page. After
        finishing the exam, you can see the answer paper
      </p>
    </div>
  );
};

function duration(localDuration) {
  let x = Math.abs(localDuration > 0 ? localDuration : 0);

  x /= 1000;
  x = parseInt(x);

  return {
    hh: Math.floor(x / 3600),
    mm: Math.floor((x % 3600) / 60),
    ss: x % 60,
  };
}
export default MCQExam;
