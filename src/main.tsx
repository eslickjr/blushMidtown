import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Error from './pages/Error';
import Home from './pages/Home';
import BookOnline from './pages/BookOnline';
import ColorServices from './pages/ColorServices';
import MeetTheStaff from './pages/MeetTheStaff';
import PhotoGallery from './pages/PhotoGallery';
import SalonPolicies from './pages/SalonPolicies';
import ServiceMenu from './pages/ServiceMenu';
import WorkWithUs from './pages/WorkWithUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/BookOnline',
        element: <BookOnline />,
      },
      {
        path: '/ColorServices',
        element: <ColorServices />,
      },
      {
        path: '/MeetTheStaff',
        element: <MeetTheStaff />,
      },
      {
        path: '/PhotoGallery',
        element: <PhotoGallery />,
      },
      {
        path: '/SalonPolicies',
        element: <SalonPolicies />,
      },
      {
        path: '/ServiceMenu',
        element: <ServiceMenu />,
      },
      {
        path: '/WorkWithUs',
        element: <WorkWithUs />,
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
} else {
  console.error('Failed to find the root element');
}
