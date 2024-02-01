import { useEffect, useState } from "react";
import { addFaq, deleteFaq, getFaq, updateFaq } from "../../../axios/faq";

const UpdateFaq = () => {
  const [data, setData] = useState({
    ques: "",
    ans: "",
  });
  const [faqs, setFaqs] = useState([]);
  const [id, setId] = useState(-1);

  function handleChange(e) {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (id === -1) alert("Select a FAQ to update its data");
    else updateFaq(id, data);
  }

  useEffect(() => {
    getFaq(setFaqs).then(() => {
      console.log(faqs);
    });
  }, []);
  return (
    <div className="w-4/5 mx-auto p-5 rounded-md lg:flex items-start">
      <div className="grid gap-3 lg:m-10 flex-1 w-2/3 mx-auto">
        <h2 className="text-center text-lg font-semibold mb-4 underline">
          Update FAQ
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
              className="bg-transparent border--1 outline--1 flex-1"
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
              className="bg-transparent border--1 outline--1 flex-1"
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
            className="bg-green-500 hover:bg-green-400 transition-colors px-3 py-2 text-white rounded-sm"
            type="submit"
          >
            Update
          </button>
        </form>
        {id !== -1 && (
          <button
            className="bg-rose-500 hover:bg-rose-400 transition-colors text-base px-3 py-2 text-white rounded-sm"
            type="button"
            onClick={() => {
              let x = prompt("Do you want to delete the selected FAQ?[y/n]");
              if (x.toLocaleLowerCase() === "y") deleteFaq(id);
              else setId(-1);
            }}
          >
            Delete faq id {`{${id}}`}
          </button>
        )}
      </div>
      <div className="lg:flex-1">
        <h2 className="text-center text-lg font-semibold my-10 underline">
          FAQ <span className="text-xs">{"(s)"}</span>
        </h2>
        {faqs
          .sort((a, b) => {
            return a.createdAt > b.createdAt ? 1 : -1;
          })
          .map((faq, i) => {
            return (
              <section
                key={faq.createdAt}
                className={`${
                  id === faq.id ? "bg-blue-100" : "bg-white"
                } hover:bg-gray-100 transition-colors duration-100 ease-out p-2 border m-2 `}
                onClick={() => setId(id !== faq.id ? faq.id : -1)}
              >
                <p className="text-base">
                  {i + 1}. {faq.question}
                </p>
                <p className="text-sm">
                  <b> Answer:</b> {faq.answer}
                </p>
              </section>
            );
          })}
      </div>
    </div>
  );
};
export default UpdateFaq;
