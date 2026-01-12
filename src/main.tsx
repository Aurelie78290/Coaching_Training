import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from './App.tsx';
import Coach from './pages/Coach.tsx';
import Faq from './pages/Faq.tsx';
import Home from './pages/Home.tsx';
import MainsList from './pages/MainsList.tsx';
import NotFound from './pages/NotFound.tsx';
import Training from './pages/Training.tsx';
import './index.css';
import News from './pages/News.tsx';
import Login from './pages/Login.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Register from './pages/Register.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';



const router = createBrowserRouter ([
  {
    element: <App />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/Register',
        element: <Register />
      },
      {
        path: '/Coach',
        element: <PrivateRoute><Coach /></PrivateRoute>
      },
      {
        path: '/News',
        element: <PrivateRoute><News /></PrivateRoute>
      },
      {
        path: '/Training',
        element: <PrivateRoute><Training /></PrivateRoute>
      },
      {
        path: '/MainsList',
        element: <PrivateRoute><MainsList /></PrivateRoute>
      },
      {
        path: '/Faq',
        element: <PrivateRoute><Faq /></PrivateRoute>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

const rootElement = document.getElementById("root");

if (rootElement != null) {
  createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
    
