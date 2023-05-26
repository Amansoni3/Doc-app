import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useSelector } from "react-redux"
import Spinner from "./components/Spinner"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import ApplyDoctors from "./pages/ApplyDoctors"
import NotificationPage from "./pages/NotificationPage"
import Doctor from "./pages/admin/Doctor"
import Users from "./pages/admin/User"
import Profile from "./pages/doctors/Profile"
import BookingPage from "./pages/BookingPage"

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {
          loading ? (<Spinner />) :
            (
              <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    < HomePage />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={
                  <PublicRoute>
                    < Login />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    < Register />
                  </PublicRoute>
                } />
                <Route path="/applydoctor" element={
                  <ProtectedRoute>
                    < ApplyDoctors />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    < NotificationPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/doctors" element={
                  <ProtectedRoute>
                    < Doctor />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute>
                    < Users />
                  </ProtectedRoute>
                } />
                <Route path="/doctor/profile/:id" element={
                  <ProtectedRoute>
                    < Profile />
                  </ProtectedRoute>
                } />
                <Route path="/doctor/book-appointment/:doctorId" element={
                  <ProtectedRoute>
                    < BookingPage />
                  </ProtectedRoute>
                } />
              </Routes>
            )}
      </BrowserRouter>
    </>
  );
}

export default App;
