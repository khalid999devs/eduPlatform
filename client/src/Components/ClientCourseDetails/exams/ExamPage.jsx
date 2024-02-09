import React, { useEffect, useState } from "react";
import { getAllExamClient } from "../../../axios/global";
import { Link } from "react-router-dom";

function ExamPage({ cid }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getAllExamClient(cid, setdata);
  }, []);
  // set finish time

  return (
    <div className="min-h-full flex items-center flex-col justify-center relative">
      <div>
        <h1 className="text-3xl font-bold text-center mt-5 mb-10">
          Exam Lists
        </h1>
        {data?.map((exam, eid) => {
          return (
            <div
              key={`eid${eid}`}
              className="bg-yellow-100 relative p-4 rounded-md my-10 hover:bg-yellow-200/80"
            >
              <p className="font-bold">{exam?.name}</p>
              <p className="font-semibold">
                {exam?.topic}{" "}
                <span className="uppercase text-sm">({exam?.category})</span>
              </p>
              <span className="absolute top-2 right-2 text-red-500 font-semibold">
                Mark: {exam?.totalMarks}
              </span>

              <p>Exam Starting time: {showTime(exam?.examStartTime)}</p>
              <p>Exam Ending time: {showTime(exam?.examEndTime)}</p>

              {new Date(exam?.examStartTime).getTime() <
              new Date().getTime() >
              0 ? (
                new Date(exam?.examStartTime).getTime() + 86400000 >
                new Date().getTime() ? (
                  <Link
                    to={
                      exam?.category == "quiz"
                        ? `exam/quiz/${exam?.id}`
                        : exam?.category == "written"
                        ? `exam/written/${exam?.id}`
                        : ""
                    }
                  >
                    <button
                      type="button"
                      className="bg-slate-950 text-yellow-300 hover:bg-slate-600 transition-colors rounded-full px-3 py-1 m-2"
                    >
                      Take Exam
                    </button>
                  </Link>
                ) : (
                  <Link to={`viewQuestion/${exam?.id}`}>
                    <button
                      type="button"
                      className="bg-slate-950 text-yellow-300 hover:bg-slate-600 transition-colors rounded-full px-3 py-1 m-2"
                    >
                      View Question
                    </button>
                  </Link>
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
  const date = new Date(time);
  return `${addZero(date.getDate())}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getFullYear()
  )} at ${printTime(date.getHours(), date.getMinutes())}`;
}
function addZero(e) {
  return e < 10 ? `0${e}` : e;
}
function printTime(hh, mm) {
  return `${addZero(checkHours(hh).time)}:${addZero(mm)}  ${
    checkHours(hh).format
  }`;
}
function checkHours(hour) {
  if (hour == 0) {
    return {
      time: 12,
      format: "AM",
    };
  }
  if (hour > 0 && hour <= 12) {
    return {
      time: hour,
      format: hour == 12 ? "PM" : "AM",
    };
  }
  if (hour > 12 && hour <= 23) {
    return {
      time: hour - 12,
      format: "PM",
    };
  }
}

export default ExamPage;
