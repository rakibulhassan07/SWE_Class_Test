import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewTask from './NewTask.jsx';
import Tasks from './Tasks.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewTask />,
  },
  {
    path: "/mystask",
    element: <Tasks />,
    loader: () => fetch(`http://localhost:5000/task`)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
