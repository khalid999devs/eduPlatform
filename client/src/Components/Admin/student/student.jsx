import { MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchCourse, fetchStudents } from '../../../axios/global';

function Stundet() {
  const [phone, setPhone] = useState('');
  const [isAdmin] = useOutletContext();
  const [students, setData] = useState([]);
  const [skip, setskip] = useState(0);
  const [row, setrow] = useState(50);


  useEffect(() => {
    fetchStudents(skip, row, setData).then((res) => {
      if (res) setData(res.resutl);
      // console.log(students);
    });
  }, [skip, row]);

  if (isAdmin)
    return (
      <>
        <div className='px-5 flex flex-col h-full'>
          <h2 className='text-center text-darkText text-4xl font-semibold mb-10'>
            Student page
          </h2>
          {/* serach box */}
          <div className='flex justify-between items-center'>
            {/* footer */}
            <form
              className='flex items-center justify-center p-10 w-auto'
              onSubmit={(e) => e.preventDefault()}
            >
              <section className='flex items-center justify-between rounded-md ring ring-gray-600/50 p-2 mx-4'>
                <input
                  className='bg-transparent outline-none border-none dark:text-darkText'
                  placeholder='Search phone...'
                  type='text'
                  onChange={(e) => setPhone(e.target.value)}
                />
                <MdSearch className='inline-block text-3xl text-gray-600/70 ' />
              </section>
            </form>
          </div>

          {/* sutdent lists */}
          <div className='max-w-6xl h-auto w-full mx-auto border border-root_bluish'>
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
                    Address
                  </th>
                  <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                    Fb
                  </th>
                  <th className='sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100'>
                    Reg Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((val) => val.phone.includes(phone))
                  .map((student, id, arr) => {
                    return (
                      <StudentList
                        id={student?.id}
                        sid={id}
                        key={id}
                        name={student.fullName}
                        email={student.email}
                        phone={student.phone}
                        arr={arr}
                        address={student.address}
                        fb={student.fb}
                        regDate={student.createdAt}
                      />
                    );
                  })}

                {/* <!-- Add more rows for additional students --> */}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}

export default Stundet;
const StudentList = ({
  id,
  sid,
  avatar,
  name,
  email,
  phone,
  arr,
  address,
  fb,
  regDate,

}) => {
  return (
    <tr
      key={id}
      className={`hover:bg-gray-500/20 h-fit row-span-1 transition-colors duration-100 ease-in border-b ${id != arr.length - 1 ? ' border-root_bluish' : 'border-transparent'
        } `}

    >
      <td className='py-2 text-center'>{sid + 1}</td>
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
      <td className='py-2 text-left'>{email || '-'}</td>
      <td className='p-2 text-justify'>{phone || '-'}</td>
      <td className='p-2 text-justify'>{address || '-'}</td>
      <td className='p-2 text-justify'>{fb || '-'}</td>
      <td className='p-2 text-justify'>{new Date(regDate).toDateString()}</td>
    </tr>
  );
};
