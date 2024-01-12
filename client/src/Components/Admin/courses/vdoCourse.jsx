import React, { useState } from "react";
import { MdVideoLibrary } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsCloudUploadFill } from "react-icons/bs";
import { MdStickyNote2 } from "react-icons/md";
import Exams from "./exams/exams";

const VdoUpload = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="form-container  flex justify-center items-start flex-wrap mb-16 pt-16 dark:text-white">
      {/* recorded class */}
      <div className=" p-3 mb-10">
        <h1 className="text-center text-darkText font-semibold text-2xl mb-6">
          Recorded class{" "}
          <MdVideoLibrary className=" inline-block text-lime-600 " />{" "}
        </h1>
        <form className="w-full max-w-lg px-3">
          <div className="w-full flex flex-wrap mb-2">
            <div className="w-full mb-6">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                placeholder="Enter the title"
                required
              />
            </div>

            <div className="w-full mb-6">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="record"
              >
                Class link
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="record"
                type="text"
                placeholder="Class link"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      {/* live zoom class link */}
      {/* <div className="p-3 mb-10 ">
        <h1 className=" text-center text-darkText font-semibold text-2xl mb-6 ">
          Live Zoom class{" "}
          <AiOutlineVideoCameraAdd className=" inline-block text-sky-800 " />
        </h1>
        <form className="w-full max-w-lg px-3">
          <div className="w-full flex flex-wrap mb-2">
            <div className="w-full mb-6">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                placeholder="Enter the title"
                required
              />
            </div>

            <div className="w-full mb-6">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="live"
              >
                Class link
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="live"
                type="text"
                placeholder="Class link"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div> */}

      <div className="flex flex-col">
        {/* exam links */}
        <h1 className="text-center text-darkText font-semibold text-2xl mb-6">
          Exam Board{" "}
          <MdStickyNote2 className=" inline-block text-purple-600 " />
        </h1>
        <Exams />
      </div>
    </div>
  );
};

export default VdoUpload;
