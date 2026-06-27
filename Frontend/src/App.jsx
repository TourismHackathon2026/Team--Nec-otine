import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import GuideList from './pages/GuideList/GuideList'
import GuideProfile from './pages/GuideProfile/GuideProfile'
import Booking from './pages/Booking/Booking'
import Planner from './pages/Planner/Planner'
import Dashboard from './pages/Dashboard/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guides" element={<GuideList />} />
          <Route path="/guides/:id" element={<GuideProfile />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App