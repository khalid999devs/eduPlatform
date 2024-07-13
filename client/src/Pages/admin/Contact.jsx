import { useEffect, useState } from 'react';
import { getMessage, sendReply } from '../../axios/sendContact';
import { MdClose } from 'react-icons/md';

const ContactAdmin = () => {
  const [messages, setmsg] = useState([]);
  const [inboxId, setInbox] = useState(null);
  useEffect(() => {
    getMessage(setmsg);
  }, []);

  return (
    <div>
      <h2 className='text-center font-bold text-4xl underline my-10'>
        Contact Panel
      </h2>
      <div className='flex flex-col lg:flex-row'>
        <div className='h-auto max-h-[60vh]  overflow-y-scroll w-fit mx-auto'>
          <table>
            <thead className='sticky top-0 left-0'>
              <tr className='bg-slate-600 text-white text-sm'>
                <th className='uppercase border-2 p-2'>ID</th>
                <th className='uppercase border-2 p-2'>Name</th>
                <th className='uppercase border-2 p-2'>Email</th>
                <th className='uppercase border-2 p-2'>Phone</th>
                <th className='uppercase border-2 p-2'>Institute</th>
                <th className='uppercase border-2 p-2'>Status</th>
              </tr>
            </thead>
            <tbody className='h-auto overflow-y-scroll'>
              {messages?.map((msg, id) => {
                return (
                  <tr
                    key={`msg-id${id}`}
                    className={`text-center text-sm transition-colors hover:bg-slate-400 cursor-default ${
                      msg?.id === inboxId
                        ? 'bg-yellow-300 pointer-events-none'
                        : msg?.replied
                        ? 'bg-green-200'
                        : 'bg-white'
                    }`}
                    onClick={() => setInbox(msg?.id)}
                  >
                    <td>{id + 1}</td>
                    <td className='p-2'>{msg?.name}</td>
                    <td className='p-2'>{msg?.email}</td>
                    <td>{msg?.phone}</td>
                    <td>{msg?.institute}</td>
                    <td
                      className={`${
                        msg?.replied ? 'text-green-800' : 'text-orange-600'
                      }`}
                    >
                      {msg?.replied ? 'Replied' : 'Pending'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {inboxId?.length === 0 ? null : (
          <SenderInfo
            allmsg={messages}
            msgId={inboxId}
            setClose={setInbox}
            setmsg={setmsg}
          />
        )}
      </div>
    </div>
  );
};
const SenderInfo = ({ msgId, allmsg, setClose, setmsg }) => {
  const data = allmsg?.find((ele) => ele?.id === msgId);
  const [msg, setMsg] = useState({ text: '', subject: '' });
  const [res, setResponse] = useState('');
  const [loader, setLoader] = useState(false);

  function handleReply(e) {
    e.preventDefault();
    setLoader(true);
    sendReply(
      {
        text: msg.text,
        subject: msg.subject,
        name: data?.name,
        email: data?.email,
        msgId: data?.id,
      },
      setResponse,
      setLoader,
      setmsg
    );
  }

  useEffect(() => {
    setResponse('');
  }, [msgId]);
  if (msgId === null) return;
  return (
    <section className='relative p-5 ring rounded-lg m-5 flex-1 text-base bg-white'>
      <MdClose
        className='bg-slate-200 shadow-sm rounded-full absolute right-5 top-5 hover:bg-red-400 hover:text-white cursor-pointer'
        enableBackground={'true'}
        onClick={() => setClose('')}
      />

      <p>Sender Info:</p>
      <ul className='my-5 grid grid-cols-1 gap-2 -space-y-1 text-sm'>
        <li className='font-semibold'>Name: {data?.name}</li>
        <li className='font-semibold'>Email: {data?.email}</li>
        <li className='text-base'>
          Message: <span>{data?.message}</span>
        </li>
      </ul>

      <form
        className='border rounded-lg p-4 gap-2 flex flex-col'
        onSubmit={handleReply}
      >
        <section>
          Reply to:
          <ul className='ml-10 text-sm'>
            <li>
              Name: <u>{data?.name}</u>
            </li>
            <li>
              Email: <u>{data?.email}</u>
            </li>
          </ul>
        </section>
        <section className='grid grid-cols-4 gap-5 text-sm'>
          <label htmlFor='subject'>Subject: </label>
          <input
            className='bg-transparent border-b-2 border-b-black/50 outline-none col-span-3 p-px'
            type='text'
            name='subject'
            id='subject'
            placeholder='give a subject'
            value={msg.subject}
            onChange={(e) =>
              setMsg((pre) => ({ ...pre, subject: e.target.value }))
            }
          />
        </section>
        <section className='grid grid-cols-4 gap-5 text-sm'>
          <label htmlFor='text'>Message: </label>
          <textarea
            className='bg-transparent border-b-2 border-b-black/50 outline-none resize-none col-span-3 p-px'
            type='text'
            rows={5}
            name='text'
            id='text'
            required
            placeholder='Type a message for your client'
            value={msg.text}
            onChange={(e) =>
              setMsg((pre) => ({ ...pre, text: e.target.value }))
            }
          />
        </section>
        {res?.length > 0 ? (
          <p className='border-l-2 border-green-400 pl-2 mx-5'>{res}</p>
        ) : null}
        <button
          type='submit'
          className='m-4 px-4 py-2 bg-onPrimary-main text-primary-main rounded-md hover:bg-onPrimary-light hover:text-onPrimary-main transition-colors flex justify-center gap-3 items-center'
          disabled={loader}
        >
          Send {loader && <Spinner />}
        </button>
      </form>
    </section>
  );
};

const Spinner = () => {
  return (
    <div className='w-6 h-6 mx-3 rounded-full border-4 border-blue-200 border-b-blue-500 anime-rot-fast '></div>
  );
};
export default ContactAdmin;
