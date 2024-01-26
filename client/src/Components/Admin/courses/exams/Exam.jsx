import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FormInput } from "../input";
import PrimaryButton from "../../../Buttons/PrimaryButton";
import { FiEdit } from "react-icons/fi";
import {
  addExam,
  addSingleQues,
  deleteExam,
  deleteQuestion,
  getExamAdmin,
  getSingleExamAdmin,
} from "../../../../axios/global";
import { reqImgWrapper } from "../../../../assets/requests";
const options = ["quiz", "written"];
const ansTypes = ["options", "file"];

function Exam() {
  const { id } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    topic: "",
    category: "",
    courseId: id,
    totalMarks: 0,
    examStartTime: null,
    examEndTime: null,
    examCreationTime: new Date().getTime(),
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setExamData((pre) => ({ ...pre, category: option }));
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setExamData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value.toString(),
    }));
  };
  useEffect(() => {
    setExamData((pre) => ({ ...pre, courseId: id }));
  }, [id]);

  return (
    <div className="px-3 py-10 container mx-auto ">
      <form
        className="grid grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          addExam(examData);
        }}
      >
        <FormInput
          title={"Name"}
          id={"name"}
          name={"name"}
          required
          type={"text"}
          value={examData.name}
          placeHolder={"Exam name"}
          handleChange={handleChange}
        />
        <FormInput
          title={"Topic"}
          id={"topic"}
          required
          name={"topic"}
          type={"text"}
          value={examData.topic}
          placeHolder={"Topic name"}
          handleChange={handleChange}
        />
        <div className="w-full px-3">
          <label
            className="flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
            htmlFor={"cat"}
          >
            Exam Category
          </label>

          <SelectDropdown
            options={options}
            isOpen={isOpen}
            selectedOption={selectedOption}
            setIsOpen={setIsOpen}
            handleSelectOption={handleSelectOption}
          />
        </div>
        <FormInput
          title={"Total Marks"}
          id={"tmark"}
          required
          value={examData.totalMarks}
          name={"totalMarks"}
          type={"number"}
          handleChange={handleChange}
          placeHolder={"Enter Total Mark"}
          min={0}
        />
        <FormInput
          title={"Exam Start Time"}
          id={"est"}
          required
          value={examData.examStartTime}
          name={"examStartTime"}
          handleChange={handleChange}
          type={"datetime-local"}
        />
        <FormInput
          title={"Exam End Time"}
          id={"eet"}
          value={examData.examEndTime}
          required
          name={"examEndTime"}
          handleChange={handleChange}
          type={"datetime-local"}
        />
        <PrimaryButton
          type={"submit"}
          classes={"bg-blue-400 w-full min-w-fit mx-auto"}
          // disabled
          textClasses={"text-blue-800 font-semibold"}
          text={"Create"}
          icon={<FiEdit color="#0a0aff" />}
        />
      </form>

      <hr />
      <ExamLists />
    </div>
  );
}

