import { useEffect, useState } from "react";
import "./timer.css";

function Timer({ differ }) {
  let dur = differ;
  const [timeErr, setErr] = useState(false);

  useEffect(() => {
    if (dur >= 0) setErr(false);
    else setErr(true);
  }, [dur]);
  return (
    <div className="fixed top-20 right-5 px-4 ring rounded-md bg-primary-main text-sm">
      <div className="my-5 flex items-center justify-center gap-2">
        <span className="timer">{parseTimer(duration(dur).hh)}</span>
        <span className="dot">:</span>
        <span className="timer">{parseTimer(duration(dur).mm)}</span>
        <span className="dot">:</span>
        <span className="timer">{parseTimer(duration(dur).ss)}</span>
      </div>
      <p className="text-rose-400 w-fit mx-auto">{timeErr && "Time Over"}</p>
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
