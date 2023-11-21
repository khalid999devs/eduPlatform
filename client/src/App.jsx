import { Outlet } from 'react-router-dom';
import Navbar from './Components/Nav/Navbar';
import FooterMain from './Components/Footer/FooterMain';
import { createContext, useContext, useState } from 'react';
import './axios/global';

const Context = createContext('');

function App() {
  const [user, setUser] = useState({
    name: 'Example FullNamefsdhdk',
    email: 'example@gmail.com',
    mobileNo: '01XXXXXXXXX',
    username: 'example012',
    avatar: '',
    img: '',
  });

  const logout = () => {
    console.log('logged out');
    setUser((user) => {
      return { ...user, username: '' };
    });
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      <div className='w-full min-h-screen bg-primary-main'>
        <Navbar />

        <div className='m-auto max-w-6xl w-[100%]'>
          <Outlet />
        </div>

        <FooterMain />
      </div>
    </Context.Provider>
  );
}

export const ContextConsumer = () => {
  return useContext(Context);
};

export default App;
