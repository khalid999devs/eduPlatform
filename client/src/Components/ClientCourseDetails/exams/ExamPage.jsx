import React, { useEffect, useState } from "react";
import { getAllExamClient } from "../../../axios/global";
import { Link, useParams } from "react-router-dom";
import PrimaryButton from "../../Buttons/PrimaryButton";

function sortByTime(a, b) {
  let x = a?.examStartTime;
  let y = b?.examStartTime;
  return x > y;
}

function ExamPage() {
  const [data, setdata] = useState([]);
  const { cid } = useParams();

  useEffect(() => {
    getAllExamClient(cid, setdata);
  }, []);

  return (
    <div className="min-h-full flex items-center flex-col justify-center relative">
      <div>
        <h1 className="text-3xl font-bold text-center mt-5 mb-10">
          Exam Lists
        </h1>
        {data
          ?.sort((a, b) => {
            let x = Number(a?.examStartTime);
            let y = Number(b?.examStartTime);
            if (x < y) return 1;
            else if (x > y) return -1;
            else return 0;
          })
          ?.map((exam, eid) => {
            let startTime = new Date(Number(exam?.examStartTime));
            let endTime = new Date(Number(exam?.examEndTime));
            let curTime = new Date();
            return (
              <div
                key={`eid${eid}`}
                className="bg-yellow-100 relative p-4 rounded-md my-10 hover:bg-yellow-200/80 transition-colors"
              >
                <p className="font-bold">{exam?.name}</p>
                <p className="font-semibold">
                  {exam?.topic}{" "}
                  <span className="uppercase text-sm">({exam?.category})</span>
                </p>
                <span className="absolute top-2 right-2 text-red-500 font-semibold">
                  Mark: {exam?.totalMarks}
                </span>

                <p>Exam Starting time: {showTime(startTime)}</p>
                <p>Exam Ending time: {showTime(endTime)}</p>

                {startTime < curTime.getTime() ? (
                  endTime > curTime.getTime() ? (
                    <Link
                      to={
                        exam?.category === "quiz"
                          ? `quiz/${exam?.id}`
                          : exam?.category === "written"
                          ? `written/${exam?.id}`
                          : `quiz_written/${exam?.id}`
                      }
                    >
                      <button
                        type="button"
                        className="bg-slate-950 text-yellow-300 hover:bg-slate-600 transition-colors rounded-full px-3 py-1 m-2"
                      >
                        Take Exam
                      </button>
                    </Link>
                  ) : exam?.category === "quiz" ? (
                    <Link to={`viewQuestion/${exam?.id}`}>
                      <button
                        type="button"
                        className="bg-slate-950 text-yellow-300 hover:bg-slate-600 transition-colors rounded-full px-3 py-1 m-2"
                      >
                        View Question
                      </button>
                    </Link>
                  ) : (
                    <PrimaryButton
                      disabled={true}
                      classes={"bg-black text-yellow-400 opacity-70"}
                      text={"Pending"}
                    />
                  )
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}

function showTime(time) {
  // const date = new Date(time);
  return `${time?.toLocaleDateString()} at ${time?.toLocaleTimeString()}`;
}
function addZero(e) {
  return e < 10 ? `0${e}` : e;
}
function printTime(hh, mm) {
  return `${addZero(checkHours(hh)?.time)}:${addZero(mm)}  ${
    checkHours(hh)?.format
  }`;
}
function checkHours(hour) {
  if (hour == 0) {
    return {
      time: 12,
      format: "AM",
    };
  } else if (hour > 0 && hour <= 12) {
    return {
      time: hour,
      format: hour == 12 ? "PM" : "AM",
    };
  } else if (hour > 12 && hour <= 23) {
    return {
      time: hour - 12,
      format: "PM",
    };
  } else
    return {
      time: 0,
      format: "--",
    };
}

export default ExamPage;
