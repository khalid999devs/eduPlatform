import { useState, createContext, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../Components/ClientDashboard/Nav";
import Header from "../../Components/ClientDashboard/Header";
import { getClient } from "../../axios/getClientInfo";

const ProfileContext = createContext("");

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState({
    id: 0,
    userName: "",
    fullName: "",
    email: "",
    role: "",
    image: "",
    phone: "",
    clientcourses: [
      {
        id: 0,
        courseId: 0,
        clinetId: 0,
      },
    ],
  });
  useEffect(() => {
    getClient(setUserProfile).then((_) => {});
    console.log("bhbhb");
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      <div className="px-5 m-auto my-10 ">
        <Header />
        <div className="grid md:grid-cols-[auto,1fr]">
          <Nav />
          <div className="pt-6 md:pl-6 w-full">
            <Outlet context={userProfile} />
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
