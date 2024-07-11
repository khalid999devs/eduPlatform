import React, { useState } from "react";
import { MdVideoLibrary } from "react-icons/md";
import { addClass } from "../../../../axios/global";

const VdoUpload = ({ id }) => {
  const [rcrdData, setRcd] = useState({
    videoURL: "",
    videoTitle: "",
    videoLength: 30,
    desc: "",
  });

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
            {/* class title */}
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
                value={rcrdData.videoTitle}
                placeholder="Enter the title"
                required
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, videoTitle: e.target.value }));
                }}
              />
            </div>
            {/* class link */}
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
                value={rcrdData.videoURL}
                placeholder="Class link"
                required
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, videoURL: e.target.value }));
                }}
              />
            </div>
            {/* class description */}
            <div className="w-full mb-6">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="desc"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 row-span-3 resize-none"
                id="desc"
                type="text"
                rows={5}
                value={rcrdData.desc}
                placeholder="Class link"
                required
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, desc: e.target.value }));
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              e.preventDefault();
              if (
                rcrdData.videoTitle.length == 0 ||
                rcrdData.videoURL.length == 0 ||
                rcrdData.desc.length == 0
              )
                alert("PLease fill all the information.");
              else addClass(id, rcrdData);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VdoUpload;
