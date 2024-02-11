import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourse } from '../../axios/fetchCourses';
import { ContextConsumer } from '../../App';
import ValuedInput from '../Form/ValuedInput';
import OptionField from '../Form/OptionField';
import { currencyOptions } from '../../assets/utils';
import axios from 'axios';
import reqs from '../../assets/requests';

const EnrollCourse = () => {
  const { user, contextTrigger, setContextTrigger, loading } =
    ContextConsumer();
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [reqData, setReqData] = useState({
    name: '',
    address: '',
    phone: '',
    postCode: '',
    currType: 'BDT',
  });
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(reqs.IS_CLIENT_VALID, { withCredentials: true }).then((res) => {
      if (!res.data.succeed) {
        navigate(`/login?courseId=${courseId}`, { replace: true });
      }
    });
    fetchCourse(courseId, setData);
  }, []);

  useEffect(() => {
    if (!loading && user.userName) {
      if (user.enrolledCourses.find((course) => course.courseId == courseId))
        navigate(`/courses/onClientReq/${courseId}`, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    setReqData({
      name: user.name || '',
      address: user.address || '',
      phone: user.phone || '',
      postCode: user.address?.split('@')[1] || '',
      currType: currencyOptions[0].value,
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      reqData.name &&
      reqData.address &&
      reqData.currType &&
      reqData.postCode &&
      reqData.phone
    ) {
      const payData = {
        ...reqData,
        courseId: data.id,
        email: user.email,
        domOrigin: window.location.origin,
      };
      axios
        .post(reqs.PAYMENT_INIT, payData, { withCredentials: true })
        .then((res) => {
          // console.log(res.data);

          if (res.data.succeed) {
            window.location.replace(res.data.url);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          alert(err.response?.data?.msg);
          console.log(err);
        });
    } else {
      alert("please make sure you've filled all the fields.");
    }
  };

  const handleChange = (e) => {
    setReqData((reqData) => {
      return { ...reqData, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className='min-h-screen w-full'>
      <div className='min-w-[400px] mt-16  p-2 m-auto flex items-center justify-center'>
        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-column sm:flex-row gap-12'>
            <div className='flex flex-col gap-3 items-end justify-start'>
              <ValuedInput
                label={'Name'}
                inputProps={{
                  value: reqData?.name,
                  onChange: handleChange,
                  name: 'name',
                  placeholder: 'name',
                }}
              />
              <ValuedInput
                label={'Address'}
                inputProps={{
                  value: reqData?.address,
                  onChange: handleChange,
                  name: 'address',
                  placeholder: 'area, district, country',
                }}
              />
              <ValuedInput
                label={'Phone'}
                inputProps={{
                  value: reqData?.phone,
                  onChange: handleChange,
                  name: 'phone',
                  placeholder: '01XXXXXXXXX',
                }}
              />
              <ValuedInput
                label={'Post Code'}
                inputProps={{
                  value: reqData?.postCode,
                  onChange: handleChange,
                  name: 'postCode',
                  placeholder: '3452',
                }}
              />

              <OptionField
                id={'currencySelect'}
                label={'Currency'}
                setValue={handleChange}
                optionsObjs={currencyOptions}
                name={'currType'}
              />
            </div>
            <div className='flex flex-col gap-10 items-center justify-start'>
              <div className='max-w-[350px] p-3 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <h1 className='text-2xl font-bold'>
                    {data.title || 'Course title'}
                  </h1>
                  <p>
                    Price: {data.price && reqData.currType}{' '}
                    {data.price || 'N/A'}
                  </p>
                  <p>
                    Net amount: {data.price && reqData.currType}{' '}
                    {data.price || 'N/A'}
                  </p>
                </div>

                {data.price && (
                  <button
                    type='Submit'
                    className='bg-onPrimary-main text-white text-md px-6 py-4 rounded-md mt-6'
                  >
                    Pay {reqData.currType} {data.estimatedPrice}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollCourse;
