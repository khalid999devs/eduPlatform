import { Outlet } from 'react-router-dom';
import Navbar from './Components/Nav/Navbar';
import FooterMain from './Components/Footer/FooterMain';
import { createContext, useContext, useEffect, useState } from 'react';
import './axios/global';
import reqs from './assets/requests';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Context = createContext('');

function App() {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    userName: '',
    username: '',
    avatar: '',
    img: '',
    role: '',
    address: '',
    enrolledCourses: [],
  });
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    redirect: '',
  });
  const [contextTrigger, setContextTrigger] = useState(false);

  const resetUser = () => {
    setUser((user) => {
      return {
        ...user,
        id: null,
        name: '',
        email: '',
        phone: '',
        userName: '',
        username: '',
        avatar: '',
        img: '',
        role: '',
        address: '',
        enrolledCourses: [],
      };
    });
  };
  const logout = () => {
    axios
      .get(reqs.CLIENT_LOGOUT, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          resetUser(null);
          setContextTrigger(!contextTrigger);
        } else {
          throw new Error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setClientUser = (data) => {
    setUser((user) => {
      return {
        ...user,
        id: data?.id,
        name: data?.fullName,
        username: data?.userName,
        userName: data?.userName,
        avatar: data?.image,
        img: data?.image,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        role: data?.role,
        enrolledCourses: data?.clientcourses,
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(reqs.IS_CLIENT_VALID, { withCredentials: true })
      .then((res) => {
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

  const ogImageUrl = '/Images/bannerPic.jpg';

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
        loading,
      }}
    >
      {/* SEO optimization */}
      <Helmet>
        {/* Open Graph (OG) meta tags */}
        <meta property='og:title' content='ChemGenie' />
        <meta
          property='og:description'
          content='Unlock the magic of chemistry with ChemGenie! We offer top-notch academic support, admission test prep, and Olympiad resources. Dive into interactive classes, detailed notes, online MCQs, model tests, and recorded ZOOM/FB Live solutions. Experience education that goes beyond grades—ignite your passion for chemistry with well-structured, enjoyable learning. Let us be your giant in fulfilling academic dreams and achieving success.'
        />
        <meta property='og:url' content='/' />
        <meta
          property='og:image'
          content={import.meta.env.VITE_PUBLIC_URL + '/Images/bannerPic.jpg'}
        />
        <meta property='og:type' content='website' />

        {/* Twitter meta tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='ChemGenie' />
        <meta
          name='twitter:description'
          content='Unlock the magic of chemistry with ChemGenie! We offer top-notch academic support, admission test prep, and Olympiad resources. Dive into interactive classes, detailed notes, online MCQs, model tests, and recorded ZOOM/FB Live solutions. Experience education that goes beyond grades—ignite your passion for chemistry with well-structured, enjoyable learning. Let us be your giant in fulfilling academic dreams and achieving success.'
        />
        <meta
          name='twitter:image'
          content={import.meta.env.VITE_PUBLIC_URL + '/Images/bannerPic.jpg'}
        />

        {/* main browser meta tags */}
        <title>ChemGenie</title>
        <meta
          name='description'
          content='Unlock the magic of chemistry with ChemGenie! We offer top-notch academic support, admission test prep, and Olympiad resources. Dive into interactive classes, detailed notes, online MCQs, model tests, and recorded ZOOM/FB Live solutions. Experience education that goes beyond grades—ignite your passion for chemistry with well-structured, enjoyable learning. Let us be your giant in fulfilling academic dreams and achieving success.'
        />
        <link rel='canonical' href={`/`} />
      </Helmet>

      {/* main web contents */}
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
