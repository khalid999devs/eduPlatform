import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './style.css';
import {
  FaForward,
  FaBackward,
  FaPlayCircle,
  FaPauseCircle,
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import reqs from '../../assets/requests';

const YTPlayer = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sspeed, setsspeed] = useState(false);
  const [squality, setsquality] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState('');
  const [speed, setSpeed] = useState(1);
  const { videoId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastSavedDuration, setLastSavedDuration] = useState(10);
  const [lockedTimeDuration, setLockedTimeDuration] = useState(-1);
  const currentTimeRef = useRef(currentTime);
  const prevSavedTimeRef = useRef(lastSavedDuration);

  const courseId = Number(searchParams.get('courseId'));
  const classId = Number(searchParams.get('classId'));
  const [showControl, setShowControl] = useState(true);
  const speeds = [0.5, 1, 1.5, 2];
  const qualities = ['hd720', 'large', 'medium'];
  // const [isWatchDone,setIsWatchDone]=useState(false)
  const [doneReqCount, setIsDoneReqCount] = useState(0);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };
  const toggleControl = () => {
    setShowControl((prev) => !prev);
  };

  useEffect(() => {
    if (playerRef.current) {
      axios
        .post(
          reqs.GET_CLASS_TIME,
          { courseId: courseId, classId: classId },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.succeed) {
            const currTime = res.data.currentTime;
            currentTimeRef.current = currTime;
            prevSavedTimeRef.current = currTime;
            setLastSavedDuration(currTime);
            setLockedTimeDuration(currTime + 20);
            if (currTime > 10) {
              setCurrentTime(currTime);
              playerRef.current.seekTo(currTime, true);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    //get the current last played duration from server
  }, [courseId, classId, videoId, playerRef.current]);

  // console.log(lastSavedDuration, lockedTimeDuration, currentTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // console.log(currentTimeRef.current, prevSavedTimeRef.current);
      if (currentTimeRef.current > prevSavedTimeRef.current) {
        const dataToSend = {
          lockedStartTime: lastSavedDuration,
          currentTime: currentTimeRef.current,
          classId: classId,
          courseId: courseId,
        };
        // console.log('running');

        // prevSavedTimeRef.current = currentTimeRef.current;
        // setLastSavedDuration(currentTimeRef.current);

        axios
          .put(reqs.UPDATE_CLASS_TIME, dataToSend, { withCredentials: true })
          .then((res) => {
            if (res.data.succeed) {
              setLastSavedDuration(res.data.currentTime);
              prevSavedTimeRef.current = res.data.currentTime;
            }
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    currentTimeRef.current = currentTime;
    // if (currentTime > prevSavedTimeRef.current) {
    //   let extraTime = 20;
    //   if (duration - currentTime < 20) {
    //     extraTime = duration - currentTime;
    //   }
    //   setLockedTimeDuration(currentTime + extraTime);
    // }

    if (lockedTimeDuration > -1 && duration) {
      // console.log(((duration - lastSavedDuration) / duration) * 100);

      if (((duration - lastSavedDuration) / duration) * 100 < 4) {
        if (doneReqCount < 1) {
          // console.log(classId, courseId);
          setIsDoneReqCount((doneReqCount) => doneReqCount + 1);
          const vidIdObj = localStorage.getItem('cp')
            ? JSON.parse(localStorage.getItem('cp'))
            : '';
          // console.log(currentplVid, classId);
          if (vidIdObj && vidIdObj.currentPlVidId) {
            const currentplVid = vidIdObj.currentPlVidId - 300;
            const nextClassId = vidIdObj.nextClassId
              ? vidIdObj.nextClassId - 450
              : null;
            // console.log(currentplVid, classId, nextClassId);

            // if (currentplVid === classId) {
            axios
              .put(
                reqs.UPDATE_DONE_CLASS,
                {
                  courseId,
                  nextClassId: nextClassId,
                  currentClassId: classId,
                },
                { withCredentials: true }
              )
              .then((res) => {
                if (res.data.succeed) {
                  localStorage.removeItem('cp');
                }
              })
              .catch((err) => {
                console.log(err);
              });
            // }
          }
        }
      }
    }
  }, [duration, currentTime, lastSavedDuration, lockedTimeDuration]);

  useEffect(() => {
    // Load the YouTube API script
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // Define functions for YouTube API callbacks
    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      delete window.onYouTubeIframeAPIReady;
      playerRef.current?.removeEventListener('contextmenu', handlecontext);
      window.removeEventListener('contextmenu', handlecontext);
      window.removeEventListener('keydown', handlecontext);
    };
  }, [videoId]);

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
    playerRef.current?.addEventListener('contextmenu', handlecontext);
    window.addEventListener('contextmenu', handlecontext);
    window.addEventListener('keydown', handlecontext);
  };
  const handlecontext = (e) => {
    e.preventDefault();
    return;
  };
  const pauseVideo = () => {
    if (playerRef.current) playerRef.current?.pauseVideo();
  };
  const playVideo = () => {
    // console.log(playerRef);

    if (playerRef.current) playerRef.current?.playVideo();
  };
  const onPlayerReady = (event) => {
    // You can perform actions when the player is ready
    // For example, you can play the video:
    let tit = event.target.videoTitle;
    let dur = event.target.getDuration();
    let customTitle = localStorage.getItem('customTitle');
    setTitle(customTitle ? customTitle : 'Record Class');
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
    const newTime = parseFloat(e);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current?.seekTo(newTime, true);
      if (!isPlaying) {
        pauseVideo();
        setIsPlaying(false);
      }
    }
  };
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current?.setPlaybackRate(newSpeed, true);
    }
    showSpeed();
  };
  const handleQualityChange = (newSpeed) => {
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
        className={`custom-controls p-4 flex justify-between items-center transition-transform md:hover:opacity-100 md:opacity-40 ${
          !showControl
            ? 'delay-500 translate-y-full md:translate-y-0'
            : 'translate-y-0'
        } `}
        style={{
          zIndex: '500',
        }}
      >
        {/* duration shower */}
        <div
          className='text-sm select-none p-2 flex items-center justify-center rounded-md gap-3'
          style={{
            backgroundColor: '#0872fd',
          }}
        >
          <PPButton
            Click={togglePlay}
            isPlaying={isPlaying}
            pauseVideo={pauseVideo}
            playVideo={playVideo}
          />
          <span>
            {`${convertTime(currentTime).m}:${convertTime(currentTime).s}`}
          </span>
          <span>{'/'}</span>
          <span>{`${convertTime(duration).m}:${convertTime(duration).s}`}</span>
        </div>
        <ProgessBar
          currentTime={currentTime}
          duration={duration}
          handleSeekChange={handleSeekChange}
          lockedStartTime={lastSavedDuration} //locakedsavedData represents the current state of the lastsavedData....for user efficiency only
          savedIndicatorTime={lastSavedDuration}
        />
        <div className='flex gap-4 items-center justify-evenly'>
          {/* forward of backward */}

          <div className='text-sm flex gap-3 justify-center'>
            <button onClick={backwardVideo}>
              <FaBackward />
            </button>
            <button onClick={forwardVideo}>
              <FaForward />
            </button>
          </div>
          {/* other controller vidSetting*/}
          <div className='flex gap-1'>
            {/* speed control */}
            <div className='relative'>
              <button className='text-xs w-fit' onClick={showSpeed}>
                Speed
              </button>
              <ul onClick={showSpeed} className='absolute left-2'>
                {sspeed &&
                  speeds.map((ele, id) => {
                    return (
                      <li
                        className={`speed ${
                          speed === ele && 'bg-blue-700 text-white'
                        }`}
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
            <div className='relative hidden'>
              <button className='w-fit text-xs' onClick={showQuality}>
                Quality
                <ul className='absolute left-2' onClick={showQuality}>
                  {squality &&
                    qualities.map((ele, id) => {
                      return (
                        <li
                          className='speed'
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
    speed,
    showControl,
    duration,
    currentTime,
    convertTime,
    togglePlay,
    isPlaying,
    handleSeekChange,
    lastSavedDuration,
  ]);

  return (
    <div
      className={`video-container`}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          e.key === 'Tab'
        ) {
          e.preventDefault();
        }
      }}
      onKeyDownCapture={(e) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          e.key === 'Tab'
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
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.code === 'I') ||
            e.key === 'Tab'
          ) {
            e.preventDefault();
          }
        }}
      />
      {/* video default control blocker */}
      <div
        className='blockbefore transition'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: !isPlaying ? '#1116' : '#0000',
          zIndex: '10',
          pointerEvents: 'all',
        }}
        onClick={toggleControl}
      />
      <div
        className={`centerController ${
          !showControl ? (!isPlaying ? 'active' : 'hide') : 'active'
        } `}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '20',
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
        className='customHeader transition-opacity duration-100 ease-out'
        style={{
          zIndex: '1000',
          background: isPlaying ? '#fff1' : '',
          opacity: isPlaying ? '0.5' : '1',
          transitionProperty: 'background',
          transitionDelay: '300ms',
        }}
      >
        <p
          className={`transition-colors pl-3 duration-300 delay-500 ${
            isPlaying ? 'text-transparent' : ''
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
// const ProgessBar = ({ currentTime = 0, duration = 1, handleSeekChange }) => {
//   return (
//     <>
//       <label
//         className='w-full h-1 rounded-full bg-blue-500/50 hover:bg-blue-400/60 transition-colors absolute cursor-pointer -top-1 left-0 hidden'
//         htmlFor='vidRange'
//         onClick={(e) => {
//           const T = e.pageX;
//           const B = window?.innerWidth;
//           handleSeekChange((T / B) * duration);
//         }}
//       >
//         <span
//           className={`absolute w-full h-full left-0 top-0 bg-white rounded-full shadow shadow-blue-200 pointer-events-none`}
//           style={{
//             transform: `translateX(${(currentTime / duration) * 100 - 100}%)`,
//           }}
//         ></span>
//       </label>
//       <input
//         className='w-full h-1 rounded-full bg-blue-500/50 hover:bg-blue-400/60 transition-colors absolute cursor-pointer -top-1 left-0'
//         type='range'
//         name='vidRange'
//         min={0}
//         max={duration ? duration : 0}
//         step={0.5}
//         value={currentTime ? currentTime : 0}
//         onChange={(e) => handleSeekChange(e.target.value)}
//       />
//     </>
//   );
// };

const ProgessBar = ({
  currentTime = 0,
  duration = 1,
  handleSeekChange,
  lockedStartTime,
  savedIndicatorTime,
}) => {
  const handleClick = (e) => {
    const progressBar = e.target;
    const { left, width } = progressBar.getBoundingClientRect();
    const clickX = e.clientX - left;
    const newTime = (clickX / width) * duration;

    // Allow seeking only if newTime is before the locked area
    if (newTime < lockedStartTime + 10) {
      handleSeekChange(newTime);
    }
  };

  const handleContinuousChange = (e) => {
    const newTime = e.target.value;

    // Allow seeking only if newTime is before the locked area
    if (newTime < lockedStartTime + 10) {
      handleSeekChange(newTime);
    }
  };

  return (
    <>
      <label
        className='w-full h-1 rounded-full z-30 bg-blue-500/50 hover:bg-blue-400/60 transition-colors absolute cursor-pointer -top-1 left-0 hidden'
        htmlFor='vidRange'
        onClick={handleClick} // Handle click to seek
      >
        <span
          className={`absolute w-full h-full left-0 top-0 bg-white rounded-full shadow shadow-blue-200 pointer-events-none`}
          style={{
            transform: `translateX(${(currentTime / duration) * 100 - 100}%)`,
          }}
        ></span>
      </label>
      <input
        className='w-full h-1 rounded-full bg-blue-500/50 -z-10 hover:bg-blue-400/60 transition-colors absolute cursor-pointer -top-1 left-0'
        type='range'
        name='vidRange'
        min={0}
        max={duration}
        step={0.5}
        value={currentTime}
        onClick={handleClick}
        onChange={(e) => {
          // if (currentTime < lockedStartTime) handleSeekChange(e.target.value);
          handleContinuousChange(e);
        }}
      />
      {/* Create a visual representation of the locked area */}
      <div
        className='absolute -z-10 bg-opacity-40 bg-black h-1.5 rounded-full'
        style={{
          left: `${(lockedStartTime / duration) * 100 + 2}%`, // Start of locked area
          width: `${100 - (lockedStartTime / duration) * 100}%`, // Width of locked area to end
          top: '-12%',
        }}
      />
    </>
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
      className='fixed z-50 top-5 right-5 bg-white grid place-content-center'
      onClick={() => {
        window.history.back();
      }}
    >
      <MdClose color='white' />
    </button>
  );
};
