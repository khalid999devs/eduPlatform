const IconNumCard = ({ icon, number, text }) => {
  return (
    <div className='flex flex-row items-center lg:flex-col gap-4 border rounded-md p-2 px-4 lg:p-5 w-full lg:max-w-[300px] '>
      <div className='w-[45px] h-[45px] rounded-full bg-onPrimary-light p-2 text-onPrimary-main text-xl grid place-items-center'>
        {icon}
      </div>
      <div className='flex w-full flex-row-reverse items-center justify-between lg:flex-col lg:gap-3'>
        <h1 className='text-2xl lg:text-3xl font-bold'>{number}</h1>
        <p className='text-md'>{text}</p>
      </div>
    </div>
  );
};

export default IconNumCard;
