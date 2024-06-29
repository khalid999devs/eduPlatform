import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourse } from '../../axios/fetchCourses';
import { ContextConsumer } from '../../App';
import ValuedInput from '../Form/ValuedInput';
import OptionField from '../Form/OptionField';
import { currencyOptions } from '../../assets/utils';
import axios from 'axios';
import reqs from '../../assets/requests';
import { contacts } from '../../assets/pageInfo';
import PrimaryButton from '../Buttons/PrimaryButton';
import Popup from '../Alerts/Popup';

const EnrollCourse = () => {
  const { user, contextTrigger, setContextTrigger, loading } =
    ContextConsumer();
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [cLoading, setcLoading] = useState(false);
  const [reqData, setReqData] = useState({
    name: '',
    address: '',
    phone: '',
    postCode: '',
    currType: 'BDT',
  });
  const [paymentData, setPaymentData] = useState({
    bkashNo: '',
    transactionId: '',
  });
  const [data, setData] = useState({});
  const [popup, setPopup] = useState({ text: '', state: '' });

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
    if (reqData.name && reqData.address && reqData.currType && reqData.phone) {
      setcLoading(true);
      const payData = {
        ...reqData,
        courseId: data.id,
        email: user.email,
        domOrigin: window.location.origin,
        bkashData: paymentData,
        enrollTime: Date.now(),
      };
      setPopup({ text: 'Submitting your information', state: '' });

      axios
        .post(reqs.PAYMENT_INIT, payData, { withCredentials: true })
        .then((res) => {
          // console.log(res.data);

          if (res.data.succeed) {
            // window.location.replace(res.data.url);
            setPopup({ text: res.data.msg, state: 'success' });
            setcLoading(false);
          } else {
            setcLoading(false);
            setPopup({ text: res.data.msg, state: 'error' });
          }
        })
        .catch((err) => {
          setcLoading(false);
          setPopup({ text: err.response?.data?.msg, state: 'error' });
          // console.log(err);
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
  const handlePaymentChange = (e) => {
    setPaymentData((payData) => {
      return { ...payData, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className='min-h-screen w-full'>
      {popup.text && (
        <Popup
          state={popup.state}
          text={popup.text}
          loading={cLoading}
          onClick={() => {
            navigate(`/courses`);
          }}
        />
      )}
      <div className='min-w-[400px] mt-16 p-2 m-auto flex items-center justify-center'>
        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col md:flex-row gap-6 md:gap-12'>
            <div className='flex flex-col gap-3 items-end justify-start'>
              <ValuedInput
                label={'Name'}
                inputProps={{
                  value: reqData?.name,
                  onChange: handleChange,
                  name: 'name',
                  placeholder: 'name',
                  required: true,
                }}
              />
              <ValuedInput
                label={'Address'}
                inputProps={{
                  value: reqData?.address,
                  onChange: handleChange,
                  name: 'address',
                  placeholder: 'area, district, country',
                  required: true,
                }}
              />
              <ValuedInput
                label={'Phone'}
                inputProps={{
                  value: reqData?.phone,
                  onChange: handleChange,
                  name: 'phone',
                  placeholder: '01XXXXXXXXX',
                  required: true,
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
                  <div>
                    <p>
                      Price: {data.price && reqData.currType}{' '}
                      {data.price || 'N/A'}
                    </p>
                    <p>
                      Net amount: {data.price && reqData.currType}{' '}
                      {data.price || 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <ul className='mt-2 list-disc text-xs pl-3'>
                    <li>
                      First pay{' '}
                      <span className='font-bold text-secondary-dark'>
                        {reqData.currType} {data.estimatedPrice}
                      </span>{' '}
                      to{' '}
                      {contacts.bkashNo.map((item, key) => (
                        <span
                          key={key}
                          className='text-sm font-bold text-onPrimary-main mr-1 cursor-pointer px-1 py-0 bg-primary-dark rounded-sm'
                          onClick={() => {
                            navigator.clipboard.writeText(item);
                          }}
                        >
                          {item}
                        </span>
                      ))} <span className='text-pink-400 font-semibold'>{"[bKash]"}</span>
                    </li>
                    <li>Then copy the bkash transaction ID</li>
                    <li>
                      Then please enter the number you have sent the payment
                      from
                    </li>
                    <li>Paste the transaction ID you have copied</li>
                  </ul>

                  <div className='flex flex-col gap-3 mt-3'>
                    <ValuedInput
                      label={'Bkash number'}
                      inputProps={{
                        value: paymentData.bkashNo,
                        onChange: handlePaymentChange,
                        name: 'bkashNo',
                        placeholder: '01XXXXXXXXX',
                        required: true,
                      }}
                      alert={{
                        msg: 'The bkash number you have sent the money from',
                        state: 'normal',
                      }}
                    />
                    <ValuedInput
                      label={'Transaction ID'}
                      inputProps={{
                        value: paymentData.transactionId,
                        onChange: handlePaymentChange,
                        name: 'transactionId',
                        placeholder: 'A23EFJD...',
                        required: true,
                      }}
                      alert={{
                        msg: 'The transaction ID you have copied',
                        state: 'normal',
                      }}
                    />
                  </div>
                  <div className='w-full mt-5'>
                    {data.price && (
                      <PrimaryButton
                        type='Submit'
                        classes='bg-onPrimary-main text-white text-md !py-2 w-full'
                      >
                        Submit
                      </PrimaryButton>
                    )}
                  </div>
                </div>
                {/* 
                {data.price && (
                  <button
                    type="Submit"
                    className="bg-onPrimary-main text-white text-md px-6 py-4 rounded-md mt-6"
                  >
                    Pay {reqData.currType} {data.estimatedPrice}
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollCourse;
