import React from 'react';
import { createHashRouter, useRoutes } from 'react-router-dom';

import Home from './pages/home/Home'
import ErrorPage from './pages/ErrorPage'
import FilePage from './pages/file/list'
import JsErrorPage from './pages/jserror/list'
import SlinkPage from './pages/slink/list'
import RankPage from './pages/githubrank/list'

let router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/jserror/list',
        element: <JsErrorPage />,
      },
      {
        path: '/slink/list',
        element: <SlinkPage />,
      },
      {
        path: '/file/list',
        element: <FilePage />,
      },
      {
        path: '/rank',
        element: <RankPage />,
      },
      // {
      //   path: '/threejs',
      //   element: <ThreejsPage />,
      // },
    ]
  },
])


export default router;
