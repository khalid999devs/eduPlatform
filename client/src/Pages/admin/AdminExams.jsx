import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import OptionField from '../../Components/Form/OptionField';
import axios from 'axios';
import reqs from '../../assets/requests';

const AdminExams = () => {
  const navigate = useNavigate();
  const { courseVal, mode } = useParams();
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    axios
      .get(reqs.GET_COURSES)
      .then((res) => {
        if (res.data.succeed) {
          setCourseOptions([
            { value: 'all', title: 'All courses' },
            ...res.data.courses.map((item) => {
              return {
                value: item.id,
                title:
                  item.title.length < 25
                    ? item.title
                    : `${item.title.slice(0, 25)}...`,
              };
            }),
          ]);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, []);

  return (
    <div className='px-5 flex flex-col min-h-screen gap-4'>
      <h2 className='text-center text-darkText text-4xl font-semibold mb-6'>
        Exams and Evaluation
      </h2>
      {/* mode buttons */}
      <div className='flex flex-wrap-reverse gap-5 justify-center md:justify-between items-center w-full'>
        <div className='flex gap-3 mb-2'>
          <PrimaryButton
            classes={`!py-2 ${
              mode === 'quiz'
                ? 'bg-onPrimary-main text-primary-main'
                : 'bg-primary-main text-onPrimary-main'
            }`}
            text={'Quiz'}
            onClick={() => {
              navigate(`/abs-admin/exams/${courseVal}/quiz`);
            }}
          />
          <PrimaryButton
            classes={`!py-2 ${
              mode === 'written'
                ? 'bg-onPrimary-main text-primary-main'
                : 'bg-primary-main text-onPrimary-main'
            }`}
            text={'Written'}
            onClick={() => {
              navigate(`/abs-admin/exams/${courseVal}/written`);
            }}
          />

          <PrimaryButton
            classes={`!py-2 ${
              mode === 'evaluated'
                ? 'bg-onPrimary-main text-primary-main'
                : 'bg-primary-main text-onPrimary-main'
            }`}
            text={'Evaluated'}
            onClick={() => {
              navigate(`/abs-admin/exams/${courseVal}/evaluated`);
            }}
          />
        </div>
        <div>
          <OptionField
            id={'course-options'}
            name={'course-options'}
            value={courseVal}
            variant='small'
            setValue={(e) => {
              navigate(`/abs-admin/exams/${e.target.value}/${mode}`);
            }}
            optionsObjs={courseOptions}
          />
        </div>
      </div>

      {/* other sections */}
      <div className='mt-2'>
        <Outlet context={{ courseOptions }} />
      </div>
    </div>
  );
};

export default AdminExams;
