/*a wrapper component that wraps every normal page of the app. */

import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout