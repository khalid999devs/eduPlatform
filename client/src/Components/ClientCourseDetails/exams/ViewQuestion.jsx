import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuesClient } from "../../../axios/global";
import { reqImgWrapper } from "../../../assets/requests";

const ViewQuestion = () => {
  const [data, setData] = useState({});

  const { examid } = useParams();
  useEffect(() => {
    getQuesClient(examid, "answer", setData);

  }, []);

  return (
    <div>
      <h1 className="w-fit mx-auto my-10 font-bold uppercase text-xl">
        Answer sheet
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-fit border border-blue-500 mx-auto ">
        {Object.keys(data).map((e, id) => {
          const ele = data[e];
          let images = [];
          if (ele?.images && ele?.ansType == "file") {
            images = ele?.images;
          }
          return (
            <section
              key={`quesid${ele?.id}`}
              className="w-[400px] max-w-sm m-5 p-5 rounded-md ring-4 ring-yellow-400 flex flex-col justify-between"
            >
              {/* question title */}
              <p className="w-full break-words">
                {id + 1}. {ele?.title}{" "}
                <span className="float-right">{ele?.mark}</span>
              </p>
              {/* each question */}
              <ul className="grid grid-cols-1 gap-2 m-5">
                {ele?.quesOptions?.map((quesOpt, oid) => {
                  return (
                    <li
                      className={`ring-red-500 ring rounded-md px-3 py-1 ${oid + 1 === ele?.quesAns?.find(fid => fid === (oid + 1)) && "bg-green-300/80"}`}
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
              {/* answers list */}
              <p className="hidden">
                Ans:{" "}
                {ele?.quesAns?.map((quesOpt, oid, arr) => {
                  let x = ele?.quesOptions?.find(
                    (e) => e?.id == Number(quesOpt)
                  );
                  return (
                    <span
                      key={`qapt${quesOpt}${oid}`}
                      className="border border-sky-600 p-2 mx-2"
                    >
                      {quesOpt}
                    </span>
                  );
                })}
              </p>
            </section>
          );
        })}
      </div>
    </div>
  );
};
export default ViewQuestion;
