//routing page

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function styles() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Landing Page — coming soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default styles