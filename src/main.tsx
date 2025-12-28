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



const router = createBrowserRouter ([
  {
    element: <App />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Coach',
        element: <Coach />
      },
      {
        path: '/News',
        element: <News />
      },
      {
        path: '/Training',
        element: <Training />
      },
      {
        path: '/MainsList',
        element: <MainsList />
      },
      {
        path: '/Faq',
        element: <Faq />
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
    <RouterProvider router={router} />
  );
}
    