const SelectDropdown = ({
  options,
  isOpen,
  setIsOpen,
  selectedOption,
  handleSelectOption,
}) => {
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full inline-block mb-4">
      <div className="flex w-full items-center ">
        <button
          onClick={handleToggleDropdown}
          type="button"
          className="bg-white border border-gray-300 px-4 py-2 rounded-md flex items-center space-x-2 focus:outline-none w-full justify-between"
        >
          <span className="uppercase">
            {selectedOption || "Select an option"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Dropdown options */}
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`block rounded-md px-4 py-2 my-px text-gray-800 transition-colors hover:bg-blue-600 hover:text-white w-full text-left ${
                  selectedOption == option ? "bg-blue-500 text-white" : ""
                }`}
                type="button"
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AddQuestion = ({ eid }) => {
  const [data, setData] = useState({ questions: [] });
  const [showQues, toggleQues] = useState(false);
  const [ques, setQues] = useState("");
  const [ansType, setAnsType] = useState(ansTypes[0]);
  const [opt, setOpt] = useState([]);
  const [ans, setAns] = useState([]);
  const [mark, setMark] = useState("");
  const [files, setFiles] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const handleSelectOption = (option) => {
    setAnsType(option);
    setIsOpen(false);
  };
  useEffect(() => {
    getSingleExamAdmin(setData, eid);
  }, [eid]);
  return (
    <div>
      <h3 className="bg-sky-400 text-black px-2 py-1 my-2 w-3/5 mx-auto text-center shadow-xl shadow-sky-500/50">
        Add question
      </h3>
      <form
        className="grid-cols-3 grid justify-center gap-1 my-3"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData();
          const fData = {
            title: ques,
            quesOptions: JSON.stringify(
              new Array(
                opt.map((val, vid) => ({
                  id: vid + 1,
                  title: val,
                }))
              )[0]
            ),
            examId: eid,
            mark: mark,
            ansType: ansType,
            answers: JSON.stringify(ans),
          };

          Object.keys(fData).forEach((key) => {
            form.append(`${key}`, fData[key]);
          });
          for (let i = 0; i < files.length; i++) {
            form.append("questions", files[i]);
          }
          addSingleQues(form);
        }}
      >
        {/* question title */}
        <section className="grid border p-2 rounded-md shadow space-y-2">
          <label htmlFor="ques">Question: </label>
          <input
            className="p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none"
            id="ques"
            type="text"
            name="question"
            placeholder="Title"
            required
            value={ques}
            onChange={(e) => setQues(e.target.value)}
          />
          {/* <p className="text-xs flex flex-wrap break-words m-1">{ques}</p> */}
        </section>
        {/* question option */}
        <section className="grid border p-2 rounded-md shadow space-y-2">
          <label htmlFor="opt">Options: </label>
          <input
            className="p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none"
            type="text"
            name="options"
            id="opt"
            required={ansType === "options"}
            placeholder="Options"
            onChange={(e) => setOpt(e.target.value.split(",", 4))}
          />
          <p className="text-xs flex flex-wrap break-words">
            {opt.map((e, i) => {
              return (
                <span
                  key={`${e}${i}`}
                  className="m-1 p-1 rounded-sm bg-slate-200 text-black"
                >
                  {e}
                </span>
              );
            })}
          </p>
        </section>
        {/* question answer */}
        <section className="grid border p-2 rounded-md shadow space-y-2">
          <label htmlFor="ans">
            Answer:{" "}
            <span className="text-red-500 text-xs">
              *make sure answer includes in options
            </span>{" "}
          </label>
          <input
            className="p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none"
            type="text"
            name="answer"
            id="ans"
            placeholder="Answer"
            required={ansType === "options"}
            onChange={(e) => setAns(e.target.value.split(",", 4))}
          />
          <p className="text-xs flex flex-wrap break-words">
            {ans.map((e, i) => {
              return (
                <span
                  key={`${e}${i}${i}`}
                  className="m-1 p-1 rounded-sm bg-slate-200 text-black"
                >
                  {e}
                </span>
              );
            })}
          </p>
        </section>
        {/* question mark */}
        <section className="grid border p-2 rounded-md shadow space-y-2">
          <label htmlFor="mark">Mark: </label>
          <input
            className="p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none"
            id="mark"
            type="number"
            name="mark"
            placeholder="Mark"
            required
            min={0}
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          />
          {/* <p className="text-xs flex flex-wrap break-words m-1">{mark}</p> */}
        </section>
        {/* question type */}
        <section className="grid border p-2 rounded-md shadow space-y-2">
          <label htmlFor="ansType">Answer Type: </label>

          <SelectDropdown
            options={ansTypes}
            isOpen={isOpen}
            selectedOption={ansType}
            setIsOpen={setIsOpen}
            handleSelectOption={handleSelectOption}
          />
        </section>
        {/* question photo */}
        <section
          className={`grid border p-2 rounded-md shadow space-y-2 ${
            ansType === ansTypes[ansTypes.length - 1] ? "" : "hidden"
          }`}
        >
          <label htmlFor="files">Images: </label>
          <input
            className="p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none"
            id="files"
            type="file"
            multiple={true}
            name="imageFiles"
            required={ansType === "file"}
            placeholder="Question image"
            onChange={(e) => setFiles([...e.target.files])}
          />
          {/* <p className="text-xs flex flex-wrap break-words m-1">{files}</p> */}
        </section>

        <button
          className={
            "col-span-3 bg-purple-500 px-2 py-1 rounded-sm text-white hover:bg-purple-600"
          }
          type="submit"
        >
          Submit
        </button>
      </form>
      <button
        className="bg-rose-500 px-2 py-1 rounded-sm text-white hover:bg-rose-500/70"
        onClick={(e) => toggleQues((pre) => !pre)}
      >
        {showQues ? "Hide" : "Show"} Questions
      </button>
      {/* show all question in current exam */}

      {showQues ? (
        <div className={`grid grid-cols-2 gap-2 justify-center `}>
          {data.questions.length != 0
            ? data.questions.map((quest, id) => {
                return (
                  <section
                    key={id + quest.title}
                    className=" ring-1 rounded-sm p-2 m-1 groupques relative"
                  >
                    <span className="float-right m-1 text-red-500 font-semibold">
                      {quest?.mark}
                    </span>
                    <p className="text-red-500 mb-1">
                      <span>
                        {id + 1}. {quest.title}
                      </span>
                      <button
                        className="hover:bg-purple-400 rounded-full p-1 text-xl opacity-0 group-[ques]:group-hover:opacity-100 transition"
                        type="button"
                        onClick={(e) => {
                          let x = "";
                          x = prompt(
                            `Delete ques ? [${quest.title}, qid:${quest.id}] (yes/no)`
                          );
                          if (x?.toLocaleLowerCase() == "yes") {
                            deleteQuestion(quest.id, eid);
                          } else alert("Failed");
                        }}
                      >
                        <MdDelete className="text-xl text-red-600 hover:text-black rounded-full" />
                      </button>
                    </p>
                    {/* images */}
                    <ol className="grid grid-cols-2 gap-2 items-center">
                      {quest?.images?.map((img, iid) => {
                        return (
                          <li
                            className="flex justify-center items-center"
                            key={`${img?.originamName} + ${iid}`}
                          >
                            <img
                              className="aspect-square border border-black p-1 rounded-md"
                              width={150}
                              height={150}
                              src={reqImgWrapper(img?.url)}
                              alt={img?.originamName}
                            />
                          </li>
                        );
                      })}
                    </ol>
                    {/* questions */}
                    <ol className="grid grid-cols-2 gap-2 items-center">
                      {quest?.quesOptions?.map((qOpt, qid) => {
                        return (
                          <li
                            className="border p-1 border-black text-black"
                            key={qOpt?.title}
                          >
                            {String.fromCharCode(97 + qid)}. {qOpt?.title}
                          </li>
                        );
                      })}
                    </ol>
                    {/* answers */}
                    <ol className="flex flex-wrap gap-2 items-center my-3">
                      {quest?.quesAns?.length != 0 && <span>Answers: </span>}{" "}
                      {quest?.quesAns?.map((qans, aid) => {
                        return (
                          <li
                            className="border p-1 border-black text-black"
                            key={`${qans}+${aid}`}
                          >
                            {qans}
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};

const ExamLists = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    getExamAdmin("all", setData, id);
  }, [id]);

  return (
    <div>
      <h2 className="text-center font-semibold underline text-xl my-5">
        Exam List{" "}
      </h2>
      {/* here goes exam list */}
      {data.length != 0 ? (
        <div className="grid grid-cols-1 w-full gap-5 justify-evenly">
          {data.map((ele, id) => {
            const exst = new Date(ele?.examStartTime);
            const exet = new Date(ele?.examEndTime);
            return (
              <div
                className="mx-5 text-base group hover:ring hover:ring-violet-500 transition p-2 rounded focus:ring focus:ring-violet-500 ring ring-transparent"
                key={`${ele.id}${ele.name}`}
              >
                <div className="text-white w-auto max-w-xs h-fit flex items-center space-x-2">
                  <p className="w-full rounded-full text-left px-5 bg-purple-500 transition-colors group-hover:bg-purple-700">
                    {" "}
                    {id + 1}. {ele?.name}
                  </p>
                  <button
                    className="hover:bg-purple-400 rounded-full p-1 text-xl opacity-0 group-hover:opacity-100 transition "
                    type="button"
                    onClick={(e) => {
                      let x = "";
                      x = prompt(
                        `Delete exam ? [${ele.name}, eid:${ele.id}] (yes/no)`
                      );
                      if (x.toLocaleLowerCase() == "yes") {
                        deleteExam(ele?.id);
                      } else alert("Failed");
                    }}
                  >
                    <MdDelete className="text-xl text-red-600 hover:text-black rounded-full" />
                  </button>
                </div>
                <ul>
                  <li className="mx-3 text-blue-900 font-bold">
                    Exam Topic: {ele?.topic}
                  </li>
                  <li className="mx-3 text-yellow-600">
                    Exam Type: {ele?.category}
                  </li>
                  <li className="mx-3 text-green-600">
                    Exam Start:{" "}
                    {`DATE: ${exst.getDate()}/${
                      exst.getMonth() + 1
                    }/${exst.getFullYear()}, TIME: ${printTime(
                      exst.getHours(),
                      exst.getMinutes(),
                      exst.getSeconds()
                    )}`}
                  </li>
                  <li className="mx-3 text-rose-500">
                    Exam End:{" "}
                    {`DATE: ${exet.getDate()}/${
                      exet.getMonth() + 1
                    }/${exet.getFullYear()}, TIME: ${printTime(
                      exet.getHours(),
                      exet.getMinutes(),
                      exet.getSeconds()
                    )}`}
                  </li>
                  <li className="mx-3 text-blue-600">
                    Exam Duration: {duration(exet.getTime(), exst.getTime())}
                  </li>
                </ul>
                <AddQuestion eid={ele.id} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="capitalize text-rose-500 text-center text-xl font-semibold">
          No exams found
        </p>
      )}
    </div>
  );
};
function addZero(e) {
  return e < 10 ? `0${e}` : e;
}
function printTime(hh, mm, ss) {
  return `${addZero(checkHours(hh).time)}:${addZero(mm)}:${addZero(ss)} ${
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
function duration(startTime, endTime) {
  let x = Math.abs(startTime - endTime);
  x /= 1000;
  return `${addZero(Math.floor(x / 3600))}:${addZero(
    Math.floor((x % 3600) / 60)
  )}:${addZero(x % 60)}`;
}
export default Exam;
