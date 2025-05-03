import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Loader from './components/Loader';
import AddNewHostel from './pages/add-new-hostel';
import RoomManagement from './pages/room-management';
import  Users  from './pages/users';
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />} />
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
