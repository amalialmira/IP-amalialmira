import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './pages/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ReadList from './pages/ReadList'
import EditPage from './pages/EditReadingList'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if(!localStorage.getItem('access_token')) {
        return redirect('/login')
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/myreadinglist',
        element: <ReadList/>
      },
      {
        path: '/edit/:id',
        element: <EditPage/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
