function ZoomLink({ val, zoomInfo }) {
  return (
    <div className='dark:text-darkText p-2 m-auto mb-4 max-w-[400px] w-full shadow-md'>
      <h2 className='text-center font-bold text-2xl text-secondary-dark'>
        Zoom Live class
      </h2>
      <div className='flex flex-col items-center justify-center'>
        {zoomInfo?.zoomLink && (
          <div className='mt-4 text-left text-sm'>
            <p>
              Meeting Id:{' '}
              <span className='font-semibold'>{zoomInfo?.zoomId}</span>
            </p>
            <p>
              Meeting Pass:{' '}
              <span className='font-semibold'>{zoomInfo?.zoomPass}</span>
            </p>
          </div>
        )}

        <Zoom value={zoomInfo?.zoomLink || val.link} />
      </div>
    </div>
  );
}

const Zoom = ({ value }) => {
  return (
    <div className='w-auto flex justify-evenly  p-5'>
      <a href={value} target='_blank'>
        <button className='px-4 py-2 w-24 transition-colors bg-blue-600/90 hover:bg-blue-700 text-white font-semibold capitalize rounded-lg'>
          Join
        </button>
      </a>
    </div>
  );
};

export default ZoomLink;
