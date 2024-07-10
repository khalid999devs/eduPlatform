import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FormInput } from '../input';
import PrimaryButton from '../../../Buttons/PrimaryButton';
import { FiEdit } from 'react-icons/fi';
import {
  addExam,
  addSingleQues,
  deleteExam,
  deleteQuestion,
  getExamAdmin,
  getSingleExamAdmin,
} from '../../../../axios/global';
import { reqImgWrapper } from '../../../../assets/requests';
const options = ['quiz', 'written']; // 'quiz+written'
const ansTypes = ['options', 'file'];

function Exam() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [examData, setExamData] = useState({
    name: '',
    topic: '',
    category: '',
    courseId: id,
    totalMarks: 0,
    examStartTime: '',
    examEndTime: '',
    examCreationTime: new Date().getTime(),
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setExamData((pre) => ({ ...pre, category: option }));
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setExamData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value.toString(),
    }));
  };

  useEffect(() => {
    getExamAdmin('all', setData, id);
    setExamData((pre) => ({ ...pre, courseId: id }));
  }, [id]);

  return (
    <div className='px-3 py-10 container mx-auto '>
      <form
        className='grid grid-cols-2'
        onSubmit={(e) => {
          e.preventDefault();

          const submitData = {
            ...examData,
            examCreationTime: Date.now(),
            examStartTime: new Date(examData.examStartTime).getTime(),
            examEndTime: new Date(examData.examEndTime).getTime(),
            courseId: Number(id),
          };
          // console.log(submitData);
          addExam(submitData, setData);
        }}
      >
        <FormInput
          title={'Name'}
          id={'name'}
          name={'name'}
          required
          type={'text'}
          value={examData.name}
          placeHolder={'Exam name'}
          handleChange={handleChange}
        />
        <FormInput
          title={'Topic'}
          id={'topic'}
          required
          name={'topic'}
          type={'text'}
          value={examData.topic}
          placeHolder={'Topic name'}
          handleChange={handleChange}
        />
        <div className='w-full px-3'>
          <label
            className='flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2'
            htmlFor={'cat'}
          >
            Exam Category
          </label>

          <SelectDropdown
            options={options}
            isOpen={isOpen}
            selectedOption={selectedOption}
            setIsOpen={setIsOpen}
            handleSelectOption={handleSelectOption}
          />
        </div>
        <FormInput
          title={'Total Marks'}
          id={'tmark'}
          required
          value={examData.totalMarks}
          name={'totalMarks'}
          type={'number'}
          handleChange={handleChange}
          placeHolder={'Enter Total Mark'}
          min={0}
        />
        <FormInput
          title={'Exam Start Time'}
          id={'est'}
          required
          value={examData.examStartTime}
          name={'examStartTime'}
          handleChange={handleChange}
          type={'datetime-local'}
        />
        <FormInput
          title={'Exam End Time'}
          id={'eet'}
          value={examData.examEndTime}
          required
          name={'examEndTime'}
          handleChange={handleChange}
          type={'datetime-local'}
        />
        <PrimaryButton
          type={'submit'}
          classes={'bg-blue-400 w-full min-w-fit mx-auto'}
          // disabled
          textClasses={'text-blue-800 font-semibold'}
          text={'Create'}
          icon={<FiEdit color='#0a0aff' />}
        />
      </form>

      <hr />
      <ExamLists data={data} id={id} setData={setData} />
    </div>
  );
}

