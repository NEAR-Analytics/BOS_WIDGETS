// import React, { useState } from 'react'
// import ReactDOM from 'react-dom/client'

// import App from './App.jsx'
// import Register from './pages/Register.jsx'
// import SignIn from './pages/SignIn.jsx'
// import Result from './pages/Result.jsx'
// import Admin from './pages/AdminHome.jsx'
// import Manage from './pages/Manage.jsx'

// import './index.css'
// // import 'bootstrap/dist/css/bootstrap.css'

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Widget src="abnakore.near/widget/App.jsx" props={props} />,
  },
  {
    path: "/register",
    element: <Widget src="abnakore.near/widget/Register.jsx" props={props} />,
  },
  {
    path: "/signin",
    element: <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />,
  },
  {
    path: "/result",
    element: <Widget src="abnakore.near/widget/Result.jsx" props={props} />,
  },
  {
    path: "/admin",
    element: <Widget src="abnakore.near/widget/AdminHome.jsx" props={props} />,
  },
  {
    path: "/admin/manage_candidates",
    element: (
      <Widget src="abnakore.near/widget/ManageCandidates.jsx" props={props} />
    ),
  },
  {
    path: "/admin/manage_parties",
    element: (
      <Widget src="abnakore.near/widget/ManageParties.jsx" props={props} />
    ),
  },
]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

return <RouterProvider router={router} />;
