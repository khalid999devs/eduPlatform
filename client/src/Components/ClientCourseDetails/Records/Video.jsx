import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { CiLock } from 'react-icons/ci';
import { CiUnlock } from 'react-icons/ci';
import { MdDone } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Video({
  sl,
  title = '',
  link = '',
  desc = '',
  courseId,
  id,
  lockState,
  currentPlVidId,
  isLockVidFeature,
  nextClassId,
  doneState,
  classes,
}) {
  const vid = link.split('/');
  const navigate = useNavigate();

  return (
    <div
      className={`grid grid-cols-[auto,1fr,auto] px-6 w-full gap items-center justify-between py-2 shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-inner border-b-[0.09px] border-opacity-10 border-b-onPrimary-light bg-slate-800 text-white rounded-md text-base text-center group ${
        isLockVidFeature
          ? lockState
            ? 'opacity-50 pointer-events-none'
            : 'opacity-100'
          : ''
      } ${classes}`}
    >
      <button
        className={`text-center border border-1 border-primary-main h-8 w-8 flex items-center justify-center rounded-full mx-auto transition-colors text-md ${
          !lockState ? 'text-white' : 'text-zinc-200'
        } ${doneState ? '!bg-green-600 text-white' : ''}`}
        type='button'
      >
        {doneState ? <MdDone /> : lockState ? <CiLock /> : <CiUnlock />}
      </button>

      <div>
        <p className='text-left text-sm pl-5'>{title || 'Class link'}</p>
      </div>

      {!lockState && (
        <div
          // href={`record/${
          //   vid[vid.length - 1]
          // }&courseId=${courseId}&classId=${id}`}
          className='flex items-center justify-center text-md pl-0.5 w-9 h-9 mx-auto bg-white text-onPrimary-main cursor-pointer duration-300 hover:bg-onPrimary-main hover:text-white transition-all border border-white rounded-full'
          title={title}
          onClick={() => {
            localStorage.setItem('customTitle', title);
            localStorage.setItem(
              'cp',
              JSON.stringify({
                nextClassId: nextClassId ? Number(nextClassId) + 450 : '',
                currentPlVidId: currentPlVidId
                  ? Number(currentPlVidId) + 300
                  : '',
              })
            );

            if (navigator.onLine) {
              window.open(
                `record/${
                  vid[vid.length - 1]
                }&courseId=${courseId}&classId=${id}`,
                '_self'
              );
            } else {
              navigate('/error?offline=1');
            }
          }}
        >
          <FaPlay />
        </div>
      )}
      {/* 
      <div className='text-left border-l-2 border-white m-2 w-auto p-2 hidden lg:block'>
        <p className='font-medium'>Description: </p>
        <p>
          {desc.split('\n').map((value) => {
            return (
              <React.Fragment key={`value_${value}`}>
                {' '}
                <span>{value}</span> <br />{' '}
              </React.Fragment>
            );
          })}
        </p>
      </div> */}
    </div>
  );
}

export default Video;
