import { useState } from "react";
import { addFaq } from "../../../axios/faq";

const AddFaq = () => {
  const [data, setData] = useState({
    ques: "",
    ans: "",
  });

  function handleChange(e) {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    addFaq(data);
  }

  return (
    <div className="w-4/5 mx-auto p-5 rounded-md  ">
      <h2 className="text-center text-lg font-semibold mb-10 underline">
        Add FAQ
      </h2>

      <form
        className="text-base flex flex-col gap-2 justify-evenly"
        onSubmit={handleSubmit}
      >
        <section className="w-full bg-white ring ring-violet-500 rounded-md p-2 flex justify-between">
          <label className="m-2" htmlFor="ques">
            Questions:{" "}
          </label>
          <input
            className="bg-transparent border-0 outline-0 flex-1"
            type="text"
            name="ques"
            id="ques"
            required
            value={data.ques}
            placeholder="Questions"
            onChange={handleChange}
          />
        </section>
        <section className="w-full bg-white ring ring-violet-500 rounded-md p-2 flex justify-between">
          <label className="m-2" htmlFor="ans">
            Answer:{" "}
          </label>
          <input
            className="bg-transparent border-0 outline-0 flex-1"
            type="text"
            name="ans"
            id="ans"
            required
            value={data.ans}
            placeholder="Order"
            onChange={handleChange}
          />
        </section>
        <button
          className="bg-blue-400 px-3 py-2 text-white rounded-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddFaq;
