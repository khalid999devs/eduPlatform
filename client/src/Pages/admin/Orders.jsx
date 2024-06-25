import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import reqs from '../../assets/requests';

const Orders = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [verifiedOrders, setVerifiedOrders] = useState([]);
  const [confirmToggle, setConfirmToggle] = useState([]);

  useEffect(() => {
    if (mode === 'pending') {
      axios
        .get(reqs.GET_PENDING_ORDERS_ADMIN, { withCredentials: true })
        .then((res) => {
          if (res.data.succeed) {
            // console.log(res.data.result);
            setPendingOrders(res.data.result);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.msg);
        });
    } else if (mode === 'verified') {
      axios
        .get(reqs.GET_VERIFIED_ORDERS_ADMIN, { withCredentials: true })
        .then((res) => {
          if (res.data.succeed) {
            // console.log(res.data);
            setVerifiedOrders(res.data.result);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          // console.log(err);
          // alert(err.response.data.msg);
        });
    } else {
      navigate('/abs-admin/orders/pending');
    }
  }, [mode, confirmToggle]);

  const handleVerifyClick = (setRecordLoading, clientId, courseId) => {
    setRecordLoading(true);
    axios
      .post(
        reqs.CONFIRM_SINGLE_ORDER_ADMIN,
        { clientId, courseId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.succeed) {
          setConfirmToggle((confirmToggle) => !confirmToggle);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <div className='px-5 flex flex-col min-h-screen gap-4'>
      <h2 className='text-center text-darkText text-4xl font-semibold mb-6'>
        Enrolls and Orders
      </h2>
      {/* mode buttons */}
      <div className='flex gap-3 mb-2'>
        <PrimaryButton
          classes={`!py-2 ${
            mode === 'pending'
              ? 'bg-onPrimary-main text-primary-main'
              : 'bg-primary-main text-onPrimary-main'
          }`}
          text={'Pending'}
          onClick={() => {
            navigate('/abs-admin/orders/pending');
          }}
        />
        <PrimaryButton
          classes={`!py-2 ${
            mode === 'verified'
              ? 'bg-onPrimary-main text-primary-main'
              : 'bg-primary-main text-onPrimary-main'
          }`}
          text={'Verified'}
          onClick={() => {
            navigate('/abs-admin/orders/verified');
          }}
        />
      </div>
      {/* sutdent lists */}
      <div className='flex justify-center overflow-y-scroll min-w-lg max-w-6xl w-full mx-auto border border-root_bluish'>
        <table className='w-full bg-slate-300 text-darkText shadow-md cursor-default select-text'>
          <thead className='w-full'>
            <tr className='text-darkText text-md text-left'>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-4 bg-gray-100 text-center'>
                Sl No.
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Name
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Email
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Phone
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Course Name
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Bkash no.
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Transaction Id
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                Status
              </th>
              <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                {mode === 'pending' ? 'Enrolled date' : 'Verified Date'}
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll '>
            <>
              {mode === 'pending'
                ? pendingOrders.map((order, key) => {
                    return (
                      <OrderList
                        key={key}
                        id={key + 1}
                        name={order.paymentInfo?.userInfo?.fullName}
                        email={order.paymentInfo?.userInfo?.email}
                        phone={order.paymentInfo?.phone}
                        courseName={order.paymentInfo?.courseTitle}
                        bkashNo={order.paymentInfo?.bkashData?.bkashNo}
                        transactionId={
                          order.paymentInfo?.bkashData?.transactionId
                        }
                        date={order.paymentInfo?.enrollTime}
                        mode={mode}
                        handleVerifyClick={handleVerifyClick}
                        clientId={order.clientId}
                        courseId={order.courseId}
                      />
                    );
                  })
                : verifiedOrders.map((order, key) => {
                    return (
                      <OrderList
                        key={key}
                        id={key + 1}
                        name={order.paymentInfo?.userInfo?.fullName}
                        email={order.paymentInfo?.userInfo?.email}
                        phone={order.paymentInfo?.phone}
                        courseName={order.paymentInfo?.courseTitle}
                        bkashNo={order.paymentInfo?.bkashData?.bkashNo}
                        transactionId={
                          order.paymentInfo?.bkashData?.transactionId
                        }
                        date={order.createdDate}
                        mode={mode}
                        clientId={order.clientId}
                        courseId={order.courseId}
                      />
                    );
                  })}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

const OrderList = ({
  id,
  avatar,
  name,
  email,
  phone,
  courseName,
  bkashNo,
  transactionId,
  date,
  mode,
  handleVerifyClick,
  clientId,
  courseId,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <tr
      key={id}
      className={`hover:bg-gray-500/20 h-fit row-span-1 transition-colors duration-100 ease-in border-b relative`}
    >
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 grid place-items-center z-10'>
          <img
            src='/Images/loading.gif'
            className='w-[50px]'
            alt='Loading...'
          />
        </div>
      )}

      <td className='py-2 text-center'>{id + 1}</td>
      <td className='py-2 text-center font-semibold '>
        {avatar && (
          <img
            className='w-10 h-10 rounded-full object-cover select-none'
            src={avatar}
            alt='Avatar'
            width={100}
            height={100}
          />
        )}
        <p className='text-left pl-2'>{name}</p>
      </td>
      <td className='py-2 text-center'>
        <a
          className='cursor-pointer no-underline !inline-block'
          href={`mailto:${email}`}
        >
          <MdEmail className='text-2xl text-onPrimary-main' />
        </a>
      </td>
      <td className='p-2 text-justify'>
        <span
          className='cursor-pointer'
          onClick={() => {
            navigator.clipboard.writeText(phone);
          }}
        >
          {phone || '-'}
        </span>
      </td>
      <td className='p-2 text-justify max-w-[170px]'>
        <p className='text-xs opacity-80 !break-all'> {courseName}</p>
      </td>
      <td className='p-2 text-justify'>
        <span
          className='cursor-pointer text-[1rem] font-medium opacity-80'
          onClick={() => {
            navigator.clipboard.writeText(phone);
          }}
        >
          {bkashNo || '-'}
        </span>
      </td>
      <td className='p-2 text-justify min-w-[100px]'>
        <p className='text-[1rem] font-medium opacity-80 !break-all'>
          {' '}
          {transactionId}
        </p>
      </td>
      <td className='p-2 text-justify min-w-[100px]'>
        {mode === 'pending' ? (
          <PrimaryButton
            text={loading ? 'Verifying...' : 'Verify'}
            classes={'!py-1.5 !px-3 bg-green-800'}
            textClasses={'text-primary-main !normal-case text-xs'}
            onClick={() => handleVerifyClick(setLoading, clientId, courseId)}
          />
        ) : (
          <span className='text-green-700 font-medium'>verified</span>
        )}
      </td>

      <td className='p-2 text-justify'>
        {new Date(Number(date)).toDateString()}
      </td>
    </tr>
  );
};
