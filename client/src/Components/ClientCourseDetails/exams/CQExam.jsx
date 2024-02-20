import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuesClient,
  addStdFilesAns,
  getSingleExamClient,
} from "../../../axios/global";
import { reqImgWrapper } from "../../../assets/requests";
import Timer from './Timer'


//main component
const CQExam = () => {
  const [data, setData] = useState([]);
  const { cid, examid } = useParams();
  const [examInfo, setEInfo] = useState({});
  const [curtime,setcurtime] = useState(new Date())
  useEffect(() => {
    getQuesClient(examid, "question", setData);
    getSingleExamClient(cid, examid, setEInfo);
  }, [examid]);
  
  const startTime = new Date(examInfo?.examStartTime);
  const endTime = new Date(examInfo?.examEndTime);
  useEffect(()=>{
    const loop = setInterval(() => {
      setcurtime(new Date());
    }, 1000);
    return ()=> clearInterval(loop)
  },[])

  return (
    <div className="w-3/4 mx-auto my-10 min-h-screen">
      <ExamInfo data={examInfo} startTime={startTime} endTime={endTime} curtime={curtime} />
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
const ExamInfo = ({ data, startTime, endTime,curtime }) => {
  let examDur = endTime?.getTime() - startTime?.getTime();
  const durTime = endTime?.getTime() - curtime?.getTime();
  return (
    <div className="text-left px-5 py-2 bg-white">
      
      <h2>Exam name: {data?.name}</h2>
      <h2>Exam topic: {data?.topic}</h2>
      <h2 className="font-semibold">Total Mark: {data?.totalMarks}</h2>
      <h2>
        Start Time:{" "}
        {`${startTime?.getDate()}-${
          startTime?.getMonth() + 1
        }-${startTime?.getFullYear()} || ${startTime?.getHours()}:${startTime?.getMinutes()}:${startTime?.getSeconds()}`}{" "}
        {"(24H)"}
      </h2>
      <h2>
        Finish Time:{" "}
        {`${endTime?.getDate()}-${
          endTime?.getMonth() + 1
        }-${endTime?.getFullYear()} || ${endTime?.getHours()}:${endTime?.getMinutes()}:${endTime?.getSeconds()}`}{" "}
        {"(24H)"}
      </h2>

      <h2 className="font-semibold">
        Total Duration: {duration(examDur).hh}:{duration(examDur).mm}:
        {duration(examDur).ss}
      </h2>
      <Timer durTime={durTime} classes={"p-1 m-5"}/>
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
