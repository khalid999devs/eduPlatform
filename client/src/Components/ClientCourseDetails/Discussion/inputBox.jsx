import { useState } from "react";
import { MdClose, MdPhoto, MdSend } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { client } from "../../../axios/discussion";
function InputBox({
  replyId,
  setReplyId,
  cid,
  replyMsg,
  
}) {
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(1);
  const [selectedImage, chooseImgs] = useState([]);

  function handleInputChange(event) {
    setInputValue((pre) => event.target.value);
    const lines = event.target.value.split("\n");
    setRows(Math.min(3, lines.length));
  }

  function sendChat(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append("question", inputValue);
    fData.append("courseId", cid);
    if (selectedImage.length > 0)
      selectedImage.forEach((img) => {
        fData.append("discussions", img);
      });
    client.addDiscussion(fData).then(() => {
      setInputValue("");
      setRows(1);
      chooseImgs([]); 
    });
  }
  function replyChat(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append("reply", inputValue);
    fData.append("courseId", cid);
    fData.append("discussionId", replyMsg?.id);

    if (selectedImage.length > 0)
      selectedImage.forEach((img) => {
        fData.append("discussions", img);
      });
    client.reply(fData).then(() => {
      alert("REPLY sent!!");
      setInputValue("");
      setRows(1);
      chooseImgs([]);
      setReplyId(-1);
    });
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
      <form
        className="w-full flex items-center gap-2"
        onSubmit={replyId > -1 ? replyChat : sendChat}
      >
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
      {replyId >= 0 ? (
        <div
          className="w-1/3 absolute left-5 border-l-4 border-l-root_bluish/70 rounded-lg bottom-full backdrop-blur-md z-0 bg-blue-500/50 bg-opacity-50 dark:text-white min-h-[2rem] text-left p-2 text-xs text-opacity-20 overflow-hidden max-h-20 break-words truncate"
          onClick={() => {
            setReplyId(-1);
          }}
        >
          <span className="font-bold">
            {JSON.parse(replyMsg?.user ? replyMsg?.user : "")?.fullName}
          </span>{" "}
          <br />
          <span className="font-extralight ">{replyMsg?.question}</span>
        </div>
      ) : null}
    </div>
  );
}

export default InputBox;
