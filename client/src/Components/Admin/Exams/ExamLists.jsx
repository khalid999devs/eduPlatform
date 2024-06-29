import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ValuedInput from '../../Form/ValuedInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import reqs from '../../../assets/requests';
import SingleTableHead from './SingleTableHead';
import PrimaryButton from '../../Buttons/PrimaryButton';
import Popup from '../../Alerts/Popup';

const examTableHeads = [
  '',
  'S/N',
  'Status',
  'Name',
  'Topic',
  'Category',
  'Course',
  'Total Marks',
  'Starts',
  'Ends',
];

const ExamLists = () => {
  const navigate = useNavigate();
  const { courseVal, mode } = useParams();
  const { courseOptions } = useOutletContext();
  const [examData, setExamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isManualEval, setIsManualEval] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ text: '', state: '' });

  useEffect(() => {
    axios
      .post(
        reqs.GET_ADMIN_COURSE_BASED_EXAMS,
        { courseId: courseVal, mode },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.succeed) {
          setExamData(res.data.result);
          setFilteredData(res.data.result);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });

    document.querySelector('#search-input').value = '';
  }, [courseVal, mode, fetchTrigger]);

  const handleManualEvaluate = (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ text: 'Evaluating all the completed quizes...', state: '' });

    axios
      .get(`${reqs.ADMIN_MANUAL_EVALUATE_EXAM}?currTime=${Date.now()}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) {
          setIsManualEval(false);
          setPopup((popup) => {
            return { ...popup, text: res.data.msg, state: 'success' };
          });
          setFetchTrigger((fetchTrigger) => !fetchTrigger);
        } else {
          if (res.data.mode === 'noexam') {
            setIsManualEval(false);
          }
          setPopup((popup) => {
            return { ...popup, text: res.data.msg, state: 'warning' };
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setPopup({ text: err.response.data.msg, state: 'error' });
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredData(
      examData.filter((item) => item.name.toLowerCase().startsWith(searchTerm))
    );
  };

  return (
    <div className='min-h-screen w-full'>
      {popup.text && (
        <Popup
          loading={loading}
          state={popup.state}
          btnDisabled={loading}
          text={popup.text}
          buttonLable={'Close'}
          onClick={() => setPopup({ text: '', state: '' })}
        />
      )}
      <div
        className={`w-full flex items-center ${
          isManualEval ? 'justify-between' : 'justify-center'
        } mt-1 mb-6`}
      >
        <div className='max-w-[350px] w-full'>
          <ValuedInput
            inputProps={{
              id: 'search-input',
              placeholder: 'Search by Exam Name',
              onChange: handleSearch,
              name: 'examSearch',
            }}
          />
        </div>
        {isManualEval && (
          <div>
            <PrimaryButton
              text={'Evaluate'}
              classes={'bg-onPrimary-main text-primary-main'}
              onClick={handleManualEvaluate}
            />
          </div>
        )}
      </div>

      {/* list section */}
      <div className='overflow-auto w-full'>
        <table className='min-w-[900px] w-full border shadow-md'>
          <thead className='bg-onPrimary-main border-b text-primary-main'>
            <tr>
              {examTableHeads.map((thead, key) => {
                if (!thead) return <th key={key}></th>;
                else return <SingleTableHead key={key} title={thead} />;
              })}
            </tr>
          </thead>
          <tbody className='space-y-4'>
            {filteredData?.map((item, value) => {
              const isEvaluated =
                mode === 'quiz' ? item.isCronClosed : item.isFinalClosed;
              const isLive =
                Number(item.examEndTime) > Date.now() + 10 * 60 * 1000;

              if (!isEvaluated && !isLive && !isManualEval && mode === 'quiz')
                setIsManualEval(true);

              return (
                <tr
                  key={value}
                  className={`break-word relative mt-4 rounded-md border border-1 transition-all duration-500 ${
                    isEvaluated || isLive || mode === 'written'
                      ? 'cursor-pointer hover:shadow-md'
                      : ''
                  }`}
                  onClick={() => {
                    if (isEvaluated || mode === 'written') {
                      navigate(
                        `/abs-admin/exams/${courseVal}/${mode}/results/${item.id}`,
                        {
                          state: {
                            examName: item.name,
                            totalMarks: item.totalMarks,
                            category: item.category,
                          },
                        }
                      );
                    }
                  }}
                >
                  {!isEvaluated ? (
                    <td
                      className={`absolute z-[10] top-0 left-0 w-full h-full ${
                        !isLive
                          ? 'bg-black bg-opacity-10'
                          : 'bg-green-900 bg-opacity-20'
                      }`}
                    ></td>
                  ) : (
                    <td></td>
                  )}
                  <td className='px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {value + 1}
                  </td>
                  <td
                    className={`px-3 py-4 text-xs font-medium max-w-[100px] ${
                      isEvaluated
                        ? 'text-green-700'
                        : !isLive
                        ? 'text-orange-500'
                        : 'text-red-600'
                    }`}
                  >
                    {isEvaluated ? (
                      'Evaluated'
                    ) : isLive ? (
                      'Live'
                    ) : (
                      <span>
                        Pending
                        <br />
                        Evaluation
                      </span>
                    )}
                  </td>
                  <td className='text-xs text-gray-900  px-3 py-4 max-w-[100px]'>
                    {item.name}
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 max-w-[100px]'>
                    {item.topic}
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 whitespace-nowrap'>
                    {item.category}
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 max-w-[100px]'>
                    {
                      courseOptions?.find((op) => op.value == item.courseId)
                        ?.title
                    }
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 whitespace-nowrap'>
                    {item.totalMarks}
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 max-w-[80px]'>
                    {new Date(Number(item.examStartTime))?.toLocaleString()}
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 max-w-[80px]'>
                    {new Date(Number(item.examEndTime))?.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamLists;
