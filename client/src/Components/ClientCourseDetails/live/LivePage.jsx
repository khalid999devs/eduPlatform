function ZoomLink({ val }) {
  return (
    <div className='dark:text-darkText '>
      <h2 className='text-center font-bold text-2xl text-secondary-dark'>
        Zoom Live class
      </h2>
      <div className='max-h-full overflow-y-auto'>
        <Zoom value={val} />
      </div>
    </div>
  );
}

const Zoom = ({ value }) => {
  return (
    <div className='w-auto flex justify-evenly  p-5'>
      <a href={value?.link} target='_blank'>
        <button className='px-4 py-2 w-24 transition-colors bg-blue-600/90 hover:bg-blue-700 text-white font-semibold capitalize rounded-lg'>
          Join
        </button>
      </a>
    </div>
  );
};

export default ZoomLink;
