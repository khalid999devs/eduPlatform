import React from "react";
import ReactDOM from "react-dom/client";
// import { ReactDOM } from 'react';
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Home from "./Pages/Home.jsx";
import ClientLogin from "./Pages/ClientLogin.jsx";
import ClientSignUp from "./Pages/ClientSignup.jsx";
import Dashboard from "./Pages/dashboard/Dashboard.jsx";
import GeneralInfo from "./Pages/dashboard/GeneralInfo.jsx";
import MyProfile from "./Pages/dashboard/MyProfile.jsx";
import EnrolledCourses from "./Pages/dashboard/EnrolledCourses.jsx";
import AllCourses from "./Pages/AllCourses.jsx";
import Coursedetails from "./Pages/CourseDetails.jsx";
import CourseClientdetails from "./Pages/CourseClientDetails.jsx";
import ChangePass from "./Pages/Password/ChangePass.jsx";
import About from "./Pages/About.jsx";
import PaymentHistory from "./Pages/dashboard/PaymentHistory.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import Admin from "./Pages/admin/Admin.jsx";
import AdminLogin from "./Pages/admin/AdminLogin.jsx";
import AdminCourse from "./Pages/admin/AdminCourse.jsx";
import AdminChat from "./Pages/Admin/Chat.jsx";
import EachCourse from "./Pages/admin/EachCourse.jsx";

import AddCourse from "./Components/Admin/addcourse/addCourse.jsx";
import Stundet from "./Components/Admin/student/student.jsx";
import AllCourse from "./Components/Admin/courses/AllCourses.jsx";
import EnrollCourse from "./Components/CourseDetails/EnrollCourse.jsx";
import Gallery from "./Components/Admin/gallery/index.jsx";
import AddImage from "./Components/Admin/gallery/AddImage.jsx";
import UpdateImage from "./Components/Admin/gallery/UpdateImage.jsx";
import FAQPage from "./Components/Admin/faq/index.jsx";
import AddFaq from "./Components/Admin/faq/AddFaq.jsx";
import UpdateFaq from "./Components/Admin/faq/UpdateFaq.jsx";
import MCQExam from './Components/ClientCourseDetails/exams/MCQExam.jsx'
import CQExam from './Components/ClientCourseDetails/exams/CQExam.jsx'
import ViewQuestion from "./Components/ClientCourseDetails/exams/ViewQuestion.jsx";
// import ZoomEntry from './Pages/zoom/zoomEntry.jsx';
// import ZoomWeb from './Pages/zoom/zoomWeb.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <ClientLogin />,
      },
      {
        path: "/signup",
        element: <ClientSignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <GeneralInfo />,
          },
          {
            path: "/dashboard/my-profile",
            element: <MyProfile />,
          },
          {
            path: "/dashboard/enrolled-courses",
            element: <EnrolledCourses />,
          },
          {
            path: "/dashboard/payment-history",
            element: <PaymentHistory />,
          },
        ],
      },
      {
        path: "/courses/:id",
        element: <Coursedetails />,
      },
      {
        path: "/courses/onClientReq/:id",
        element: <CourseClientdetails />,
      },
      {
        path: "/courses/onClientReq/:cid/exam/quiz/:examid",
        element: <MCQExam />,
      },
      {
        path: "/courses/onClientReq/:cid/exam/written/:examid",
        element: <CQExam />,
      },
      {
        path: "/courses/onClientReq/:cid/viewQuestion/:examid",
        element: <ViewQuestion />,
      },
      {
        path: "/courses/:id/enroll",
        element: <EnrollCourse />,
      },
      {
        path: "/courses",
        element: <AllCourses />,
      },
      // {
      //   path: '/course/:id/class',
      //   element: <ZoomWeb />,
      // },
      {
        path: "/change-pass",
        element: <ChangePass />,
      },
    ],
  },
  {
    path: "/abs-admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "/abs-admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/abs-admin/addcourse",
        element: <AddCourse />,
      },
      {
        path: "/abs-admin/students",
        element: <Stundet />,
      },

      {
        path: "/abs-admin/course",
        element: <AllCourse />,
        children: [
          {
            index: true,
            element: <AdminCourse />,
          },
          {
            path: ":id",
            element: <EachCourse />,
          },
        ],
      },
      {
        path: "chat/:id",
        element: <AdminChat />,
      },
      {
        path: "gallery",
        errorElement: <ErrorPage />,
        element: <Gallery />,
        children: [
          {
            path: "add-image",
            element: <AddImage />,
          },
          {
            path: "update-image",
            element: <UpdateImage />,
          },
        ],
      },
      {
        path: "faq",
        errorElement: <ErrorPage />,
        element: <FAQPage />,
        children: [
          {
            path: "add-faq",
            element: <AddFaq />,
          },
          {
            path: "update-faq",
            element: <UpdateFaq />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
