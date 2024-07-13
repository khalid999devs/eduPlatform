import { useState } from 'react';
import { sendMessage } from '../axios/sendContact';
const ContactPage = () => {
  const [contactInfo, setInfo] = useState({
    name: '',
    phone: '',
    email: '',
    institute: '',
    message: '',
  });
  const [response, setResponse] = useState('');
  const [load, setLoad] = useState(false);
  function handleData(e) {
    setInfo((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      contactInfo.name.length > 0 &&
      contactInfo.email.length > 0 &&
      contactInfo.phone.length > 0 &&
      contactInfo.institute.length > 0 &&
      contactInfo.message.length > 0
    ) {
      setLoad(true);
      sendMessage(contactInfo, setResponse)
        .then((res) => {
          setLoad(false);
          setInfo({
            name: '',
            phone: '',
            email: '',
            institute: '',
            message: '',
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoad(false);
        });
    } else if (contactInfo.message.length < 1) {
      setResponse('You did not write any message to send!');
    }
  }

  return (
    <div className='relative rounded-2xl bg-gradient-to-tr from-primary-main to-onPrimary-main grid grid-cols-1 md:grid-cols-2 justify-between gap-10 p-10 shadow-2xl inset-y-5 shadow-primary-dark overflow-hidden z-20'>
      {/* absolute bg */}
      <div className='absolute rounded-full w-[400px] h-[400px] -rotate-45 left-12 top-2/3 -z-10 bg-gradient-to-t from-yellow-400/60 to-orange-700 anime-rot'></div>

      {/* top-left panel */}
      <div className='flex justify-center items-start flex-col'>
        <p className='text-white font-bold capitalize text-4xl underline border ring-4 ring-yellow-500 p-2'>
          Contact Us
        </p>
        <p className='my-5'>
          Feel like contacting us? Submit your queries here and we will get back
          to you as soon as possible.
        </p>
      </div>
      {/* right-bottom panel */}
      <div className='rounded-2xl bg-white shadow-2xl shadow-slate-900/50 p-7'>
        <h2 className='text-gray-700 font-semibold text-xl'>
          Send us a Message
        </h2>
        <form className='grid grid-cols-1 my-2 text-sm' onSubmit={handleSubmit}>
          <section className='border-b-2 py-2 my-5'>
            <input
              className='w-full bg-transparent border-none outline-none'
              required
              type='text'
              name='name'
              autoComplete='off'
              id='name'
              placeholder='Name'
              value={contactInfo.name}
              onChange={handleData}
            />
          </section>
          <section className='border-b-2 py-2 my-5'>
            <input
              className='w-full bg-transparent border-none outline-none'
              required
              type='email'
              name='email'
              autoComplete='off'
              id='email'
              placeholder='Email'
              value={contactInfo.email}
              onChange={handleData}
            />
          </section>
          <section className='border-b-2 py-2 my-5'>
            <input
              className='w-full bg-transparent border-none outline-none'
              required
              type='tel'
              name='phone'
              autoComplete='off'
              id='phone'
              placeholder='Phone (017xxxxxxxx)'
              maxLength={11}
              value={contactInfo.phone}
              onChange={handleData}
            />
          </section>
          <section className='border-b-2 py-2 my-5'>
            <input
              className='w-full bg-transparent border-none outline-none'
              type='text'
              required
              name='institute'
              autoComplete='off'
              id='institute'
              placeholder='Institute'
              value={contactInfo.institute}
              onChange={handleData}
            />
          </section>
          <section className='border-b-2 py-2 my-5 relative'>
            <textarea
              className='w-full bg-transparent border-none outline-none resize-none'
              rows={3}
              type='text'
              required
              name='message'
              autoComplete='off'
              id='message'
              placeholder='Message'
              value={contactInfo.message}
              onChange={handleData}
            />
          </section>
          {response.length > 0 ? (
            <div>
              <p className='text-black border-l-2 border-green-400 font-bold text-left px-2 py-1 mb-5'>
                {response}
              </p>
            </div>
          ) : null}
          <button
            className='w-full bg-yellow-400 text-white rounded-full py-3 text-base hover:shadow-lg hover:shadow-yellow-400/70 transition-all font-semibold'
            type='submit'
            disabled={load}
          >
            {load ? <Spinner /> : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};
const Spinner = () => {
  return (
    <div className='w-10 h-10 mx-auto rounded-full border-4 border-yellow-500 border-b-orange-500 anime-rot-fast '></div>
  );
};
export default ContactPage;
