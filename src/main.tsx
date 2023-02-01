import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
  useRoutes,
  Outlet
} from "react-router-dom";
import './styles/common.less'
import './styles/app.less'

// import router from './router'
import LeftNav from './components/leftnav/Leftnav' //'src/components/leftnav/Leftnav';
import NewHeader from './components/newheader/Newheader';
// import Home from './pages/home/Home'
// import ErrorPage from './pages/ErrorPage'
// import FilePage from './pages/file/list'
// import JsErrorPage from './pages/jserror/list'
// import SlinkPage from './pages/slink/list'
// import RankPage from './pages/githubrank/list'
const Home = React.lazy(() => import('./pages/home/Home'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))
const FilePage = React.lazy(() => import('./pages/file/list'))
const JsErrorPage = React.lazy(() => import('./pages/jserror/list'))
const SlinkPage = React.lazy(() => import('./pages/slink/list'))
const RankPage = React.lazy(() => import('./pages/githubrank/list'))

/**
 * 主体
 */
const App = (props: any) => {
  // eslint-disable-next-line no-restricted-globals
  const { href, hash } = location;
  const filterRouter = ['login'];
  const includesRouter = filterRouter.filter(v => {
    return href.includes(v);
  });

  let appContent = null;

  if (includesRouter.length) {
    appContent = (
      <div className="pageMain t-FBH">
        <Outlet />
      </div>
    );
  } else {
    appContent = (
      <div className="pageMain-wrap t-FBV">
        {/* <TopHead /> */}
        <NewHeader />
        <div className="pageMain t-FBH" style={{ top: '56px' }}>
          <LeftNav {...props} />
          <div className="main-content t-FB1 t-FBV">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return appContent
};

let router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        // element: <Home />,
        element: <Suspense fallback={<div>loading...</div>}><Home /></Suspense>,
      },
      {
        path: '/jserror/list',
        // element: <JsErrorPage />,
        element: <Suspense fallback={<div>loading...</div>}><JsErrorPage /></Suspense>,
      },
      {
        path: '/slink/list',
        // element: <SlinkPage />,
        element: <Suspense fallback={<div>loading...</div>}><SlinkPage /></Suspense>,
      },
      {
        path: '/file/list',
        // element: <FilePage />,
        element: <Suspense fallback={<div>loading...</div>}><FilePage /></Suspense>,
      },
      {
        path: '/rank',
        // element: <RankPage />,
        element: <Suspense fallback={<div>loading...</div>}><RankPage /></Suspense>,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
