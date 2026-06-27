import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps'; // Imported Map Provider

import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import GuideList from './pages/GuideList/GuideList';
import GuideProfile from './pages/GuideProfile/GuideProfile';
import Booking from './pages/Booking/Booking';
import Planner from './pages/Planner/Planner';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  // ⚠️ PASTE YOUR COPIED GOOGLE MAPS KEY HERE
  const GOOGLE_MAPS_API_KEY = "AIzaSyYourActualKeyFromGoogleCloudHere"; 

  return (
    // Wrapping the entire Router allows any sub-page to utilize maps safely
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
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
    </APIProvider>
  );
}

export default App;
