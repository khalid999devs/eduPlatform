import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import {
  FaForward,
  FaBackward,
  FaPlayCircle,
  FaPauseCircle,
} from "react-icons/fa";
import { MdClose, MdFullscreen, MdFullscreenExit } from "react-icons/md";

const YTPlayer = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sspeed, setsspeed] = useState(false);
  const [squality, setsquality] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState("hd720");

  const { cid, videoId } = useParams();

  const speeds = [0.5, 1, 1.5, 2];
  const qualities = ["hd720", "large", "medium"];

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // console.log(
  //   duration,
  //   currentTime,

  //   ((duration - currentTime) / duration) * 100,
  //   ((duration - currentTime) / duration) * 100 < 4,
  //   '%'
  // );

  useEffect(() => {
    // Load the YouTube API script
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    // Define functions for YouTube API callbacks
    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      delete window.onYouTubeIframeAPIReady;
      playerRef.current?.removeEventListener("contextmenu", handlecontext);
      window.removeEventListener("contextmenu", handlecontext);
      window.removeEventListener("keydown", handlecontext);
    };
  }, [videoId, cid]);

  const initializeYouTubePlayer = () => {
    // Create a new YouTube player
    const player = new window.YT.Player(playerRef.current, {
      videoId: videoId,
      playerVars: {
        fs: 0,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      onpause: togglePlay,
      onplay: togglePlay,
    });

    // Expose the player instance if needed
    // You can use this reference to control the player (play, pause, seek, etc.)
    playerRef.current = player;
    // Add event listener to disable right-click context menu
    playerRef.current?.addEventListener("contextmenu", handlecontext);
    window.addEventListener("contextmenu", handlecontext);
    window.addEventListener("keydown", handlecontext);
  };
  const handlecontext = (e) => {
    e.preventDefault();
    return;
  };
  const pauseVideo = () => {
    if (playerRef.current) playerRef.current?.pauseVideo();
  };
  const playVideo = () => {
    if (playerRef.current) playerRef.current?.playVideo();
  };
  const onPlayerReady = (event) => {
    // You can perform actions when the player is ready
    // For example, you can play the video:
    let tit = event.target.videoTitle;
    let dur = event.target.getDuration();
    let customTitle = localStorage.getItem("customTitle");
    setTitle(customTitle ? customTitle : "Record Class");
    setDuration(dur);
  };

  const onPlayerStateChange = (event) => {
    setInterval(() => {
      setCurrentTime(playerRef.current?.getCurrentTime());
    }, 1000);
  };

  const forwardVideo = () => {
    const newTime = playerRef.current?.getCurrentTime() + 10;
    playerRef.current?.seekTo(newTime, true);
  };
  const backwardVideo = () => {
    const newTime = playerRef.current?.getCurrentTime() - 10;
    playerRef.current?.seekTo(newTime, true);
  };

  const handleSeekChange = (e) => {
    // Handle changes in the seek input range
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current?.seekTo(newTime, true);
    }
  };
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current?.setPlaybackRate(newSpeed, true);
    }
  };
  const handleQualityChange = (newSpeed) => {
    setQuality(newSpeed);
    if (playerRef.current) {
      playerRef.current?.setPlaybackQuality(newSpeed);
    }
  };
  const showSpeed = () => {
    setsspeed((pre) => !pre);
  };
  const showQuality = () => {
    setsquality((pre) => !pre);
  };

  const controller = useMemo(() => {
    return (
      <div
        className={`custom-controls text-sm delay-200 flex justify-center items-center ${
          isPlaying ? "opacity-0 md:group-hover:opacity-100" : "opacity-100"
        } `}
        style={{
          zIndex: "1000",
        }}
      >
        {/* duration shower */}
        <div
          className="text-sm pointer-events-none p-2 flex rounded-md"
          style={{
            backgroundColor: "#0872fd",
          }}
        >
          <span>
            {`${convertTime(currentTime).m}:${convertTime(currentTime).s}`}
          </span>
          {"/"}
          <span>{`${convertTime(duration).m}:${convertTime(duration).s}`}</span>
        </div>
        <ProgessBar
          currentTime={currentTime}
          duration={duration}
          handleSeekChange={handleSeekChange}
        />
        <div className="flex-grow-[.25] flex items-center justify-evenly">
          {/* forward of backward */}

          <div className="text-sm flex gap-3 justify-center">
            <button onClick={backwardVideo}>
              <FaBackward />
            </button>
            <button onClick={forwardVideo}>
              <FaForward />
            </button>
          </div>
          {/* other controller vidSetting*/}
          <div className="flex gap-1">
            {/* speed control */}
            <div className="relative">
              <button className="text-xs w-fit" onClick={showSpeed}>
                Speed
              </button>
              <ul onClick={showSpeed} className="absolute left-2">
                {sspeed &&
                  speeds.map((ele, id) => {
                    return (
                      <li
                        className="speed"
                        key={id}
                        onClick={() => {
                          handleSpeedChange(ele);
                          showSpeed();
                        }}
                      >
                        {`${ele}x`}
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* quality control */}
            <div className="relative">
              <button className="w-fit text-xs" onClick={showQuality}>
                Quality
                <ul className="absolute left-2" onClick={showQuality}>
                  {squality &&
                    qualities.map((ele, id) => {
                      return (
                        <li
                          className="speed"
                          key={id}
                          onClick={() => {
                            handleQualityChange(ele);
                            showQuality();
                          }}
                        >
                          {ele}
                        </li>
                      );
                    })}
                </ul>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    duration,
    currentTime,
    convertTime,
    togglePlay,
    isPlaying,
    handleSeekChange,
  ]);

  return (
    <div
      className={`video-container group`}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          e.key === "Tab"
        ) {
          e.preventDefault();
        }
      }}
      onKeyDownCapture={(e) => {
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          e.key === "Tab"
        ) {
          e.preventDefault();
        }
      }}
    >
      <HistoryBackBtn />
      <div
        ref={playerRef}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && e.code === "I") ||
            e.key === "Tab"
          ) {
            e.preventDefault();
          }
        }}
      />
      {/* video default control blocker */}
      <div
        className="blockbefore transition"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: !isPlaying ? "#1116" : "#0000",
          zIndex: "0",
          pointerEvents: "all",
        }}
        onClick={() => {
          togglePlay();
          if (!isPlaying) playVideo();
          else pauseVideo();
        }}
      />
      <div
        className={`centerController ${isPlaying ? "hide" : "active"}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PPButton
          Click={togglePlay}
          isPlaying={isPlaying}
          pauseVideo={pauseVideo}
          playVideo={playVideo}
        />
      </div>
      <div
        className="customHeader transition-opacity duration-100 ease-out"
        style={{
          zIndex: "1000",
          background: isPlaying ? "#fff1" : "",
          opacity: isPlaying ? "0.5" : "1",
          transitionProperty: "background",
          transitionDelay: "300ms",
        }}
      >
        <p
          className={`transition-colors pl-3 duration-300 delay-500 ${
            isPlaying ? "text-transparent" : ""
          }`}
        >
          {title}
        </p>
      </div>
      {controller}
    </div>
  );
};

export default YTPlayer;

const PPButton = ({ isPlaying, Click, playVideo, pauseVideo }) => {
  return (
    <PPIcon
      isPlaying={isPlaying}
      playVideo={playVideo}
      pauseVideo={pauseVideo}
      Click={Click}
    />
  );
};
const ProgessBar = ({ currentTime = 0, duration = 1, handleSeekChange }) => {
  return (
    <input
      type="range"
      name="vidRange"
      min={0}
      max={duration ? duration : 0}
      step={1}
      value={currentTime ? currentTime : 0}
      onChange={handleSeekChange}
    />
  );
};
const PPIcon = ({ isPlaying, playVideo, pauseVideo, Click }) => {
  if (!isPlaying)
    return (
      <button
        onClick={() => {
          playVideo();
          Click();
        }}
      >
        <FaPlayCircle />
      </button>
    );
  else
    return (
      <button
        onClick={() => {
          Click();
          pauseVideo();
        }}
      >
        <FaPauseCircle />
      </button>
    );
};
function convertTime(timeInSecond = 0) {
  let m = addPrefix(Math.floor(timeInSecond / 60));
  let s = addPrefix(Math.floor(timeInSecond - m * 60));
  let time = { m, s };
  return time;
}
function addPrefix(val) {
  return val < 10 ? `0${val}` : val;
}

const HistoryBackBtn = () => {
  return (
    <button
      className="fixed z-50 top-5 right-5 bg-white grid place-content-center"
      onClick={() => {
        window.history.back();
      }}
    >
      <MdClose color="white" />
    </button>
  );
};
