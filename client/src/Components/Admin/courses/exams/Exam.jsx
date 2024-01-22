import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormInput } from "../input";
import PrimaryButton from "../../../Buttons/PrimaryButton";
import { FiEdit } from "react-icons/fi";
import { addExam, getExamAdmin } from "../../../../axios/global";

function Exam() {
  const { id } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    topic: "",
    category: "",
    courseId: id,
    totalMarks: 0,
    examStartTime: 0,
    examEndTime: 0,
    examCreationTime: new Date().getTime(),
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setExamData((pre) => ({ ...pre, category: option }));
  };
  const handleChange = (e) => {
    setExamData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const [isOpen, setIsOpen] = useState(false);

  const SelectDropdown = () => {
    const options = ["quiz", "written"];

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
                  className="block rounded-md px-4 py-2 text-gray-800 transition-colors hover:bg-blue-600 hover:text-white w-full text-left"
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

          <SelectDropdown />
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

const ExamLists = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    getExamAdmin("all", setData, id);
  }, []);
  const QuestionCard = () => {
    return <div className="bg-slate-900 ring ring-slate-500 rounded-md"></div>;
  };
  return (
    <div>
      <h2>Exam List </h2>
      {/* here goes exam list */}
    </div>
  );
};

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
export default Exam;
export { checkHours };
