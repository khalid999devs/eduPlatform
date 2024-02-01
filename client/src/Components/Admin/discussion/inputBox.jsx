import { useState } from "react";
import { MdClose, MdPhoto, MdSend } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { admin } from "../../../axios/discussion";
function InputBox({ replyId, cid }) {
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(1);
  const [selectedImage, chooseImgs] = useState([]);
  const handleInputChange = (event) => {
    setInputValue((pre) => event.target.value);
    const lines = event.target.value.split("\n");
    setRows(Math.min(3, lines.length));
  };
  function sendChat(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append("question", inputValue);
    fData.append("courseId", cid);
    if (selectedImage.length > 0)
      selectedImage.forEach((img) => {
        fData.append("discussions", img);
      });
    // console.log(selectedImage);
    admin.addDiscussion(fData);
  }
  return (
    <div className="flex flex-col items-start space-x-2 w-full px-5 py-3 text-center relative h-fit mb-4 font-thin tracking-wide text-sm bg-root_bluish/70  rounded-xl ">
      {/* photo viewer */}
      <div
        className={`w-full p-5 bg-white ring-1 ring-blue-500/70 mb-5 rounded-xl flex flex-wrap ${
          !selectedImage.length && "hidden"
        }`}
      >
        {/* show selected images */}
        {selectedImage.length
          ? selectedImage.map((image) => {
              return (
                <div className="relative m-2 w-auto group" key={image?.name}>
                  {/* cross handler */}
                  <span
                    className="absolute right-1 top-1 bg-rose-400 hover:bg-rose-600 text-white rounded-full p-1 z-10 opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      chooseImgs(
                        selectedImage.filter((newImage) => newImage != image)
                      );
                    }}
                  >
                    <MdClose />
                  </span>
                  {image?.type?.includes("image") ? (
                    <img
                      className="aspect-video size w-20 rounded-md overflow-hidden shadow-lg shadow-slate-900"
                      width={200}
                      height={100}
                      src={image && URL.createObjectURL(image)}
                      alt="photo"
                    />
                  ) : (
                    <button className="relative flex items-center gap-1 w-auto h-fit left-0 top-4 text-black whitespace-nowrap p-2 size max-w-sm rounded-md shadow-lg shadow-slate-900">
                      <FaFileAlt fill="#25fa" /> {image?.name}
                    </button>
                  )}
                </div>
              );
            })
          : null}
      </div>
      {/* msg input part */}
      <form className="w-full flex items-center gap-2" onSubmit={sendChat}>
        <div
          className={`flex flex-1 items-center gap-3 p-2.5 dark:bg-stone-900/30 bg-stone-800/70 text-white border-gray-300 flex-grow outline-none border-0 ring-[1.5px] ring-blue-500 ${
            rows > 1 ? "rounded-lg" : "rounded-full"
          }`}
        >
          <textarea
            className={`w-4/5 flex-grow outline-none border-0 bg-transparent`}
            value={inputValue}
            rows={rows}
            onChange={handleInputChange}
            required
            placeholder="Write something..."
            style={{
              resize: "none",
              overflow: "auto",
            }}
          />
          {/* divider */}
          <hr className="h-5 w-1 bg-slate-500 rounded-full " />
          {/* photo choose */}
          <label
            className="hover:bg-trans_bluish rounded-full w-fit text-blue-500 p-2 cursor-pointer duration-300 ease-out"
            htmlFor="choosePhoto"
          >
            <MdPhoto />
          </label>
          <input
            className="hidden"
            type="file"
            name="choosePhoto"
            id="choosePhoto"
            multiple={true}
            onChange={(e) => {
              chooseImgs([...e.target.files]);
            }}
          />
        </div>
        <button
          className="transition-colors ease-out w-10 h-10 p-2 bg-blue-700 hover:bg-blue-500 text-white rounded-full flex justify-center items-center "
          type="submit"
        >
          <MdSend size={20} />
        </button>
      </form>
      {/* reply box */}
      {/* {replyId && (
        <div className="w-2/5 absolute left-5 ring-1 ring-stone-500/80 rounded-lg bottom-full backdrop-blur-md z-0 bg-slate-400/20 dark:text-white min-h-[2rem] text-left p-2 text-xs text-opacity-20 overflow-y-hidden max-h-20 break-words">
          <span className="font-bold">{raw_msg_data[replyId].sender}</span>{" "}
          <br />
          <span className="font-extralight ">
            {raw_msg_data[replyId].message}
          </span>
          <div className="w-full h-1/3 p-1 bg-gradient-to-t from-trans_bluish absolute bottom-0 left-0"></div>
        </div>
      )} */}
    </div>
  );
}

export default InputBox;
