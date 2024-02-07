import { useEffect, useState } from "react";
import "./timer.css";

//localstorage key
const localStartTime = Number(localStorage.getItem("startingTime"));
const localEndTime = Number(localStorage.getItem("endingTime"));
const localDur = Number(localStorage.getItem("duration"));

function Timer({ lastTime, durTime }) {
  const [curTime, setTime] = useState(new Date());
  const [timeErr, setErr] = useState(false);
  if (!localStartTime) localStorage.setItem("startingTime", curTime.getTime());
  if (!localEndTime)
    localStorage.setItem("endingTime", curTime.getTime() + durTime);

  const [dur, setdur] = useState(
    lastTime - localStartTime > durTime || typeof localDur === NaN
      ? localDur - 1000
      : lastTime - curTime.getTime()
  );

  useEffect(() => {
    if (dur >= 0) setErr(false);
    else setErr(true);
  }, [dur]);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    if (dur > 0)
      setdur(
        lastTime - localStartTime > durTime
          ? localEndTime - curTime?.getTime()
          : lastTime - curTime.getTime()
      );
    localStorage.setItem("duration", dur);
  }, [curTime]);
  return (
    <div className="fixed top-20 right-5 px-4 ring rounded-md bg-primary-main text-sm">
      <div className="my-5 flex items-center justify-center gap-2">
        <span className="timer">{parseTimer(duration(dur).hh)}</span>
        <span className="dot">:</span>
        <span className="timer">{parseTimer(duration(dur).mm)}</span>
        <span className="dot">:</span>
        <span className="timer">{parseTimer(duration(dur).ss)}</span>
      </div>
      {timeErr && <p className="text-rose-400 w-fit mx-auto">Time Over</p>}
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
