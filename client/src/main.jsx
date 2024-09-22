import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ReactDOM } from 'react';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorPage from './Pages/ErrorPage.jsx';
import Home from './Pages/Home.jsx';
import ClientLogin from './Pages/ClientLogin.jsx';
import ClientSignUp from './Pages/ClientSignup.jsx';
import Dashboard from './Pages/dashboard/Dashboard.jsx';
import GeneralInfo from './Pages/dashboard/GeneralInfo.jsx';
import MyProfile from './Pages/dashboard/MyProfile.jsx';
import EnrolledCourses from './Pages/dashboard/EnrolledCourses.jsx';
import AllCourses from './Pages/AllCourses.jsx';
import Coursedetails from './Pages/CourseDetails.jsx';
import CourseClientdetails from './Pages/CourseClientDetails.jsx';
import ChangePass from './Pages/Password/ChangePass.jsx';
import About from './Pages/About.jsx';
import PaymentHistory from './Pages/dashboard/PaymentHistory.jsx';
import AdminDashboard from './Pages/admin/AdminDashboard.jsx';
import Admin from './Pages/admin/Admin.jsx';
import AdminLogin from './Pages/admin/AdminLogin.jsx';
import AdminCourse from './Pages/admin/AdminCourse.jsx';
import AdminChat from './Pages/Admin/Chat.jsx';
import EachCourse from './Pages/admin/EachCourse.jsx';

import AddCourse from './Components/Admin/addcourse/addCourse.jsx';
import Stundet from './Components/Admin/student/student.jsx';
import AllCourse from './Components/Admin/courses/AllCourses.jsx';
import EnrollCourse from './Components/CourseDetails/EnrollCourse.jsx';
import Gallery from './Components/Admin/gallery/index.jsx';
import AddImage from './Components/Admin/gallery/AddImage.jsx';
import UpdateImage from './Components/Admin/gallery/UpdateImage.jsx';
import FAQPage from './Components/Admin/faq/index.jsx';
import AddFaq from './Components/Admin/faq/AddFaq.jsx';
import UpdateFaq from './Components/Admin/faq/UpdateFaq.jsx';
import MCQExam from './Components/ClientCourseDetails/exams/MCQExam.jsx';
import EnrollStatus from './Components/CourseDetails/EnrollStatus.jsx';
import CQExam from './Components/ClientCourseDetails/exams/CQExam.jsx';
import ViewQuestion from './Components/ClientCourseDetails/exams/ViewQuestion.jsx';
import ChatBox from './Components/ClientCourseDetails/Discussion/chat.jsx';
import ExamPage from './Components/ClientCourseDetails/exams/ExamPage.jsx';
import RecordVideo from './Components/ClientCourseDetails/Records/Record.jsx';
import Details from './Components/ClientCourseDetails/Details.jsx';
import ContactPage from './Pages/ContactPage.jsx';
import ContactAdmin from './Pages/admin/Contact.jsx';
import YTPlayer from './Components/YTPlayer/YTPlayer.jsx';
import Orders from './Pages/admin/Orders.jsx';
import AdminExams from './Pages/admin/AdminExams.jsx';
import ExamLists from './Components/Admin/Exams/ExamLists.jsx';
import StudentLists from './Components/Admin/Exams/StudentLists.jsx';
import WrittenEvaluation from './Pages/admin/WrittenEvaluation.jsx';
import TermsPolicy from './Pages/TermsPolicy.jsx';
import ViewResult from './Components/ClientCourseDetails/exams/ViewResult.jsx';
// import ZoomEntry from './Pages/zoom/zoomEntry.jsx';
// import ZoomWeb from './Pages/zoom/zoomWeb.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/login',
        element: <ClientLogin />,
      },
      {
        path: '/signup',
        element: <ClientSignUp />,
      },
      {
        path: '/contact-us',
        element: <ContactPage />,
      },
      {
        path: '/terms-policy',
        element: <TermsPolicy />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <GeneralInfo />,
          },
          {
            path: '/dashboard/my-profile',
            element: <MyProfile />,
          },
          {
            path: '/dashboard/enrolled-courses',
            element: <EnrolledCourses />,
          },
          {
            path: '/dashboard/payment-history',
            element: <PaymentHistory />,
          },
        ],
      },
      {
        path: '/courses/:id',
        element: <Coursedetails />,
      },
      // -> if purchased, client view course page ->
      {
        path: '/courses/onClientReq/:cid',
        element: <CourseClientdetails />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Details />,
          },
          {
            path: 'details',
            element: <Details />,
          },
          {
            path: 'chat',
            element: <ChatBox isAdmin={false} />,
          },
          {
            path: '/courses/onClientReq/:cid/exam',
            element: <ExamPage />,
          },
          {
            path: 'record',
            element: <RecordVideo />,
          },
          {
            path: '/courses/onClientReq/:cid/record/:videoId',
            element: <YTPlayer />,
          },
        ],
      },
      // take exam
      {
        path: '/courses/onClientReq/:cid/exam/quiz/:examid',
        element: <MCQExam />,
      },
      {
        path: '/courses/onClientReq/:cid/exam/written/:examid',
        element: <CQExam />,
      },
      {
        path: '/courses/onClientReq/:cid/exam/viewQuestion/:examid',
        element: <ViewQuestion />,
      },
      {
        path: '/courses/onClientReq/:cid/exam/viewResult/:examid',
        element: <ViewResult />,
      },
      // <- if purchased, client view course page <-

      //enrollment page
      {
        path: '/courses/:id/enroll',
        element: <EnrollCourse />,
      },
      {
        path: '/courses/enroll/payment/:courseId/:status',
        element: <EnrollStatus />,
      },
      {
        path: '/courses',
        element: <AllCourses />,
      },
      // {
      //   path: '/course/:id/class',
      //   element: <ZoomWeb />,
      // },
      {
        path: '/change-pass',
        element: <ChangePass />,
      },
    ],
  },
  {
    path: '/abs-admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/abs-admin',
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: '/abs-admin/addcourse',
        element: <AddCourse />,
      },
      {
        path: '/abs-admin/orders/:mode', //pending||verified
        element: <Orders />,
      },
      {
        path: '/abs-admin/students',
        element: <Stundet />,
      },
      {
        path: '/abs-admin/public-contact',
        element: <ContactAdmin />,
      },
      {
        path: '/abs-admin/exams/:courseVal/:mode',
        element: <AdminExams />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ExamLists />,
          },
          {
            path: 'results/:examId',
            element: <StudentLists />,
          },
        ],
      },
      {
        path: '/abs-admin/exams/:examId/written/evaluation/:clientId',
        element: <WrittenEvaluation />,
      },
      {
        path: '/abs-admin/course',
        element: <AllCourse />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AdminCourse />,
          },
          {
            path: ':id',
            element: <EachCourse />,
          },
        ],
      },
      {
        path: 'chat/:id',
        element: <AdminChat />,
      },
      {
        path: 'gallery',
        errorElement: <ErrorPage />,
        element: <Gallery />,
        children: [
          {
            path: 'add-image',
            element: <AddImage />,
          },
          {
            path: 'update-image',
            element: <UpdateImage />,
          },
        ],
      },
      {
        path: 'faq',
        errorElement: <ErrorPage />,
        element: <FAQPage />,
        children: [
          {
            path: 'add-faq',
            element: <AddFaq />,
          },
          {
            path: 'update-faq',
            element: <UpdateFaq />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>

  // </React.StrictMode>
);
