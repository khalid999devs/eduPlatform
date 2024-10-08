import React, { useEffect, useState } from 'react';
import VdoUpload from './videos/vdoCourse';
import Video from './videos/video';
import { useParams } from 'react-router-dom';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { MdFileUpload, MdInfo, MdStickyNote2 } from 'react-icons/md';
import { FcDatabase } from 'react-icons/fc';
import { HiChevronRight } from 'react-icons/hi2';
import ValuedInput from '../../Form/ValuedInput';

import {
  addResources,
  adminFCourse,
  updateCourse,
} from '../../../axios/global';
import reqs, { reqImgWrapper, reqPdfWrapper } from '../../../assets/requests';

import axios from 'axios';
import Exam from './exams/Exam';
import RecordedClass from './videos/RecordedClass';
function EachCourse() {
  const { id } = useParams();
  const { currentTab, render } = tabSwitcher();
  const [data, setData] = useState({});
  const [upImg, setUpImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [zoomInfo, setZoomInfo] = useState({
    zoomId: '',
    zoomPass: '',
    zoomLink: '',
  });
  const [fetchTrigger, setFetchTrigger] = useState(false);

  //image handler to update image
  const handleImg = (e) => {
    setUpImg(e.target.files[0]);
  };
  useEffect(() => {
    adminFCourse(id, setData);
  }, [id, fetchTrigger]);
  // update image
  const updateImage = async () => {
    const imgData = new FormData();
    imgData.append('courseId', data?.id);
    imgData.append('title', data?.title);
    imgData.append('courses', upImg);
    try {
      axios
        .put(reqs.UPDATE_IMAGE, imgData, { withCredentials: true })
        .then((res) => {
          alert(res.data.msg);
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.classInfo?.zoomId) {
      setZoomInfo((zoomInfo) => ({ ...zoomInfo, ...data.classInfo }));
    }
  }, [data]);
  const handleZoomInfoChange = (e) => {
    setZoomInfo((zoomInfo) => ({
      ...zoomInfo,
      [e.target.name]: e.target.value,
    }));
  };

  //first time fetch data
  useEffect(() => {
    setImgSrc(reqImgWrapper(data?.image));
    if (upImg) setImgSrc(URL.createObjectURL(upImg));
  }, [data?.image, upImg]);

  return (
    <div className='w-full h-full p-5'>
      {/* course id */}
      <h2 className=' text-center font-semibold capitalize mb-10 text-2xl sticky -top-5 bg-slate-100 backdrop-blur px-10 z-10 border-2 border-transparent border-b-black shadow-xl shadow-trans_bluish/20'>
        course Title: {data?.title}
      </h2>
      <div>{render}</div>
      {/* course basic info */}
      {currentTab == 'info' && (
        <div className='text-left w-4/5 mx-auto' id='info'>
          <h1 className='text-center text-darkText font-semibold text-2xl mb-6'>
            Course Info <MdInfo className=' inline-block text-purple-600 ' />
          </h1>

          {/* zoom infos */}
          <div className='max-w-[300px] w-full m-auto my-3 grid gap-2 p-6 shadow-md rounded-lg'>
            <h2 className='text-[.95rem] font-semibold text-secondary-dark mb-1'>
              Zoom Informations:
            </h2>
            <div className='grid gap-3'>
              <ValuedInput
                containerClasses={'!gap-1'}
                label={'Meeting ID'}
                inputProps={{
                  value: zoomInfo.zoomId,
                  onChange: handleZoomInfoChange,
                  placeholder: '123 456 78...',
                  name: 'zoomId',
                }}
              />
              <ValuedInput
                containerClasses={'!gap-1'}
                label={'Meeting Pass'}
                inputProps={{
                  value: zoomInfo.zoomPass,
                  onChange: handleZoomInfoChange,
                  placeholder: 'SJfw34',
                  name: 'zoomPass',
                }}
              />
              <ValuedInput
                containerClasses={'!gap-1'}
                label={'Invite Link'}
                inputProps={{
                  value: zoomInfo.zoomLink,
                  onChange: handleZoomInfoChange,
                  placeholder: 'https://zoom.us/j/5551112222',
                  name: 'zoomLink',
                }}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 items-start gap-2 w-4/5 mt-8 mx-auto mb-5 text-sm'>
            <section className='grid'>
              <label className='capitalize'>title:</label>
              <input
                className='adminInputBox'
                value={data?.title || ''}
                type='text'
                onChange={(e) =>
                  setData((pre) => ({ ...pre, title: e.target.value }))
                }
              />
            </section>
            <section className='grid'>
              <label className='capitalize'>price:</label>
              <input
                className='adminInputBox'
                value={data?.price || ''}
                type='number'
                onChange={(e) =>
                  setData((pre) => ({ ...pre, price: e.target.value }))
                }
              />
            </section>
            <section className='grid'>
              <label className='capitalize'>tags:</label>
              <input
                className='adminInputBox'
                value={data?.tags || ''}
                onChange={(e) =>
                  setData((pre) => ({ ...pre, tags: e.target.value }))
                }
              />
            </section>
            <section className='grid'>
              <label className='capitalize'>description:</label>
              <textarea
                className='adminInputBox resize-none'
                rows={4}
                value={data?.description || ''}
                type='text'
                onChange={(e) =>
                  setData((pre) => ({ ...pre, description: e.target.value }))
                }
              />
            </section>
            <section className='grid'>
              <label className='capitalize'>Schedule:</label>
              <input
                className='adminInputBox'
                value={data?.schedule || ''}
                onChange={(e) =>
                  setData((pre) => ({ ...pre, schedule: e.target.value }))
                }
              />
            </section>
            <PrimaryButton
              text={'update'}
              classes={'bg-sky-500 text-white px-4 py-2 '}
              textClasses={'rounded-md'}
              type={'submit'}
              onClick={() =>
                updateCourse(data.id, data, zoomInfo, setFetchTrigger)
              }
            />
          </div>
          <div className='relative w-max mx-auto'>
            {imgSrc && (
              <img
                className='aspect-video'
                src={imgSrc}
                alt='image'
                width={350}
              />
            )}
            <input
              hidden
              type='file'
              name='upImg'
              id='upImg'
              accept='image/jpg,image/png,image/jpeg'
              onChange={handleImg}
            />
            <label
              className='text-center mx-auto w-full bg-sky-400 text-blue-900 flex items-center justify-center py-2 hover:bg-blue-900 hover:text-sky-200 font-semibold transition-colors duration-300 cursor-pointer'
              htmlFor='upImg'
            >
              <MdFileUpload /> Change image
            </label>
            {upImg && (
              <button
                className='bg-green-400 font-bold capitalize w-full text-center py-2'
                onClick={updateImage}
              >
                update
              </button>
            )}
          </div>
        </div>
      )}
      {/* map and upload recorded video */}
      {currentTab == 'record' && (
        <RecordedClass courseId={id} data={data} setData={setData} />
      )}

      {/* exam section */}
      {currentTab == 'exam' && (
        <div className='flex flex-col'>
          <h1 className='text-center text-darkText font-semibold text-2xl mb-6'>
            Exam Board{' '}
            <MdStickyNote2 className=' inline-block text-purple-600 ' />
          </h1>
          <Exam />
        </div>
      )}
      {/* course resources */}
      {currentTab == 'resource' && (
        <div>
          <h1 className='text-center text-darkText font-semibold text-2xl py-2'>
            Course Resources{' '}
            <FcDatabase className=' inline-block text-purple-600 ' />
          </h1>
          <AddResource courseId={id} />
          {data?.resources?.length ? (
            <div className='grid grid-cols-2 gap-4 justify-center items-start border-2 p-2'>
              {data?.resources?.map((ele, eid) => {
                return <Resource ele={ele} key={eid} />;
              })}
            </div>
          ) : (
            <>
              <p className='scale-150 text-red-500 text-center'>
                No Resource found
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export const tabSwitcher = () => {
  const tabs = ['info', 'record', 'exam', 'resource'];
  const localTab = JSON.parse(localStorage.getItem('adminCourseTab'));
  const [currentTab, setCurTab] = useState(localStorage?.value);
  const curTime = new Date();
  useEffect(() => {
    if (localTab?.expireDate > curTime.getTime())
      if (localTab?.value?.length > 0) {
        setCurTab(localTab?.value);
      } else setCurTab(tabs[0]);
    else localStorage.removeItem('adminCourseTab');
  }, [localTab]);

  function handleTab(e) {
    setCurTab(e);
    let result = {
      value: e,
      expireDate: localTab?.expireDate
        ? localTab?.expireDate
        : curTime.getTime() + 86400000,
    };
    localStorage.setItem('adminCourseTab', JSON.stringify(result));
  }
  return {
    currentTab,
    render: (
      <div className='flex items-center justify-center gap-2 py-4 my-4 rounded shadow-gray-600/20 shadow-xl  '>
        {tabs.map((tab, id) => {
          return (
            <button
              className={`mx-5 px-4 py-2  font-semibold hover:transition-colors cursor-pointer ${
                tab == currentTab
                  ? 'bg-gradient-to-tr from-purple-500 to-purple-950/50 text-white'
                  : 'bg-yellow-300 text-black/80 hover:invert'
              } disabled:pointer-events-none`}
              disabled={currentTab == tab}
              type='button'
              key={id + tab}
              onClick={() => handleTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          );
        })}
      </div>
    ),
  };
};

//add resource component
const AddResource = ({ courseId }) => {
  const [data, setData] = useState({
    driveLink: [],
    Title: '',
    resourses: [],
    desc: '',
  });

  function handleChange(e) {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  function handleLinks(e) {
    setData((pre) => ({
      ...pre,
      [e.target.name]: JSON.stringify(e.target.value?.split(',')),
    }));
  }
  return (
    <div className='m-5 mx-auto w-4/5 ring-2 ring-white rounded-lg p-2'>
      <h2 className='text-center mx-auto w-fit text-purple-500 px-5 py-2 underline decoration-double text-lg my-4'>
        Add Resources
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData();
          const fData = {
            Title: data.Title,
            desc: data.desc,
            driveLink: data.driveLink,
          };
          Object.keys(fData).forEach((key) => {
            form.append(`${key}`, fData[key]);
          });
          for (let i = 0; i < data.resourses.length; i++) {
            const element = data.resourses[i];
            form.append('resources', element);
          }
          if (data.driveLink.length !== 0 || data.resourses.length !== 0) {
            addResources(courseId, form);
          }
        }}
      >
        <div className='grid grid-cols-2 gap-2 justify-between items-start'>
          {/* title */}
          <section className='p-0 m-2 w-auto bg-transparent relative border'>
            <label
              htmlFor='title'
              className={`absolute transition-all duration-200 ${
                data.Title.length == 0
                  ? 'text-base top-1/2 left-2 -translate-y-1/2 text-gray-400'
                  : 'text-sm -top-2 left-4 text-blue-400'
              } h-fit w-fit bg-white`}
            >
              Title
            </label>
            <input
              className={`outline-none w-full border-0 px-1 py-4 text-base ring-1 hover:ring-blue-500 bg-white focus:rounded-md focus-within:rounded-md focus-within:ring-blue-500 transition-all duration-300 ${
                data.Title.length == 0
                  ? 'ring-black'
                  : 'ring-blue-500 rounded-md'
              }`}
              type='text'
              name='Title'
              id='title'
              value={data.Title}
              required
              onChange={handleChange}
            />
          </section>
          {/* drive link */}
          <section className='p-0 m-2 w-auto bg-transparent relative border'>
            <label
              htmlFor='link'
              className={`absolute transition-all duration-200 ${
                data.driveLink.length == 0
                  ? 'text-base top-1/2 left-2 -translate-y-1/2 text-gray-400'
                  : 'text-sm -top-2 left-4 text-blue-400'
              } h-fit w-fit bg-white`}
            >
              Drive Link
            </label>
            <input
              className={`outline-none w-full border-0 px-1 py-4 text-base ring-1 hover:ring-blue-500 bg-white focus:rounded-md focus-within:rounded-md focus-within:ring-blue-500 transition-all duration-300 ${
                data.driveLink.length == 0
                  ? 'ring-black'
                  : 'ring-blue-500 rounded-md'
              }`}
              type='url'
              name='driveLink'
              id='link'
              onChange={handleLinks}
            />
          </section>
          {/* description */}
          <section className='p-0 m-2 w-auto bg-transparent relative border'>
            <label
              htmlFor='desc'
              className={`absolute transition-all duration-200 ${
                data.desc.length == 0
                  ? 'text-base top-1/2 left-2 -translate-y-1/2 text-gray-400'
                  : 'text-sm -top-2 left-4 text-blue-400'
              } h-fit w-fit bg-white`}
            >
              Description
            </label>
            <input
              className={`outline-none w-full border-0 px-1 py-4 text-base ring-1 hover:ring-blue-500 bg-white focus:rounded-md focus-within:rounded-md focus-within:ring-blue-500 transition-all duration-300 ${
                data.desc.length == 0
                  ? 'ring-black'
                  : 'ring-blue-500 rounded-md'
              }`}
              type='text'
              name='desc'
              id='desc'
              value={data.desc}
              required
              onChange={handleChange}
            />
          </section>
          {/* resources */}
          <section className='p-0 m-2 w-auto bg-transparent relative border'>
            <input
              className={`outline-none w-full border-0 px-1 py-4 text-base ring-1 hover:ring-blue-500 bg-white focus:rounded-md focus-within:rounded-md focus-within:ring-blue-500 transition-all duration-300 ${
                data.resourses.length == 0
                  ? 'ring-black'
                  : 'ring-blue-500 rounded-md'
              }`}
              id='res'
              name='resources'
              type='file'
              multiple={true}
              onChange={(e) =>
                setData((pre) => ({
                  ...pre,
                  resourses: [...e.target.files],
                }))
              }
            />
          </section>
        </div>
        <PrimaryButton
          text={'Add'}
          classes={'bg-blue-400 text-white px-4 py-2 hover:bg-blue-500'}
          textClasses={'rounded-md'}
          type={'submit'}
        />
      </form>
    </div>
  );
};

// show resource component
const Resource = ({ ele }) => {
  const [drop, setDrop] = useState(false);
  const driveLinks = ele?.driveLink ? JSON.parse(ele?.driveLink) : [];
  const filesUrl = ele?.filesUrl ? ele?.filesUrl : [];

  return (
    <section
      key={ele?.id}
      className='text-sm grid items-start justify-normal gap-2 m-2 select-none ring-1 ring-black !break-all'
    >
      <p
        className='flex gap-1 font-bold hover:underline cursor-default'
        onClick={() => {
          setDrop((pre) => !pre);
        }}
      >
        <HiChevronRight
          className={`font-bold text-lg transition-transform ${
            drop ? 'rotate-90' : 'rotate-0'
          }`}
        />{' '}
        {ele?.Title}
      </p>
      {/* files */}
      {drop && (
        <>
          <p className='pl-5 underline decoration-dotted'>Files: </p>
          {filesUrl?.length == 0 && (
            <p className='mx-14 text-red-600'>No files</p>
          )}
          {filesUrl?.length > 0 &&
            filesUrl?.map((val, uid) => {
              return (
                <a
                  key={`${val?.id}${uid}`}
                  className='underline mx-14 w-fit hover:text-rose-600'
                  href={`${reqPdfWrapper(val?.url)}`}
                  target='_blank'
                >
                  {val?.id}
                </a>
              );
            })}
        </>
      )}
      {/* drive links */}
      {drop && (
        <>
          <p className='pl-5 underline decoration-dotted'>Drive Links: </p>
          {driveLinks?.length == 0 && (
            <p className='mx-14 text-red-600'>No Links</p>
          )}
          {driveLinks?.map((val, uid) => {
            return (
              <a
                key={`${val}${uid}`}
                className='underline mx-14 w-fit hover:text-purple-700'
                href={val}
                target='_blank'
              >
                {val}
              </a>
            );
          })}
        </>
      )}
    </section>
  );
};
export default EachCourse;
