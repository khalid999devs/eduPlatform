import { useEffect, useState } from 'react';
import { CiReceipt } from 'react-icons/ci';
import axios from 'axios';
import reqs from '../../assets/requests';

const PaymentHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(reqs.GET_ALL_CLIETN_BASED_ORDERS, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) setOrders(res.data.result);
      });
  }, []);

  // console.log(orders);

  return (
    <div className='flex flex-col gap-5 mb-6 w-full '>
      <h1 className='text-xl font-medium '>Payment History</h1>
      <div className='max-w-[90vw] overflow-auto relative pointer-events-none'>
        <table className='min-w-[600px] w-full border '>
          <thead className='bg-white border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                ID
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                Course Name
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                Date
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                Price
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                Status
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                Transaction Id
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-3 py-4 text-left'
              >
                Bkash no.
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, value) => {
              return (
                <tr className='bg-gray-100 border-b' key={value}>
                  <td className='px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {item.invoiceNo}
                  </td>
                  <td className='text-xs text-gray-900 px-3 py-4 max-w-[100px]'>
                    {item.title}
                  </td>
                  <td className='text-sm text-gray-900  px-3 py-4 whitespace-nowrap'>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className='text-sm text-gray-900  px-3 py-4 whitespace-nowrap'>
                    {item.price} <span className='font-semibold'>৳</span>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap'>
                    <p
                      className={`px-1 rounded-lg text-center font-medium py-[2px] text-xs ${
                        item.paidStatus
                          ? 'bg-green-300 text-green-700'
                          : 'bg-orange-500 text-white'
                      }`}
                    >
                      {item.paidStatus ? 'Verified' : 'Pending'}
                    </p>
                  </td>
                  <td className='text-sm text-gray-900 px-3 py-4 max-w-[150px]'>
                    {item.paymentInfo?.bkashData?.transactionId}
                  </td>
                  <td className='text-sm text-gray-900 px-3 py-4 max-w-[150px]'>
                    {item.paymentInfo?.bkashData?.bkashNo}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* alert box */}
      {/* <div className='ring ring-rose-500 rounded-md p-14 text-center absolute top-1/2 translate-x-1/4 bg-white -translate-y-1/2 opacity-50 pointer-events-none'>
        <p className='text-red-500'>Will be available soon</p>
      </div> */}
    </div>
  );
};

export default PaymentHistory;
