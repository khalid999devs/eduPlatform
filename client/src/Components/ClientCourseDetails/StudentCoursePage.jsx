import {
  AiFillExperiment,
  AiFillPlayCircle,
  AiFillWechat,
  AiOutlineSchedule,
} from 'react-icons/ai';
import { PiNotebook } from 'react-icons/pi';
import ZoomLink from './live/LivePage';
import ExamPage from './exams/ExamPage';
import Notes from './notes/note';
import { useReducer } from 'react';
import ChatBox from './Discussion/chat';
import RecordVideo from './Records/Record';
const StudentCoursePage = ({ courseInfo = {} }) => {
  const [state, dispatch] = useReducer(reducer, 'details');
  function reducer(state, action) {
    switch (action.type) {
      case action.payload:
        return action.payload;
      default:
        return state;
    }
  }
  return (
    <div className={`left-side ${state == 'chat' ? 'h-[75vh] mb-10' : ''}`}>
      <nav
        className='bg-primary-main rounded-b-lg p-2 border border-t-transparent border-onPrimary-main shadow-lg shadow-onPrimary-main/20 my-8
      '
      >
        <ul className='capitalize flex gap-5 justify-center'>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                state == 'details' ? 'bg-secondary-main' : ''
              }`}
              onClick={() => {
                dispatch({ type: 'details', payload: 'details' });
              }}
            >
              <span className='hidden md:inline-block'>Details</span>{' '}
              <PiNotebook className='text-lg' />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                state == 'record' ? 'bg-secondary-main' : ''
              }`}
              onClick={() => {
                dispatch({ type: 'record', payload: 'record' });
              }}
            >
              <span className='hidden md:inline-block'>record</span>{' '}
              <AiFillPlayCircle className='text-lg' />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                state == 'exam' ? 'bg-secondary-main' : ''
              }`}
              onClick={() => {
                dispatch({ type: 'exam', payload: 'exam' });
              }}
            >
              <span className='hidden md:inline-block'>Exam</span>{' '}
              <AiFillExperiment className='text-lg' />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                state == 'chat' ? 'bg-secondary-main' : ''
              }`}
              onClick={() => {
                dispatch({ type: 'chat', payload: 'chat' });
              }}
            >
              <span className='hidden md:inline-block'>Discussion</span>{' '}
              <AiFillWechat className='text-lg' />
            </button>
          </li>
        </ul>
      </nav>
      {state == 'details' && (
        <div>
          {/* course title........... */}
          <h1 className='text-left text-4xl font-bold mb-10 '>
            {courseInfo.title}
          </h1>
          {/* course description- long.... */}
          <p className='text-left mb-10'>{courseInfo.desc}</p>
          {/* schedule section */}
          <div className='flex flex-col gap-6 my-16'>
            <h4 className=' text-left text-xl border-l-4 border-secondary-dark px-5  flex items-center'>
              <AiOutlineSchedule className='inline-block text-4xl text-secondary-dark mr-5' />
              {/* this scehdule section is dynamic ................*/}
              Schedule: {courseInfo.schedule}
            </h4>
          </div>
          <div>{<ZoomLink />}</div>
          {/* course component section */}
          <div className=''>
            <h1 className='font-bold text-left text-4xl text-blue-900 mb-5'>
              Course components
            </h1>{' '}
            <hr className='mb-10 ' />
            <div className='border-gray-700 bg-onPrimary-main text-primary-main rounded-lg p-5 mb-10 flex flex-col gap-10'>
              {/* <ZoomLink /> */}
              {/* <hr /> */}
              {/* <ExamLinks /> */}

              <Notes notes={courseInfo?.resources} />
            </div>
          </div>
        </div>
      )}
      {state == 'record' && (
        <RecordVideo rcdClass={courseInfo?.recordedclasses} />
      )}
      {state == 'chat' && <ChatBox courseId={courseInfo?.id} isAdmin={false} />}
      {state == 'exam' && (
        <div className='p-5'>
          <ExamPage cid={courseInfo?.id} />
        </div>
      )}
    </div>
  );
};

export default StudentCoursePage;
