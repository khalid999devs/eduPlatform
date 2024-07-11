import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamResultClient } from "../../../axios/global";
import { reqImgWrapper } from "../../../assets/requests";

const ViewQuestion = () => {
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);
  const [error, setError] = useState({});

  const { examid } = useParams();
  useEffect(() => {
    getExamResultClient(examid, "single", setData, setError);
  }, []);
  useEffect(() => {
    setTotal(0);

    data?.quesAns?.forEach((ele) => {
      setTotal((pre) => pre + ele?.mark);
    });
  }, [data]);
  return (
    <div className="p-2">
      <h1 className="w-fit mx-auto my-10 font-bold uppercase text-xl">
        Answer sheet
      </h1>
      {error?.response && (
        <div className="text-rose-500 px-3 py-1 bg-rose-200 w-fit rounded-md mx-2 ring-1 ring-rose-500">
          <p>{error?.response?.data?.msg}</p>
        </div>
      )}

      {data?.otherData && (
        <>
          <ExamInfo
            otherData={data?.otherData}
            score={data?.score}
            total={total}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 w-fit mx-auto ">
            {data?.quesAns?.map((e, id) => {
              const ele = e;
              const quesOptions = ele?.quesOptions;
              const quesAns = ele?.quesAns;
              const stuAns = ele?.stuAns;
              const files = stuAns?.files;
              let images = [];
              if (ele?.images && ele?.ansType == "file") {
                images = ele?.images;
              }

              return (
                <section
                  key={`quesbid${id}`}
                  className="w-[400px] max-w-sm m-5 p-5 rounded-md ring-2 ring-slate-400 flex flex-col justify-between"
                >
                  {/* question title */}
                  <p className="w-full break-words">
                    {id + 1}. {ele?.title}{" "}
                    <span className="float-right">{ele?.mark}</span>
                  </p>
                  {images?.length != 0
                    ? images?.map((image,iid) => (
                         
                          <img
                          key={`iid_${iid}`}
                            className="rounded-md max-w-full"
                            src={reqImgWrapper(image?.url)}
                            width={800} 
                            alt={'Question Image'+ (iid+1)}
                          />
                        
                      ))
                    : null}
                  {/* each question option */}
                  <ul className="grid grid-cols-1 gap-1 my-3">
                    {quesOptions?.map((quesOpt, oid) => {
                      return (
                        <li
                          className={`rounded-md px-3 py-1 ${
                            oid + 1 === quesAns?.find((fid) => fid === oid + 1)
                              ? "bg-green-300/80 text-green-700 font-semibold"
                              : stuAns?.optionsId?.find(
                                  (fid) => fid === oid + 1
                                ) ===
                                oid + 1
                              ? "bg-red-200"
                              : "bg-white"
                          } hover:backdrop-brightness-125`}
                          key={`qopt${quesOpt?.id}`}
                        >
                          {oid + 1}. {quesOpt?.title}
                          {images?.length != 0 ? (
                            <>
                              <img
                                src={reqImgWrapper(images[oid]?.url)}
                                width={100}
                                height={100}
                              />
                            </>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {/* student answer list */}
                  <div className="grid gap-2">
                    Result:{!files && " No Image"} {files?.map((file, fid) => {
                      console.log(file);
                      return<img
                        key={`fid_${fid}`}
                        className="rounded-md max-w-full"
                        src={reqImgWrapper(file?.path)}
                        width={500}
                        alt={'Student Answer '+ (fid+1)}
                      />;
                    })}
                    <p>
                      Your Answer:{" "}
                      <span
                        className={`font-medium ${
                          stuAns?.isCorrect ? "text-green-800" : "text-rose-500"
                        }`}
                      >
                        {stuAns?.isCorrect ? "Correct!" : "Check your answer."}
                      </span>
                    </p>
                    {typeof stuAns?.writtenScore === "number" && (
                      <p>Written-Score: {stuAns?.writtenScore}</p>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const ExamInfo = ({ otherData, score, total }) => {
  return (
    <div className="m-5 p-5 max-w-lg mx-auto rounded-md capitalize bg-white dark:bg-slate-800 text-black dark:text-primary-dark shadow-md shadow-slate-200/70 grid grid-cols-1">
      <section>
        <h2 className="text-2xl font-bold">Exam Information:</h2>
      </section>
      <p className="glass-box">Exam Name: {otherData?.examName}</p>
      <p className="glass-box">Exam Topic: {otherData?.topic}</p>
      <p className="glass-box">Exam Type: {otherData?.category}</p>

      <p className="glass-box">
        Score: {score}/{total}
      </p>
    </div>
  );
};
export default ViewQuestion;
