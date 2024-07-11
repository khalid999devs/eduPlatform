import { useEffect, useState } from "react";
import "./timer.css";

function Timer({ classes, endTime, setSubmit }) {
  const [time, settime] = useState(new Date());
  const [durTime, setdur] = useState(0);
  useEffect(() => {
    const loop = setInterval(() => {
      let newTime = new Date();
      settime(newTime);
    }, 1000);
    return () => clearInterval(loop);
  }, []);
  useEffect(() => {
    let dur = endTime?.getTime() - time?.getTime();
    setdur(dur);
    setSubmit(dur < 0);
  }, [time]);
  return (
    <div className={`${classes} px-4 ring rounded-md bg-primary-main text-sm`}>
      <div className="my-5 flex items-center justify-center gap-2">
        <span className="timer">{parseTimer(duration(durTime).hh)}</span>
        <span className="dot">:</span>
        <span className="timer">{parseTimer(duration(durTime).mm)}</span>
        <span className="dot">:</span>
        <span className="timer">{parseTimer(duration(durTime).ss)}</span>
      </div>
      {/* {timeErr && <p className="text-rose-400 w-fit mx-auto">Time Over</p>} */}
    </div>
  );
}

function parseTimer(x) {
  return 0 <= x && x < 10 ? `0${x}` : x;
}

function duration(differ) {
  let x = Math.abs(differ >= 0 ? differ : 0);

  x /= 1000;
  x = parseInt(x);

  return {
    hh: Math.floor(x / 3600),
    mm: Math.floor((x % 3600) / 60),
    ss: x % 60,
  };
}
export default Timer;
