import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import Home from "./pages/Home"
import StudentApp from "./pages/StudentApp"
import StudentHome from "./pages/StudentHome"
import HRPortal from "./pages/HRPortal"
import ErrorPage from "./pages/ErrorPage"
import QRPortal from "./pages/QRPortal"
import PasswordPortal from "./pages/PasswordPortal"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: 'student/app',
    element: <StudentApp/>
  },
  {
    path: 'student/home',
    element: <StudentHome/>
  },
  {
    path: 'hr',
    element: <HRPortal/>
  },
  {
    path: 'qr',
    element: <QRPortal/>
  },
  {
    path: 'password-reset',
    element: <PasswordPortal/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
