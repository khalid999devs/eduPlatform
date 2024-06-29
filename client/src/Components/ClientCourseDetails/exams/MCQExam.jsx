import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import {
  addStudentAns,
  getQuesClient,
  getSingleExamClient,
} from '../../../axios/global';

const MCQExam = () => {
  const { cid, examid } = useParams();
  const [exDetails, setExdetails] = useState({});
  const [questions, setques] = useState([]);
  const [stdAns, setAns] = useState([]);
  const [submition, setSubmition] = useState(false);
  // fetch questions
  useEffect(() => {
    getQuesClient(examid, 'question', setques);
    getSingleExamClient(cid, examid, setExdetails);
  }, []);

  const startTime = new Date(Number(exDetails?.examStartTime));
  const endTime = new Date(Number(exDetails?.examEndTime));

  const [time, settime] = useState(new Date());
  const [localDuration, setlocaldur] = useState(null);

  useEffect(() => {
    const loop = setInterval(() => {
      let newTime = new Date();
      settime(newTime);
    }, 1000);
    return () => clearInterval(loop);
  }, []);
  useEffect(() => {

    if (endTime.getTime() - time.getTime() > 0)
      setlocaldur(endTime.getTime() - time.getTime());
  }, [time]);
  useEffect(() => {
    if (questions.length > 0) {
      setAns(
        questions.map((e) => {
          return { questionId: e?.id, optionsId: [] };
        })
      );

    }

    function blockReload(event) {
      if (data?.length > 0 && !finish) {

        event?.preventDefault()

      }
    }
    window.addEventListener("beforeunload", blockReload);
    return () => {
      window.removeEventListener("beforeunload", blockReload);
    }
  }, [questions?.length]);

  useEffect(() => {
    if (localDuration !== null)
      if (localDuration <= 0) {
        handleSubmit();
      }
  }, [localDuration]);
  // console.log(questions);
  const OptionsMemo = ({ id, ques, stdAns, localDuration }) => {
    return (
      <ul className='my-1'>
        {ques?.quesOptions?.map((option, index) => {
          let fID = stdAns?.findIndex((ele) => ele?.questionId === ques?.id);
          let oID = stdAns[fID]?.optionsId?.findIndex(
            (opt) => option?.id === opt
          );
          return (
            <li
              key={`q${id}?ans${index}`}
              className={`flex items-center gap-2 space-y-1 cursor-pointer hover:bg-secondary-main rounded-md transition-colors p-1 touch-pan-left ${localDuration < 0 ? 'pointer-events-none' : ''
                }`}
              onClick={() => {
                if (
                  fID >= 0 &&
                  localDuration > 0 &&
                  stdAns[fID]?.optionsId?.findIndex(
                    (ele) => ele === option?.id
                  ) === -1
                )
                  stdAns[fID]?.optionsId?.push(option?.id);
              }}
            >
              <span
                className={`p-px text-black ring-black w-5 h-5 flex justify-center items-center ring-1 rounded-full ${stdAns[fID]?.optionsId?.includes(option?.id)
                  ? 'bg-secondary-main'
                  : 'bg-primary-main'
                  }`}
              >
                {index + 1}
              </span>
              <label
                className='block pointer-events-none'
                htmlFor={option + index}
              >
                {option?.title}
              </label>
            </li>
          );
        })}
      </ul>
    );
  };

  function handleSubmit(e) {
    e?.preventDefault();
    setSubmition(true);
    try {
      addStudentAns(
        {
          courseId: cid,
          examId: examid,
          answers: stdAns,
        },
        examid
      ).then(() => {
        setSubmition(false);
        window.location.assign('../../');
      });
    } catch (error) {
      setSubmition(false);
    }
  }

  return (
    <div className='p-4 rounded w-full my-32 mx-auto'>
      {/* submiting shadow page */}
      {submition && (
        <div className='bg-black/40 text-white font-bold text-3xl text-center fixed top-0 left-0 right-0 bottom-0 justify-center items-center'>
          <p className='relative top-1/2 -translate-y-1/2'>
            Exam Time over. Submiting your answers...
          </p>
        </div>
      )}
      {/*it will show remainder timer  */}
      <Timer durTime={localDuration} classes={'fixed top-20 right-5'} />{' '}
      <ExamInfo data={exDetails} startTime={startTime?.toLocaleTimeString()} endTime={endTime?.toLocaleTimeString()} examDur={endTime?.getTime() - startTime?.getTime()} />
      <h1 className='text-xl text-center font-bold my-4'>MCQ Exam</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((ques, id) => (
          <div
            key={id}
            className='bg-white w-5/6 mx-auto px-5 py-3 my-5 rounded-lg'
          >
            <h2 className='text-lg mt-5 font-semibold pointer-events-none select-none'>
              {id + 1}. {ques?.title}
            </h2>

            <OptionsMemo
              id={id}
              ques={ques}
              localDuration={localDuration}
              stdAns={stdAns}
            />
          </div>
        ))}
        {localDuration > 0 ? (
          <button
            className='bg-onPrimary-main ring ring-slate-500 rounded-sm text-primary-main px-4 py-2 text-base mt-5'
            type='submit'
          >
            Submit
          </button>
        ) : null}
      </form>
    </div>
  );
};
const ExamInfo = ({ data, startTime, endTime, examDur }) => {


  return (
    <div className='text-left px-5 py-2 bg-white'>
      <h2>Exam name: {data?.name}</h2>
      <h2>Exam topic: {data?.topic}</h2>
      <h2 className='font-semibold'>Total Mark: {data?.totalMarks}</h2>
      <h2>
        Start Time:{' '}
        {startTime}
      </h2>
      <h2>
        Finish Time:{' '}
        {endTime}
      </h2>

      <h2 className='font-semibold'>
        Total Duration: {duration(examDur).hh?.toString().padStart(2, 0)}:{duration(examDur).mm?.toString().padStart(2, 0)}:
        {duration(examDur).ss?.toString().padStart(2, 0)}
      </h2>
    </div>
  );
};

function duration(localDuration) {
  let x = Math.abs(localDuration > 0 ? localDuration : 0);

  x /= 1000;
  x = parseInt(x);

  return {
    hh: Math.floor(x / 3600),
    mm: Math.floor((x % 3600) / 60),
    ss: x % 60,
  };
}
export default MCQExam;
