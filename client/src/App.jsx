import { Outlet } from 'react-router-dom';
import Navbar from './Components/Nav/Navbar';
import FooterMain from './Components/Footer/FooterMain';
import { createContext, useContext, useEffect, useState } from 'react';
import './axios/global';
import { useFetch } from './Custom_hooks/useFetch';
import reqs from './assets/requests';
import axios from 'axios';

const Context = createContext('');

function App() {
  const [user, setUser] = useState({
    is: 0,
    name: '',
    email: '',
    mobileNo: '',
    username: '',
    avatar: '',
    img: '',
  });
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    redirect: '',
  });
  const [contextTrigger, setContextTrigger] = useState(false);

  const logout = () => {
    console.log('logged out');
    setUser((user) => {
      return { ...user, username: '' };
    });
  };

  const setClientUser = (data) => {
    setUser((user) => {
      return {
        ...user,
        id: data.id,
        name: data.fullName,
        username: data.userName,
        avatar: data.img,
        img: data.img,
        email: data.email,
        mobileNo: data.phone,
      };
    });
  };

  useEffect(() => {
    axios
      .get(reqs.IS_CLIENT_VALID, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed) {
          setClientUser(res.data.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
        setLoading(false);
      });
  }, [contextTrigger]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        logout,
        settings,
        setSettings,
        contextTrigger,
        setContextTrigger,
        setClientUser,
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