export const SelectDropdown = ({
  options,
  isOpen,
  setIsOpen,
  selectedOption,
  handleSelectOption,
  disabled = false,
}) => {
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative w-full inline-block mb-4 ${
        disabled ? 'grayscale pointer-events-none' : ''
      }`}
    >
      <div className='flex w-full items-center '>
        <button
          onClick={handleToggleDropdown}
          type='button'
          disabled={disabled || false}
          className='bg-white border border-gray-300 px-4 py-2 rounded-md flex items-center space-x-2 focus:outline-none w-full justify-between'
        >
          <span className='uppercase'>
            {selectedOption || 'Select an option'}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg'>
          {/* Dropdown options */}
          <div className='p-1'>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`block rounded-md px-4 py-2 my-px text-gray-800 transition-colors hover:bg-blue-600 hover:text-white w-full text-left ${
                  selectedOption == option ? 'bg-blue-500 text-white' : ''
                }`}
                type='button'
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AddQuestion = ({ eid, category, startTime = 0 }) => {
  const currentTime = new Date();
  const [data, setData] = useState({ questions: [] });
  const [showQues, toggleQues] = useState(false);
  const [ques, setQues] = useState('');
  const [ansType, setAnsType] = useState(
    category === 'written' ? ansTypes[1] : ansTypes[0]
  );
  const [opt, setOpt] = useState([]);
  const [ans, setAns] = useState([]);
  const [mark, setMark] = useState('');
  const [files, setFiles] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const handleSelectOption = (option) => {
    setAnsType(option);
    setIsOpen(false);
  };
  useEffect(() => {
    if (category === 'written') {
      setAnsType(ansTypes[1]);
    }
  }, [category]);
  useEffect(() => {
    getSingleExamAdmin(setData, eid);
  }, [eid]);

  return (
    <>
      {startTime > currentTime.getTime() ? (
        <div>
          <h3 className='bg-sky-400 text-black px-2 py-1 my-2 w-3/5 mx-auto text-center shadow-xl shadow-sky-500/50'>
            Add question
          </h3>
          <form
            className='flex flex-col gap-1 w-full'
            onSubmit={(e) => {
              e.preventDefault();
              const quesOptions = opt.map((val, vid) => ({
                id: vid + 1,
                title: val,
              }));
              let isDataOk = true;
              const form = new FormData();
              const fData = {
                title: ques,
                quesOptions: JSON.stringify(quesOptions),
                examId: eid,
                mark: mark,
                category: null,
                ansType: ansType,
                answers: JSON.stringify(
                  Array.from(
                    new Set(
                      ans.map((item) => {
                        const ansId = quesOptions.find(
                          (op) => op.title === item
                        );
                        if (!ansId) {
                          alert(
                            `One of the question option and answer option [${item}] did not match. Re-enter the option values`
                          );
                          isDataOk = false;
                          return null;
                        }
                        return ansId.id;
                      })
                    )
                  )
                ),
              };
              if (!isDataOk) {
                return;
              }
              Object.keys(fData).forEach((key) => {
                form.append(`${key}`, fData[key]);
              });

              files.forEach((file) => {
                form.append('questions', file);
              });
              addSingleQues(form, toggleQues,setData);
            }}
          >
            {/* question title */}
            <section className='grid border p-2 rounded-md shadow space-y-2'>
              <label htmlFor='ques'>Question*: </label>
              <input
                className='p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none'
                id='ques'
                type='text'
                name='question'
                placeholder='Title'
                required
                value={ques}
                onChange={(e) => setQues(e.target.value)}
              />
              {/* <p className="text-xs flex flex-wrap break-words m-1">{ques}</p> */}
            </section>
            {/* question option */}
            <section
              className={`grid border p-2 rounded-md shadow space-y-2 ${
                category === 'written' ? 'hidden' : ''
              }`}
            >
              <label htmlFor='opt'>Options: </label>
              <input
                className='p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none'
                type='text'
                name='options'
                id='opt'
                required={ansType === 'options'}
                placeholder='Options'
                onChange={(e) => setOpt(e.target.value.split(','))}
              />
              <p className='text-xs flex flex-wrap break-words'>
                {opt.map((e, i) => {
                  return (
                    <span
                      key={`${e}${i}`}
                      className='m-1 p-1 rounded-sm bg-slate-200 text-black'
                    >
                      {e}
                    </span>
                  );
                })}
              </p>
            </section>
            {/* question answer */}
            <section
              className={`grid border p-2 rounded-md shadow space-y-2 ${
                category === 'written' ? 'hidden' : ''
              }`}
            >
              <label htmlFor='ans'>
                Answer:{' '}
                <span className='text-red-500 text-xs'>
                  *make sure answer includes in options
                </span>{' '}
              </label>
              <input
                className='p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none'
                type='text'
                name='answer'
                id='ans'
                placeholder='Answer'
                required={ansType === 'options'}
                onChange={(e) => setAns(e.target.value.split(','))}
              />
              <p className='text-xs flex flex-wrap break-words'>
                {ans.map((e, i) => {
                  return (
                    <span
                      key={`${e}${i}${i}`}
                      className='m-1 p-1 rounded-sm bg-slate-200 text-black'
                    >
                      {e}
                    </span>
                  );
                })}
              </p>
            </section>
            {/* question mark */}
            <section className='grid border p-2 rounded-md shadow space-y-2'>
              <label htmlFor='mark'>Mark*: </label>
              <input
                className='p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none'
                id='mark'
                type='number'
                name='mark'
                placeholder='Mark'
                required
                min={0}
                value={mark}
                onChange={(e) => setMark(e.target.value)}
              />
              {/* <p className="text-xs flex flex-wrap break-words m-1">{mark}</p> */}
            </section>
            {/* question type */}
            <section className='grid border p-2 rounded-md shadow space-y-2'>
              <label htmlFor='ansType'>Answer Type: </label>

              <SelectDropdown
                options={ansTypes}
                isOpen={isOpen}
                selectedOption={ansType}
                setIsOpen={setIsOpen}
                handleSelectOption={handleSelectOption}
                disabled={!(category === 'quiz+written')}
              />
            </section>
            {/* question photo */}
            <section className={`grid border p-2 rounded-md shadow space-y-2`}>
              <label htmlFor='files'>Question Images: </label>
              <input
                className='p-1 ring-1 ring-slate-700 border-none focus:outline-none outline-none'
                id='files'
                type='file'
                multiple
                name='imageFiles'
                placeholder='Question image'
                onChange={(e) => setFiles([...e.target.files])}
              />
              {/* <p className="text-xs flex flex-wrap break-words m-1">{files}</p> */}
            </section>

            <button
              className={
                'col-span-3 w-1/4 my-4 bg-purple-500 px-2 py-1 rounded-sm text-white hover:bg-purple-600'
              }
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      {/* show all question in current exam */}
      <button
        className='bg-rose-500 px-2 py-1 rounded-sm text-white hover:bg-rose-500/70'
        onClick={(e) => toggleQues((pre) => !pre)}
      >
        {showQues ? 'Hide' : 'Show'} Questions
      </button>

      {showQues ? (
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 justify-center `}
        >
          {data.questions.length != 0 ? (
            data.questions
              .slice()
              .reverse()
              .map((quest, id) => {
                let l = data?.questions?.length;
                return (
                  <section
                    key={l - id + quest.title}
                    className=' ring-1 rounded-sm p-2 m-1 groupques relative'
                  >
                    <span className='float-right m-1 text-red-500 font-semibold'>
                      {quest?.mark}
                    </span>
                    <p className='text-red-500 mb-1'>
                      <span>
                        {l - id}. {quest.title}
                      </span>
                      <button
                        className='hover:bg-purple-400 rounded-full p-1 text-xl opacity-0 group-[ques]:group-hover:opacity-100 transition'
                        type='button'
                        onClick={(e) =>
                          deleteQuestion(quest.id, eid).then(() => {
                            setQues('');
                            setAns([]);
                            setOpt([]);
                            setAnsType(ansTypes[0]);
                            setFiles(null);
                            setMark(0);
                          })
                        }
                      >
                        <MdDelete className='text-xl text-red-600 hover:text-black rounded-full' />
                      </button>
                    </p>
                    {/* images */}
                    <div className='grid grid-cols-2 gap-2 mb-2 items-center'>
                      {quest?.images?.map((img, iid) => {
                        return (
                          <img
                            key={iid}
                            className='rounded-md max-h-[200px]'
                            src={reqImgWrapper(img?.url)}
                            alt={img?.originamName}
                          />
                        );
                      })}
                    </div>
                    {/* questions */}
                    <ol className='grid grid-cols-2 gap-2 items-center'>
                      {quest?.quesOptions?.map((qOpt, qid) => {
                        return (
                          <li
                            className='border p-1 border-black text-black'
                            key={qOpt?.title}
                          >
                            {qOpt?.id}. {qOpt?.title}
                          </li>
                        );
                      })}
                    </ol>
                    {/* answers */}
                    <ol className='flex flex-wrap gap-2 items-center my-3'>
                      {quest?.quesAns?.length != 0 && <span>Answers: </span>}{' '}
                      {quest?.quesAns?.map((qans, aid) => {
                        return (
                          <li
                            className='border p-1 border-black text-black'
                            key={`${qans}+${aid}`}
                          >
                            {qans}
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                );
              })
          ) : (
            <h2 className='text-rose-600 text-left my-10 font-bold text-3xl'>
              No question found
            </h2>
          )}
        </div>
      ) : null}
    </>
  );
};

