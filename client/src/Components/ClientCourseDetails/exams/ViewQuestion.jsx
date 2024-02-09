import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuesClient } from "../../../axios/global";

const ViewQuestion = () => {
  const [data, setData] = useState({});
  const { cid, examid } = useParams();
  useEffect(() => {
    getQuesClient(examid, "answer", setData);
  }, []);
  
  return (
    <div>
      <h1>Answer sheet</h1>
      <div>
        {Object.keys(data).map((e, id) => {
          const ele = data[e];

          return (
            <section key={`quesid${ele?.id}`} className="m-8">
              <p>
                {id+1}. {ele?.title} <span>{ele?.mark}</span>
              </p>
              <p className="grid grid-cols-2 items-start  w-max gap-2 m-5 mx-auto">
                {ele?.quesOptions?.map((quesOpt, oid) => {
                  return (
                    <span className="ring rounded-md px-3 py-1" key={`qopt${quesOpt?.id}`}>
                      {quesOpt?.title}
                    </span>
                  );
                })}
              </p>
              <p>
                Ans:{" "}
                {ele?.quesAns?.map((quesOpt, oid) => {
                  return (
                    <span key={`qapt${quesOpt}`}>
                      {oid + 1}
                      {")"}
                      {quesOpt?.title}
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
