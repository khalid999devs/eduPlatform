import React, { useState, useRef, useEffect } from 'react';
import Video from './Video';
import { FaFolder } from 'react-icons/fa6';
import { BiSolidRightArrow } from 'react-icons/bi';
import { FaFolderOpen } from 'react-icons/fa6';

const Folder = ({ targetClientCourse, uid, vid, rcdClass, courseInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null); // To get the real height of the content

  // Use useEffect to handle automatic height adjustment
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = `0px`;
    }
  }, [isOpen]);

  return (
    <div className='my-4'>
      <div
        className={`flex gap-3 items-center px-6 w-full py-2 shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-inner border-b-[0.09px] border-opacity-10 border-b-onPrimary-light bg-slate-800 text-white rounded-md text-base text-center group cursor-pointer`}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div className='flex items-center gap-4'>
          <button
            className={`text-center border-primary-main h-8 w-8 flex items-center justify-center rounded-full mx-auto transition-colors text-md`}
            type='button'
          >
            <BiSolidRightArrow
              className={`${isOpen && 'rotate-90'} transition-all duration-200`}
            />
          </button>
          {!isOpen ? (
            <FaFolder className={`text-xl`} />
          ) : (
            <FaFolderOpen className='text-xl' />
          )}
        </div>

        <p className='my-2 font-medium'>{Object.keys(vid)[0]}:</p>
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300`}
        style={{ maxHeight: '0px' }} // Initial maxHeight to 0 when closed
      >
        <div className='h-fit'>
          {Object.values(vid)[0].map((item, key) => (
            <Video
              key={`{vid}=${item?.id}+${key}`}
              id={item.id}
              sl={key + 1}
              classes={`!rounded-none !bg-zinc-700`}
              link={item?.videoURL}
              currentPlVidId={targetClientCourse?.currentPlVidId}
              lockState={
                targetClientCourse?.redVidLockState[item.id] == 0 ||
                !courseInfo.isLockVidFeature
                  ? false
                  : true
              }
              doneState={
                targetClientCourse?.recVidDoneState[item.id] == 0 ? false : true
              }
              nextClassId={
                Object.values(vid)[0][key + 1]?.id ||
                (rcdClass[uid + 1]
                  ? rcdClass[uid + 1].id ||
                    Object.values(rcdClass[uid + 1])[0][0].id
                  : null)
              }
              title={item?.videoTitle}
              desc={item?.desc}
              courseId={courseInfo.id}
              isLockVidFeature={courseInfo.isLockVidFeature}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Folder;
