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
    email: '',
    mobileNo: '',
    avatar: '',
    img: '',
    address: '',
    fbId: '',
    enrolledCourses: [
      {
        name: 'Chemistry course 1',
        id: 'chemi1',
        img: '',
        deadline: '',
        rating: 5,
        progress: 30,
      },
    ],
    activeCourses: [
      {
        name: 'Chemistry course 1',
        id: 'chemi1',
        img: '',
        deadline: '',
        rating: 5,
        progress: 30,
      },
      {
        name: 'Chemistry course 2',
        id: 'chemi2',
        img: '',
        deadline: '',
        rating: 5,
        progress: 40,
      },
      {
        name: 'Chemistry course 3',
        id: 'chemi3',
        img: '',
        deadline: '',
        rating: 4,
        progress: 50,
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
        <div className='grid md:grid-cols-[auto,1fr]'>
          <Nav />
          <div className='pt-6 md:pl-6 w-full'>
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
