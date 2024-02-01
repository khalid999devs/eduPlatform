import React, { useReducer, useState } from "react";
import Timer from "./Timer";

const questions = [
  {
    id: 0,
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Barline", "Paris"],
    correctAnswer: ["Paris", "Madrid"],
  },
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: ["Jupiter"],
  },
];
const initialState = questions.map((val) => {
  return { answer: [] };
});

function ExamPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  function reducer(state, action) {
    switch (action.type) {
      case "answer":
        return state?.map((ans, id) => {
          if (id === action.qId)
            if (!ans.answer.includes(action.ans))
              state[action.qId].answer.push(action.ans);
          return { ...ans };
        });
      default:
        throw new Error("404 error!");
    }
  }

  // set finish time
  const lastTime = new Date("2023-12-26T20:00:00");
  const [differ, setDif] = useState(null);
  useState(() => {
    let loop = setInterval(() => {
      const curTime = new Date();
      setDif((pre) => lastTime - curTime);
    }, 1000);
    return () => clearInterval(loop);
  }, []);
  return (
    <div className="bg-gray-100 min-h-full flex items-center flex-col justify-center relative">
      {/*it will show remainder timer  */}
      <Timer preTime={lastTime.getTime()} />{" "}
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">MCQ Exam</h1>
        {questions.map((ques, id) => (
          <div key={id}>
            <h2 className="text-lg mt-5 font-semibold">
              {id + 1}. {ques.question}
            </h2>

            <ul className="my-1">
              {ques.options.map((option, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center gap-2 space-y-1 cursor-pointer hover:bg-secondary-main rounded-md transition-colors p-1"
                    onClick={() => {
                      if (differ > 0)
                        dispatch({
                          type: "answer",
                          qId: id,
                          ans: option,
                        });
                    }}
                    aria-disabled={differ < 0}
                  >
                    <span
                      className={`p-px text-black ring-black w-5 h-5 flex justify-center items-center ring-1 rounded-full ${
                        state[ques.id]?.answer !== option
                          ? "bg-white"
                          : "bg-secondary-main"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <label
                      className="block pointer-events-none"
                      htmlFor={option + index}
                    >
                      {option}
                    </label>
                    <input
                      type="radio"
                      hidden
                      name="options"
                      id={option + index}
                      value={option}
                      checked={state[ques.id]?.answer === option}
                      className="mr-2"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {differ > 0 ? (
          <button className="bg-onPrimary-main ring ring-slate-500 rounded-sm text-primary-main px-4 py-2 text-base mt-5">
            Submit
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ExamPage;
