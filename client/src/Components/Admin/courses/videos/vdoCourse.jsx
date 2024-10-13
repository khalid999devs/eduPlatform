import React, { useEffect, useRef, useState } from 'react';
import { MdVideoLibrary } from 'react-icons/md';
import { addClass } from '../../../../axios/global';

const VdoUpload = ({
  id,
  setAddClassState,
  prevClassId,
  folders,
  recorderClassData,
  classData,
}) => {
  const [rcrdData, setRcd] = useState({
    videoURL: '',
    videoTitle: '',
    videoLength: 30,
    desc: '',
    folder: '',
  });
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // console.log(classData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recorderClassData) {
      if (rcrdData.videoURL.length == 0) alert('PLease provide the link');
      else {
        let prevId = null;
        let classUnlockDefault = null;

        if (classData && classData[classData.length - 1]) {
          let dataobj = classData[classData.length - 1];
          if (
            rcrdData.folder === '' ||
            rcrdData.folder === 'None' ||
            rcrdData.folder === null ||
            !folders.includes(rcrdData.folder)
          ) {
            // console.log(dataobj);

            prevId =
              dataobj.id ||
              Object.values(dataobj)[0][Object.values(dataobj)[0].length - 1]
                .id;
            if (rcrdData.folder && !folders.includes(rcrdData.folder)) {
              classUnlockDefault = true;
            }
          } else {
            let folderObj = { id: -1 };

            recorderClassData.forEach((item) => {
              if (item.folder === rcrdData.folder) {
                if (item.id > folderObj.id) folderObj = item;
              }
            });

            prevId = folderObj.id;
          }
        }
        // console.log(rcrdData, prevId);

        addClass(
          id,
          {
            ...rcrdData,
            folder:
              rcrdData.folder === 'None' || !rcrdData.folder
                ? null
                : rcrdData.folder,
            classUnlockDefault,
          },
          prevId,
          setAddClassState
        );
      }
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='form-container  flex justify-center items-start flex-wrap mb-16 pt-16 dark:text-white'>
      {/* recorded class */}
      <div className=' p-3 mb-10'>
        <h1 className='text-center text-darkText font-semibold text-2xl mb-6'>
          Recorded class{' '}
          <MdVideoLibrary className=' inline-block text-lime-600 ' />{' '}
        </h1>
        <form className='w-full max-w-lg px-3' onSubmit={handleSubmit}>
          <div className='w-full flex flex-wrap mb-2'>
            {/* class title */}
            <div className='w-full mb-6'>
              <label
                className='flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='title'
              >
                Title
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='title'
                type='text'
                value={rcrdData.videoTitle}
                placeholder='Enter the title'
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, videoTitle: e.target.value }));
                }}
              />
            </div>

            {/* Folder */}
            <div className='w-full mb-6 relative' ref={dropdownRef}>
              <label
                className='flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='folder'
              >
                Folder
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='folder'
                type='text'
                value={rcrdData.folder}
                placeholder='folder name'
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, folder: e.target.value }));
                }}
                onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
              />
              {isDropdownVisible && (
                <div
                  className={`p-3 grid gap-1 bg-white absolute top-[90%] w-full h-auto left-0`}
                >
                  <p
                    className='text-md px-3 py-2 bg-slate-300 cursor-pointer hover:bg-slate-500 text-onPrimary-main transition-all duration-300 hover:text-white rounded-md'
                    onClick={() => {
                      setRcd((pre) => ({ ...pre, folder: 'None' }));
                      setDropdownVisible(false); // Hide dropdown after selection
                    }}
                  >
                    None
                  </p>
                  {folders?.map((item, i) => (
                    <p
                      key={i}
                      className='text-md px-3 py-2 bg-slate-300 cursor-pointer hover:bg-slate-500 text-onPrimary-main transition-all duration-300 hover:text-white rounded-md'
                      onClick={() => {
                        setRcd((pre) => ({ ...pre, folder: item }));
                        setDropdownVisible(false); // Hide dropdown after selection
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* class link */}
            <div className='w-full mb-6'>
              <label
                className='flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='record'
              >
                Class link
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='record'
                type='text'
                value={rcrdData.videoURL}
                placeholder='Class link'
                required
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, videoURL: e.target.value }));
                }}
              />
            </div>
            {/* class description */}
            <div className='w-full mb-6'>
              <label
                className='flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='desc'
              >
                Description
              </label>
              <textarea
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 row-span-3 resize-none'
                id='desc'
                type='text'
                rows={5}
                value={rcrdData.desc}
                placeholder='Class link'
                onChange={(e) => {
                  setRcd((pre) => ({ ...pre, desc: e.target.value }));
                }}
              />
            </div>
          </div>

          <button
            type='submit'
            className=' text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VdoUpload;
