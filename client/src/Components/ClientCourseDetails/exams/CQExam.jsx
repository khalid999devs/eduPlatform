import React, { useEffect, useState } from "react";
import {
  getQuesClient,
  addStdFilesAns,
  getSingleExamClient,
} from "../../../axios/global";
import { reqImgWrapper } from "../../../assets/requests";

import { useParams } from "react-router-dom";
const CQExam = () => {
  const [data, setData] = useState([]);
  const { cid, examid } = useParams();
  const [examInfo, setEInfo] = useState({});
  useEffect(() => {
    getQuesClient(examid, "question", setData);
    getSingleExamClient(cid, examid, setEInfo);
  }, [examid]);
  return (
    <div className="w-3/4 mx-auto my-10 min-h-screen">
      <ExamInfo eInfo={examInfo} />
      {data?.length > 0
        ? data?.map((quest, id) => {
            return (
              <Questions
                key={`id${id}`}
                id={id}
                qid={quest.id}
                cid={cid}
                eid={examid}
                mark={quest?.mark}
                title={quest?.title}
                images={quest?.images}
              />
            );
          })
        : null}
    </div>
  );
};
const ExamInfo = ({ eInfo }) => {
  if (eInfo?.name)
    return (
      <div className="text-left text-root_bluish font-semibold w-max mx-auto rounded-lg ring ring-red-500 ring-offset-4 ring-offset-red-400 px-10 py-5 mb-10">
        <h1>Exam name: {eInfo?.name}</h1>
        <h1>Exam Topic: {eInfo?.topic}</h1>
        <h1>Exam type: {eInfo?.category}</h1>
      </div>
    );
};
const Questions = ({ id, qid, eid, cid, title, mark, images }) => {
  const [files, setFiles] = useState([]);
  const [disable, setDis] = useState(false);
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
    } else {
      fData.append(
        "ansInfo",
        JSON.stringify({
          courseId: cid,
          examId: eid,
          questionId: qid,
        })
      );
      fData.append("examId", eid);
      files.map((file) => {
        fData.append("examsAns", file);
      });
      // fData.forEach((ele) => {
      //   console.log(ele);
      // });

      addStdFilesAns(fData)
        .then(() => {
          alert("Submitted");
          setLoad(false);
          setDis(true);
        })
        .catch(() => {
          alert("problem in submitting answers.");
          setLoad(false);
          setDis(false);
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
          ? images?.map((image) => {
              return (
                <img
                  className="max-w-sm p-0 rounded-lg overflow-hidden"
                  width={600}
                  src={reqImgWrapper(image?.url)}
                  alt=""
                />
              );
            })
          : null}
      </section>
      <form onSubmit={handleSubmit} hidden={disable}>
        <label
          className="border-2 border-dashed border-purple-500 p-10 m-5 flex items-start justify-center rounded-xl bg-purple-100 text-purple-700 hover:bg-violet-200 transition-colors font-bold tracking-wider font-sans"
          htmlFor={`files${qid}`}
        >
          Drop your answers
          <input
            type="file"
            name={`files${qid}`}
            id={`files${qid}`}
            multiple={true}
            hidden
            onChange={(e) => setFiles([...e.target.files])}
          />
        </label>
        <section className="flex flex-wrap w-1/2 gap-2">
          {files.length > 0
            ? files.map((file) => {
                return (
                  <img
                    src={URL.createObjectURL(file)}
                    width={150}
                    height={150}
                    onClick={() => {
                      setFiles(files.filter((f) => f != file));
                    }}
                  />
                );
              })
            : null}
        </section>

        <button
          className="rounded-md bg-slate-950 text-white px-3 py-1 m-5"
          type="submit"
          disabled={load}
        >
          {load ? "submitting..." : "Submit"}
        </button>
      </form>
      {disable && msg != "" ? <p>{msg}</p> : null}
    </div>
  );
};

export default CQExam;
