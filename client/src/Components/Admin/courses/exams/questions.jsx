import { useEffect, useState } from "react";
import { checkHours } from "./Exam";
import TimeTable from "./Time";
import { MdDeleteOutline } from "react-icons/md";

function QuestionsPage({ examData }) {
  const quesData = [{}];
  const [opt, setopt] = useState("");
  const [optArr, setoptarr] = useState([]);
  const [qData, setQuesData] = useState({
    qtitle: "",
    options: [],
    ans: "",
  });

  useEffect(() => {
    const loop = setTimeout(() => {
      setopt("");
    }, 3000);
    return () => clearTimeout(loop);
  }, [opt]);
  useEffect(() => {
    setQuesData((pre) => ({ ...pre, options: optArr }));
  }, [optArr]);

  const [curTime, settime] = useState(new Date());

  useEffect(() => {
    const loop = setInterval(() => {
      settime((prevTime) => new Date());
      return () => {
        clearInterval(loop);
      };
    }, 1000);
  }, []);

  return (
    <div className="container w-auto mx-auto my-5 p-2 rounded-md bg-white text-black">
      <div className="head">
        <p className="title">{examData?.ex_name}</p>
        <TimeTable
          time={new Date(examData?.exam_date)}
          endTime={new Date(examData?.end_date)}
          checkHours={checkHours}
          showStatus={false}
        />
      </div>
      <div className="adddata">
        <form
          className="grid grid-cols-1 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <section className="qtitle flex items-center justify-start ring-2 ring-black rounded-lg p-3 my-2">
            {/* question title */}
            <label htmlFor="qtitle">Question title: </label>
            <input
              className="h-full p-2 outline-none flex-1 border-none focus-within:border-none"
              type="text"
              name="qtitle"
              id="qtitle"
              required
              onChange={(e) => {
                setQuesData((pre) => ({ ...pre, qtitle: e.target.value }));
              }}
            />
          </section>
          <section className="ans flex items-center justify-start ring-2 ring-black rounded-lg p-3 my-2">
            <label htmlFor="ans">Answer: </label>
            <input
              className="h-full p-2 outline-none flex-1 border-none focus-within:border-none"
              type="text"
              name="ans"
              id="ans"
              required
              onChange={(e) => {
                setQuesData((pre) => ({ ...pre, ans: e.target.value }));
              }}
            />
          </section>
          <section className="options flex flex-col gap-2 ring-2 ring-black rounded-lg p-3 my-2">
            <div className="flex items-center justify-between ">
              <label htmlFor="">Option: </label>
              <input
                className="h-full p-2 outline-none border-none focus-within:border-none flex-1 mx-3"
                type="text"
                name=""
                id=""
                value={opt}
                onChange={(e) => {
                  setopt(e.target.value);
                }}
              />
              <button
                className="add bg-black text-white px-3 py-2 rounded-md"
                type="noSubmit"
                onClick={() => {
                  setoptarr((pre) => [...pre, opt]);
                }}
              >
                Add
              </button>
            </div>
            {optArr.length == 0
              ? "no options"
              : optArr.map((option, id) => {
                  return (
                    <span
                      key={id}
                      className="mx-2 bg-red-100 p-2 rounded-full"
                      onClick={() => {
                        setoptarr((pre) => []);
                      }}
                    >
                      {option}
                    </span>
                  );
                })}
          </section>

          <button
            className="add bg-black text-white px-3 py-2 rounded-md disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={
              qData.ans.length == 0 ||
              qData.options.length == 0 ||
              qData.qtitle.length == 0
            }
          >
            submit
          </button>
        </form>
      </div>

      <div className="allQues my-5 mx-auto h-fit p-2">
        <p className="my-2">Total questions: {quesData?.length}</p>
        <div className="max-h-80 mb-10 overflow-y-scroll p-3 grid lg:grid-cols-2 gap-5">
          {quesData?.map((ques, id) => {
            return (
              <section
                key={id}
                className=" ring ring-sky-500 ring-offset-2 p-3 my-4 rounded-md transition-all   bg-slate-900 text-white hover:bg-slate-800/90"
              >
                <p>
                  {id + 1}. {ques?.qtitle}{" "}
                </p>
                <ol
                  className="grid grid-cols-2 justify-between p-4"
                  start={"a"}
                >
                  {ques?.options?.map((opt, idopt) => {
                    return (
                      <li
                        className={`border border-black rounded-md p-2 m-2 ${
                          ques?.ans?.toLowerCase() == opt?.toLowerCase()
                            ? "bg-green-500 bg-opacity-50 "
                            : ""
                        }`}
                        key={idopt}
                      >
                        {String.fromCharCode(97 + idopt)}
                        {")"} {opt}
                      </li>
                    );
                  })}
                </ol>
                <button
                  type="button"
                  className="w-fit h-fit flex items-center justify-center bg-white rounded-full p-2 text-xl hover:bg-red-500 hover:text-white text-red-500 transition-colors duration-150 ease-in"
                  onClick={(e) => {
                    e.preventDefault();
                    let endTime = new Date(examData?.end_date);
                    if (curTime?.getTime() < endTime?.getTime()) {
                      deleteQuestion(ques?.id, params, id + 1);
                    } else {
                      alert("Exam has finished. So no need to delete it.");
                    }
                  }}
                >
                  <MdDeleteOutline />
                </button>
              </section>
            );
          })}
          <div className="flex justify-center items-center gap-2 w-3/5 mx-auto text-gray-500">
            <hr className="border-gray-500 flex-1" />
            x
            <hr className="border-gray-500 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuestionsPage;
