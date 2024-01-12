import { useState } from "react";
import { checkHours } from "./Exam";
import QuestionsPage from "./questions";

function Exams() {
  const [exam_details, setExDet] = useState({
    ex_name: "",
    exam_date: 0,
    end_date: 0,
  });

  return (
    <div className="">
      <form
        className="mx-auto ring-sky-500 ring rounded-lg my-4 p-5 flex flex-col gap-3 w-fit relative flex-wrap"
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        {/* set date */}
        <div className="flex flex-col md:justify-between md:items-center gap-4">
          <section className=" bg-slate-50 text-black items-center w-full p-3 rounded-md ring ring-sky-400 flex justify-between h-full gap-1">
            <label htmlFor={"ex_name"}>Exam Name: </label>
            <input
              className="bg-transparent border-0 outline-none "
              type="text"
              name={"ex_name"}
              id={"ex_name"}
              required
              value={exam_details.ex_name}
              onChange={(e) => {
                setExDet((pre) => ({ ...pre, ex_name: e.target.value }));
              }}
            />
          </section>
          <section className=" bg-slate-50 text-black items-center w-full p-3 rounded-md ring ring-sky-400 flex justify-between h-full gap-1">
            <label htmlFor={"exam_date"}>Exam Start Date: </label>
            <input
              className="bg-transparent border-0 outline-none "
              type="datetime-local"
              name={"exam_date"}
              id={"exam_date"}
              required
              pattern="dd-mm-yyyy"
              onChange={(e) => {
                const time = new Date(e.target.value);
                setExDet((pre) => ({
                  ...pre,
                  exam_date: time.getTime(),
                }));
              }}
            />
          </section>
          <section className=" bg-slate-50 text-black items-center w-full p-3 rounded-md ring ring-sky-400 flex justify-between h-full gap-1">
            <label htmlFor={"exam_date"}>Exam End Date: </label>
            <input
              className="bg-transparent border-0 outline-none "
              type="datetime-local"
              name={"exam_date"}
              id={"exam_date"}
              required
              onChange={(e) => {
                const time = new Date(e.target.value);
                console.log(time.getTime());
                setExDet((pre) => ({
                  ...pre,
                  end_date: time.getTime(),
                }));
              }}
            />
          </section>
        </div>

        <button
          className="disabled:bg-slate-500 disabled:cursor-not-allowed disabled:grayscale bg-slate-950 text-slate-50 rounded-lg px-4 py-2 mt-5 hover:bg-slate-800 transition-colors md:float-right md:mt-auto w-full md:w-fit"
          type="submit"
          disabled={
            !exam_details.end_date ||
            !exam_details.exam_date ||
            exam_details.ex_name.length == 0
          }
        >
          submit
        </button>
      </form>
      <br />
      <AllExamsData />
    </div>
  );
}

const AllExamsData = ({ c_id }) => {
  const curTime = new Date();
  const examdata = [
    {
      ex_name: "Exam 01",
      exam_date: 1702615649000,
      end_date: 1702615649000 + 6400000,
    },
    {
      ex_name: "Exam 02",
      exam_date: 1702615649000 * 1.0015,
      end_date: 1702615649000 * 1.0015 + 6400000,
    },
  ];

  return (
    <div className="p-10">
      <div
        className="px-4 py-2 bg-slate-500 text-slate-50 font-bold flex justify-between"
        key={c_id}
      >
        <p>Exam Name</p>
        <p>Start Time</p>
        <p>End Time</p>
      </div>
      {examdata.length == 0 ? (
        <p className="py-4 text-center">No exams found</p>
      ) : (
        <div>
          {examdata
            ?.sort((a, b) => {
              if (a?.exam_date > b?.exam_date) return -1;
              if (a?.exam_date < b?.exam_date) return 1;
              return 0;
            })
            ?.map((exam, id) => {
              const startDate = new Date(exam?.exam_date);
              const endDate = new Date(exam?.end_date);

              const [examcontrol, setExamsControl] = useState(false);
              function handleExams() {
                setExamsControl((pre) => !pre);
              }

              return (
                <div key={id}>
                  <div
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-950 flex justify-between cursor-pointer"
                    onClick={handleExams}
                  >
                    <p>{exam?.ex_name}</p>

                    <p className="text-center">
                      <span>
                        {curTime.getDate() == startDate.getDate()
                          ? "Today"
                          : `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()} `}
                      </span>
                      {" on "}
                      <span>
                        {`${
                          checkHours(startDate?.getHours())?.time
                        }:${startDate?.getMinutes()}:${startDate?.getSeconds()} ${
                          checkHours(startDate?.getHours())?.format
                        }`}
                      </span>
                    </p>

                    <p className="text-center">
                      <span>
                        {curTime.getDate() == endDate.getDate()
                          ? "Today"
                          : `${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()} `}
                      </span>
                      {" on "}
                      <span>
                        {`${
                          checkHours(endDate?.getHours())?.time
                        }:${endDate?.getMinutes()}:${endDate?.getSeconds()} ${
                          checkHours(endDate?.getHours())?.format
                        }`}
                      </span>
                    </p>
                  </div>
                  {examcontrol && <QuestionsPage examData={examdata} />}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Exams;
