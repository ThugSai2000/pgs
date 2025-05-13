import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Loader from './components/Loader'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const AddHostel = lazy(() => import('./pages/AddHostel'))
const AddRoom = lazy(() => import('./pages/AddRoom'))
const HostelDashboard = lazy(() => import('./pages/HostelDashboard'))
const RoomManagement = lazy(() => import('./pages/RoomManagement'))
const RoomResidents = lazy(() => import('./pages/RoomResidents'))
const AddResident = lazy(() => import('./pages/AddResident'))
const PaymentManagement = lazy(() => import('./pages/PaymentManagement'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  // Set default timeout
  axios.defaults.timeout = 30000
  axios.defaults.baseURL = 'http://192.168.29.30:5000/api'

  // Add axios interceptor for auth token
  axios.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  })

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          } />
          <Route path="/hostel-dashboard" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['owner']}>
                <HostelDashboard />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/room-management" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['owner']}>
                <RoomManagement />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/room-residents/:roomId" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['owner']}>
                <RoomResidents />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/add-resident/:roomId" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['owner']}>
                <AddResident />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/payment-management/:residentId" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['resident', 'owner']}>
                <PaymentManagement />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/add-room" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['owner']}>
                <AddRoom />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/add-hostel" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute allowedRoles={['owner']}>
                <AddHostel />
              </ProtectedRoute>
            </Suspense>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App