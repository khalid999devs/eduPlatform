import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../Components/ClientDashboard/Nav';
import Header from '../../Components/ClientDashboard/Header';
import { ContextConsumer } from '../../App';

const ProfileContext = createContext('');

const Dashboard = () => {
  const { user } = ContextConsumer();
  const [userProfile, setUserProfile] = useState({
    name: 'Example FullNamefsdhdk',
    username: 'example012',
    avatar: '',
    img: '',
    address: '',
    enrolledCourses: [
      {
        name: 'Chemistry course 1',
        id: 'chemi1',
        img: '',
        deadline: '',
      },
    ],
  });

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      <div className='px-5 m-auto my-10 '>
        <Header />
        <div className='grid grid-cols-[auto,1fr]'>
          <Nav />
          <div className='pt-6 pl-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export const ProfileContextConsumer = () => {
  return useContext(ProfileContext);
};

export default Dashboard;
