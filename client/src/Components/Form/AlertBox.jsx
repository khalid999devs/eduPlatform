import { RxCross2 } from 'react-icons/rx';

const AlertBox = ({ alert, text, setAlert }) => {
  return (
    <div
      className={`my-3 rounded-md p-3 flex flex-row justify-between items-center w-full text-white font-medium text-md ${
        alert === 'error'
          ? 'bg-red-800'
          : alert === 'warn'
          ? 'bg-secondary-dark'
          : alert === 'success'
          ? 'bg-green-700'
          : 'bg-onPrimary-main'
      }`}
    >
      <p>{text || 'Alert text'}</p>
      <div
        className='cursor-pointer'
        onClick={() => {
          setAlert({ text: '', alert: '', state: false });
        }}
      >
        <RxCross2 fontSize={'1.3rem'} />
      </div>
    </div>
  );
};

export default AlertBox;
