import { useEffect, useState } from "react";
import "./timer.css";

function Timer({ preTime }) {
  const [timer, settimer] = useState({ hh: 0, mm: 0, ss: 0 });
  const [timeErr, setErr] = useState("");
  useEffect(() => {
    const fDate = new Date(preTime);

    const loop = setInterval(() => {
      const cDate = new Date();
      const differ = (fDate.getTime() - cDate.getTime()) / 1000;

      let hour = Math.floor(differ / 3600);
      let min = Math.floor((differ % 3600) / 60);
      let sec = Math.floor((differ % (3600000 * 60)) % 60);
      settimer((pre) => ({
        ...pre,
        hh: hour,
        mm: min,
        ss: sec,
      }));
      if (differ < 0) {
        settimer((pre) => ({ hh: 0, mm: 0, ss: 0 }));
        setErr("Time up!!");
        clearInterval(loop);
      } else {
        setErr("");
      }
    }, 1000);
    return () => clearInterval(loop);
  }, []);
  function parseTimer(x) {
    return 0 <= x && x < 10 ? `0${x}` : x;
  }
  return (
    <div className="sticky top-7 left-0 bg-slate-50 bg-opacity-50 backdrop-blur-sm p-5">
      <div className="my-5 flex items-center justify-center gap-2">
        <span className="timer">{parseTimer(timer.hh)}</span>
        <span className="dot">:</span>
        <span className="timer">
          {parseTimer(timer.mm == 60 ? 0 : timer.mm)}
        </span>
        <span className="dot">:</span>
        <span className="timer">
          {parseTimer(timer.ss == 60 ? 0 : timer.ss)}
        </span>
      </div>
      <p className="text-xl text-rose-400 w-fit mx-auto">
        {timeErr.length !== 0 && timeErr}
      </p>
    </div>
  );
}

export default Timer;
