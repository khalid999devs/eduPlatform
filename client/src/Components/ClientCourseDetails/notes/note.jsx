import { useEffect, useState } from 'react';
import { HiChevronRight, HiLockClosed, HiPlusCircle } from 'react-icons/hi';
import { reqImgWrapper } from '../../../assets/requests';
function Notes({ notes = [] }) {
  return (
    <div className='text-white '>
      <h2 className='text-center font-bold text-2xl text-primary-dark'>
        Note Link
      </h2>
      <div className='max-h-full overflow-y-auto'>
        {notes.length > 0 ? (
          notes.map((val, id) => <Resource key={id} id={id} ele={val} />)
        ) : (
          <>
            <h4 className='text-center py-2 text-rose-500'>
              Note link not found.
            </h4>
          </>
        )}
      </div>
    </div>
  );
}

const Resource = ({ ele, id }) => {
  const [drop, setDrop] = useState(false);
  const driveLinks = ele?.driveLink ? JSON.parse(ele?.driveLink) : [];
  console.log(driveLinks);
  const filesUrl = ele?.filesUrl ? ele?.filesUrl : [];
  const [image, setImg] = useState({
    show: false,
    link: '',
  });
  function toggleViewer(link) {
    setImg((pre) => ({ show: !pre.show, link: link }));
  }
  useEffect(() => {
    if (image.show) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = 'auto';
  }, [image.show]);
  return (
    <section
      key={`resource-${id}`}
      className='text-sm grid items-start justify-normal gap-2 m-2 select-none ring-1 ring-black'
    >
      <p
        className='flex gap-1 font-bold hover:underline cursor-default'
        onClick={() => {
          setDrop((pre) => !pre);
        }}
      >
        <HiChevronRight
          className={`font-bold text-lg transition-transform ${
            drop ? 'rotate-90' : 'rotate-0'
          }`}
        />{' '}
        {ele?.Title}
      </p>
      <div className='grid grid-cols-2 mb-2 gap-2'>
        {/* files */}
        {drop && (
          <div className='border-2 border-blue-400'>
            <p className='pl-5 underline decoration-dotted'>Files: </p>
            {filesUrl?.length == 0 && (
              <p className='mx-14 text-red-600'>No files</p>
            )}
            {filesUrl?.map((val, uid) => {
              return (
                <>
                  <p
                    key={`${val?.id}${uid}`}
                    className='underline mx-14 w-fit hover:text-rose-600'
                    onClick={() => toggleViewer(reqImgWrapper(val?.url))}
                    target='_blank'
                  >
                    {val?.id}
                  </p>
                  {image.show && (
                    <ImageViewer link={image.link} toggle={toggleViewer} />
                  )}
                </>
              );
            })}
          </div>
        )}
        {/* drive links */}
        {drop && (
          <div className='border-2 border-blue-400'>
            <p className='pl-5 underline decoration-dotted'>Drive Links: </p>
            {driveLinks?.length == 0 && (
              <p className='mx-14 text-red-600'>No Links</p>
            )}
            {driveLinks?.map((val, uid) => {
              return (
                <a
                  key={`${val}${uid}`}
                  className='underline mx-14 w-fit hover:text-purple-700'
                  href={val}
                  target='_blank'
                >
                  {val}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const ImageViewer = ({ link, toggle }) => {
  return (
    <div className='bg-gradient-to-tr from-black/90 to-slate-900/90 backdrop-blur-lg fixed top-0 left-0 w-screen h-screen p-40 z-50 flex justify-center items-center'>
      <button
        type='button'
        className='z-50 absolute top-5 right-5'
        onClick={() => toggle('')}
      >
        <HiPlusCircle
          fontSize={'2rem'}
          className='rotate-45 text-red-500 hover:text-rose-400 rounded-full'
        />
      </button>
      {link.includes('.pdf') ? (
        <iframe
          className='w-full h-full'
          src={link}
          height={'90%'}
          width={'85%'}
          frameborder='0'
        ></iframe>
      ) : (
        <img
          className='aspect-auto w-auto min-w-[300px] mx-auto rounded-xl shadow-xl shadow-slate-600/20'
          src={link}
          width={600}
          height={600}
        />
      )}
    </div>
  );
};
export default Notes;
