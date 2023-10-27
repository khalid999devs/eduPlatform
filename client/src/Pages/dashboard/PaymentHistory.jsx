import { CiReceipt } from 'react-icons/ci';

const PaymentHistory = () => {
  const payments = [
    {
      id: '#2344',
      courseName: 'Example Course 1',
      date: new Date().getUTCDate(),
      price: '2000 tk',
      status: 'paid',
      receipt: 'http://localhost:5173',
    },
  ];

  const handleReceiptClick = () => {
    console.log('Downloading');
  };

  return (
    <div className='flex flex-col gap-5 mb-6 w-full '>
      <h1 className='text-xl font-medium '>Payment History</h1>
      <div className=' overflow-auto'>
        <table className='w-full border'>
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
                Receipt
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, value) => {
              return (
                <tr className='bg-gray-100 border-b' key={value}>
                  <td className='px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {item.id}
                  </td>
                  <td className='text-sm text-gray-900  px-3 py-4 whitespace-nowrap'>
                    {item.courseName}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap'>
                    {item.date}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap'>
                    {item.price}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap'>
                    <p
                      className={`px-1 rounded-lg text-center font-medium py-[2px] text-xs ${
                        item.status === 'paid'
                          ? 'bg-green-300 text-green-700'
                          : 'bg-red-300 text-red-700'
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap text-center'>
                    <button
                      className='bg-onPrimary-light p-2 rounded-full transition-transform hover:bg-onPrimary-main hover:text-white'
                      onClick={() => {
                        handleReceiptClick();
                      }}
                    >
                      <CiReceipt className='text-lg' />
                    </button>
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

export default PaymentHistory;
