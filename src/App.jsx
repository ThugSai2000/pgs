import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Loader from './components/Loader';
import AddNewHostel from './pages/add-new-hostel';
import RoomManagement from './pages/room-management';
import Users from './pages/users';
import axios from 'axios';
const About = lazy(() => import('./pages/About'));

function App()
{

  axios.defaults.baseURL = 'http://192.168.29.110:5000/api'
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddNewHostel />} />
          <Route path='/about' element={
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
