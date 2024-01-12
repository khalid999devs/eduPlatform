import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../Components/Admin/admin/Navbar";
import reqs from "../../assets/requests";

const Context = createContext("");

const Admin = () => {
  const [user, setUser] = useState({
    id: 0,
    userName: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [isAdmin, setadmin] = useState(false);
  const [adminTrigger, setAdminTrigger] = useState(false);
  const [settings, setSettings] = useState({
    redirect: "/admin/login",
  });
  const logout = () => {
    axios
      .get(reqs.ADMIN_LOGOUT, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setUser((user) => {
            return { ...user, userName: "", role: "" };
          });
          window.location.reload();
        } else {
          throw new Error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setAdminUser = (data) => {
    setUser((user) => {
      return {
        ...user,
        id: data.id,
        userName: data.userName,
        role: data?.role,
      };
    });
    setadmin((pre) => data?.role === "admin");
  };
  useEffect(() => {
    axios
      .get(reqs.IS_ADMIN_VALID, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setAdminUser(res.data.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
        setLoading(false);
      });
  }, [adminTrigger]);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isAdmin,
        logout,
        settings,
        setSettings,
        adminTrigger,
        setAdminTrigger,
        setAdminUser,
      }}
    >
      <div className="bg-transparent p-5 rounded-lg flex justify-between items-start relative h-screen overflow-y-hidden bg-slate-100">
        <AdminNavbar />

        <main className="relative h-full transition-all duration-200 ease-in-out mx-auto w-auto flex-1">
          <Outlet context={[isAdmin, user]} />
        </main>
      </div>
    </Context.Provider>
  );
};
export const AdminConsumer = () => {
  return useContext(Context);
};
export default Admin;
