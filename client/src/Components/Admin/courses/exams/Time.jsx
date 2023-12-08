import { useEffect, useState } from "react";

function TimeTable({ time, checkHours, endTime, showStatus }) {
  const mytime = new Date();
  if (!time || !checkHours || !endTime) return;
  const [curTime, settime] = useState(mytime);

  useEffect(() => {
    const loop = setInterval(() => {
      settime((prevTime) => new Date());
      return () => {
        clearInterval(loop);
      };
    }, 1000);
  }, []);
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };
  const hour = curTime.getHours();
  const minute = curTime.getMinutes();
  const seconds = curTime.getSeconds();
  return (
    <section className="flex flex-wrap md:w-2/5 md:min-w-max w-auto  mx-auto px-5 justify-center">
      {/* current time */}
      {showStatus && (
        <article className="border border-black m-1 p-3 h-min text-center">
          <h1 className="uppercase ">current time</h1>
          <span className="font-bold text-orange-500">
            {formatTime(checkHours(hour)?.time)}:{formatTime(minute)}:
            {formatTime(seconds)} {checkHours(hour)?.format}
          </span>
        </article>
      )}
      {/* start time */}
      <article className="border border-black m-1 p-3 h-min text-center">
        <h1 className="uppercase ">exam start time</h1>
        <span className="font-bold text-green-500">
          {formatTime(checkHours(time?.getHours())?.time)}:
          {formatTime(time?.getMinutes())}:{formatTime(time?.getSeconds())}{" "}
          {checkHours(time?.getHours())?.format}
        </span>{" "}
        <br />
        <span>
          {time?.getDate()}/{time?.getMonth()}/{time?.getFullYear()}
        </span>
      </article>
      {/* end time */}
      <article className="border border-black m-1 p-3 h-min text-center">
        <h1 className="uppercase ">Exam end time</h1>
        <span className="font-bold text-red-500">
          {formatTime(checkHours(time?.getHours())?.time)}:
          {formatTime(endTime?.getMinutes())}:
          {formatTime(endTime?.getSeconds())}{" "}
          {checkHours(endTime?.getHours())?.format}
        </span>
        <br />
        <span>
          {endTime?.getDate()}/{endTime?.getMonth()}/{endTime?.getFullYear()}
        </span>
      </article>

      {showStatus && (
        <article className="border border-black m-1 p-3 h-min text-center">
          <h1 className="uppercase ">Status </h1>
          {curTime?.getTime() - time.getTime() < 0 ? (
            <span className="text-pink-600 font-bold">
              Exam has not started yet!! 😍😍 <br />
            </span>
          ) : (
            <span
              className={`"text-center font-bold ${
                curTime?.getTime() > time?.getTime() &&
                curTime?.getTime() < endTime?.getTime()
                  ? "text-green-700"
                  : "text-red-500  animate-pulse"
              }`}
            >
              {curTime?.getTime() > time?.getTime() &&
              curTime?.getTime() < endTime?.getTime()
                ? "Exam has started!! 🥳🥳"
                : "Exam has closed!! 🥹🥹"}
            </span>
          )}
        </article>
      )}
    </section>
  );
}

export default TimeTable;
