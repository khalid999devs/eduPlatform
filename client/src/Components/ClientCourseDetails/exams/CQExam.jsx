import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuesClient,
  addStdFilesAns,
  getSingleExamClient,
} from "../../../axios/global";
import { reqImgWrapper } from "../../../assets/requests";
import Timer from "./Timer";
import { MdClose } from "react-icons/md";
//main component

const CQExam = () => {
  const [data, setData] = useState([]);
  const { cid, examid } = useParams();
  const [examInfo, setEInfo] = useState({});
  const [finish, setFinish] = useState(false);
  const startTime = new Date(Number(examInfo?.examStartTime));
  const endTime = new Date(Number(examInfo?.examEndTime));
  const curTime = Date.now();
  const navigate = useNavigate();

  useEffect(() => {
    getQuesClient(examid, "question", setData);
    getSingleExamClient(cid, examid, setEInfo);
    const jsonData = {
      questions: [
        {
          id: "5@7834076",
          title: "New Ques 5?",
          ansType: "options",
          quesOptions: [
            { id: 1, title: "op1" },
            { id: 2, title: "op2" },
            { id: 3, title: "op3" },
            { id: 4, title: "op4" },
            { id: 5, title: "op5" },
          ],
          mark: 5,
        },
        {
          id: "5@8161241",
          title: "New Ques 1?",
          ansType: "options",
          quesOptions: [
            { id: 1, title: "op1" },
            { id: 2, title: "op2" },
            { id: 3, title: "op3" },
          ],
          mark: 15,
        },
        {
          id: "5@8204966",
          title: "New Ques 2?",
          ansType: "options",
          quesOptions: [
            { id: 1, title: "op1" },
            { id: 2, title: "op2" },
            { id: 3, title: "op3" },
            { id: 4, title: "op4" },
          ],
          mark: 13,
        },
        {
          id: "5@8760079",
          title: "New Question Image",
          ansType: "options",
          category: "null",
          quesOptions: [
            { id: 1, title: "op1" },
            { id: 2, title: "op2" },
            { id: 3, title: "op3" },
            { id: 4, title: "op4" },
          ],
          mark: 17,
          images: [
            {
              url: "uploads\\questions\\exam@5\\New_Question_Im\\New_Question_Im_exam@5_1719568760062.png",
              originalName: "khalid ahammed.png",
            },
            {
              url: "uploads\\questions\\exam@5\\New_Question_Im\\New_Question_Im_exam@5_1719568760069.jpeg",
              originalName: "pexels-fotoaibe-813692.jpg",
            },
          ],
        },
      ],
      answers: [
        { id: "5@7834076", quesAns: [3] },
        { id: "5@8161241", quesAns: [2, 3] },
        { id: "5@8204966", quesAns: [2] },
        { id: "5@8760079", quesAns: [1] },
      ],
    };

    // setData(jsonData.questions);
  }, [examid]);

  useEffect(() => {
    let loop = setTimeout(() => {
      if (!finish || curTime > endTime.getTime()) {
        navigate(`/courses/onClientReq/${cid}/exam`, {
          preventScrollReset: false,
        });
      }
    }, 1000);
    return () => clearTimeout(loop);
  }, [finish]);

  useEffect(() => {
    function blockReload(event) {
      if (data?.length > 0) event?.preventDefault();
    }
    window.addEventListener("beforeunload", blockReload);
    return () => {
      window.removeEventListener("beforeunload", blockReload);
    };
  }, [data]);

  return (
    <div className="w-3/4 mx-auto my-10 min-h-screen">
      <ExamInfo
        data={examInfo}
        startTime={startTime}
        endTime={endTime}
        setFinish={setFinish}
      />
      {data?.length > 0
        ? data?.map((quest, id) => {
            return (
              <Questions
                key={`qid+${id}`}
                id={id}
                qid={quest.id}
                cid={cid}
                eid={examid}
                mark={quest?.mark}
                title={quest?.title}
                images={quest?.images}
                allowSubmit={!finish}
              />
            );
          })
        : null}
    </div>
  );
};
const ExamInfo = ({ data, startTime, endTime, setFinish }) => {
  let examDur = endTime?.getTime() - startTime?.getTime();
  return (
    <div className="text-left px-5 py-2 bg-white">
      <h2>Exam name: {data?.name}</h2>
      <h2>Exam topic: {data?.topic}</h2>
      <h2>Exam Type: {data?.category?.toUpperCase()}</h2>
      <h2 className="font-semibold">Total Mark: {data?.totalMarks}</h2>
      <h2>Start Time: {startTime?.toLocaleTimeString()}</h2>
      <h2>End Time: {endTime?.toLocaleTimeString()}</h2>

      <h2 className="font-semibold">
        Total Duration: {duration(examDur).hh}:{duration(examDur).mm}:
        {duration(examDur).ss}
      </h2>
      <p className="rounded-md p-3 bg-red-500 text-white">
        NB:- If you have already taken the exam then just leave the page. After
        finishing the exam, you can see the answer paper
      </p>
      <Timer classes={"p-1 m-5"} endTime={endTime} setSubmit={setFinish} />
    </div>
  );
};
const Questions = ({ id, qid, eid, cid, title, mark, images, allowSubmit }) => {
  const [files, setFiles] = useState([]);
  const [load, setLoad] = useState(false);
  const [msg, setmsg] = useState("");
  const handleSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    const fData = new FormData();
    if (files.length === 0) {
      //check image files lenght
      alert("Please attach image of answers.");
      setDis(false);
      setLoad(false);
      return;
    } else if (allowSubmit) {
      fData.append(
        "ansInfo",
        JSON.stringify({
          courseId: cid,
          examId: eid,
          questionId: qid,
          submittedTime: Number(Date.now()),
        })
      );
      fData.append("examId", eid);
      files.map((file) => {
        fData.append("examsAns", file);
      });
      // fData.forEach((ele) => {
      //   console.log(ele);
      // });

      addStdFilesAns(fData, setmsg)
        .then(() => {
          setLoad(false);
        })
        .catch(() => {
          alert("problem in submitting answers.");
          setLoad(false);
        });
    }
  };

  return (
    <div>
      {/* header */}
      <section className="flex justify-between p-2">
        <h1 className="font-semibold tracking-wide text-blue-950">
          {id + 1}. {title}
        </h1>
        <h1 className="font-semibold tracking-wide text-blue-950">{mark}</h1>
      </section>
      <section className="flex flex-wrap gap-5 p-5">
        {images?.length > 0
          ? images?.map((image, iid) => {
              return (
                <img
                  key={"qImgId+" + iid}
                  className="max-w-sm p-0 rounded-lg overflow-hidden"
                  width={600}
                  src={reqImgWrapper(image?.url)}
                  alt="img file"
                />
              );
            })
          : null}
      </section>
      <form onSubmit={handleSubmit}>
        <label
          className="border-2 border-dashed border-purple-500 p-10 m-5 flex items-start justify-center rounded-xl bg-purple-100 text-purple-700 hover:bg-violet-200 transition-colors font-bold tracking-wider font-sans"
          htmlFor={`files${qid}`}
        >
          Add Answers
          <input
            type="file"
            name={`files${qid}`}
            id={`files${qid}`}
            multiple={true}
            hidden
            accept={["image/*"]}
            onChange={(e) => setFiles([...e.target.files])}
          />
        </label>
        <section className="flex flex-wrap w-auto gap-2">
          {files.length > 0
            ? files.map((file, fid, arr) => {
                return (
                  <div className="relative" key={"fileId_" + fid}>
                    <span
                      className="absolute -right-1 -top-1 p-1 rounded-full bg-red-500"
                      onClick={() =>
                        setFiles(arr.filter((pro, pid) => pid != fid))
                      }
                    >
                      <MdClose />
                    </span>
                    <img
                      className="aspect-square"
                      src={URL.createObjectURL(file)}
                      width={100}
                      height={50}
                      onClick={() => {
                        setFiles(files.filter((f) => f != file));
                      }}
                    />
                  </div>
                );
              })
            : null}
        </section>

        {allowSubmit && (
          <button
            className="rounded-md bg-slate-950 text-white px-3 py-1 m-5"
            type="submit"
            disabled={load}
          >
            {load ? "submitting..." : "Submit"}
          </button>
        )}
      </form>
      {msg != "" ? (
        <p className="text-blue-600 bg-blue-200 rounded-md px-4 py-2">{msg}</p>
      ) : null}
    </div>
  );
};
function duration(localDuration) {
  let x = Math.abs(localDuration > 0 ? localDuration : 0);

  x /= 1000;
  x = parseInt(x);

  return {
    hh: addZero(Math.floor(x / 3600)),
    mm: addZero(Math.floor((x % 3600) / 60)),
    ss: addZero(x % 60),
  };
}
function addZero(x) {
  return x < 10 ? `0${x}` : x;
}
export default CQExam;