const ExamLists = ({ data, id, setData }) => {
  let l = data.length;

  return (
    <div>
      <h2 className='text-center font-semibold underline text-xl my-5'>
        Exam List{' '}
      </h2>
      {/* here goes exam list */}
      {l != 0 ? (
        <div className='grid grid-cols-1 w-full gap-5 justify-evenly'>
          {data
            ?.slice()
            .reverse()
            .map((ele, id) => {
              // console.log(ele);
              const exst = new Date(Number(ele?.examStartTime));
              const exet = new Date(Number(ele?.examEndTime));
              return (
                <div
                  className='mx-5 text-base group hover:ring hover:ring-violet-500 transition p-2 rounded focus:ring focus:ring-violet-500 ring ring-transparent'
                  key={`${ele.id}${ele.name}`}
                >
                  <div className='text-white w-auto max-w-xs h-fit flex items-center space-x-2'>
                    <p className='w-full rounded-full text-left px-5 bg-purple-500 transition-colors group-hover:bg-purple-700 font-extrabold'>
                      {' '}
                      {l - id}. {ele?.name}
                    </p>
                    <button
                      className='hover:bg-purple-400 rounded-full p-1 text-xl opacity-0 group-hover:opacity-100 transition '
                      type='button'
                      onClick={(e) => {
                        let x = '';
                        x = prompt(
                          `Delete exam ? [${ele.name}, eid:${ele.id}] (yes/no)`
                        );
                        if (x.toLocaleLowerCase() == 'yes') {
                          deleteExam(ele?.id, () => {
                            setData((data) => {
                              return data.filter((item) => item.id !== ele?.id);
                            });
                          });
                        } else alert('Failed');
                      }}
                    >
                      <MdDelete className='text-xl text-red-600 hover:text-black rounded-full' />
                    </button>
                  </div>
                  <ul className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-3 items-start my-2'>
                    <li className='p-2 text-blue-900 font-bold border border-fuchsia-500'>
                      Exam Topic: {ele?.topic}
                    </li>
                    <li className='p-2 text-yellow-600 border border-fuchsia-500'>
                      Exam Type: {ele?.category}
                    </li>
                    <li className='p-2 text-green-600 border border-fuchsia-500'>
                      Exam Start:{' '}
                      {`${exst.getDate()}/${
                        exst.getMonth() + 1
                      }/${exst.getFullYear()}, ${printTime(
                        exst.getHours(),
                        exst.getMinutes(),
                        exst.getSeconds()
                      )}`}
                    </li>
                    <li className='p-2 text-rose-500 border border-fuchsia-500'>
                      Exam End:{' '}
                      {`${exet.getDate()}/${
                        exet.getMonth() + 1
                      }/${exet.getFullYear()}, ${printTime(
                        exet.getHours(),
                        exet.getMinutes(),
                        exet.getSeconds()
                      )}`}
                    </li>
                    <li className='p-2 text-red-700 border border-fuchsia-500 font-semibold'>
                      Exam Marks: {ele?.totalMarks}
                    </li>
                    <li className='p-2 text-blue-600 border border-fuchsia-500'>
                      Exam Duration: {duration(exet.getTime(), exst.getTime())}
                    </li>
                  </ul>
                  <AddQuestion
                    eid={ele.id}
                    category={ele?.category}
                    startTime={exst.getTime()}
                  />
                </div>
              );
            })}
        </div>
      ) : (
        <p className='capitalize text-rose-500 text-center text-xl font-semibold'>
          No exams found
        </p>
      )}
    </div>
  );
};

function addZero(e) {
  return e < 10 ? `0${e}` : e;
}
function printTime(hh, mm, ss) {
  return `${addZero(checkHours(hh)?.time)}:${addZero(mm)}:${addZero(ss)} ${
    checkHours(hh)?.format
  }`;
}
function checkHours(hour) {
  if (hour == 0) {
    return {
      time: 12,
      format: 'AM',
    };
  } else if (hour > 0 && hour <= 12) {
    return {
      time: hour,
      format: hour == 12 ? 'PM' : 'AM',
    };
  } else if (hour > 12 && hour <= 23) {
    return {
      time: hour - 12,
      format: 'PM',
    };
  } else {
    return {
      time: 0,
      format: '--',
    };
  }
}
function duration(startTime, endTime) {
  let x = Math.abs(startTime - endTime);
  x /= 1000;
  return `${addZero(Math.floor(x / 3600))}h ${addZero(
    Math.floor((x % 3600) / 60)
  )}m ${addZero(Math.floor(x % 60))}s`;
}
export default Exam;
