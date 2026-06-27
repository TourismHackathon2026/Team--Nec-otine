import { useState, useEffect } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyBookings, updateBookingStatus } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/Button/Button'
import MapSelector from '../../components/MapSelector'
import ItineraryAccordion from '../../components/ItineraryAccordion'
import './Dashboard.css'

// ----- Tourist Dashboard -----
function TouristDashboard({ bookings }) {
  const navigate = useNavigate()
  const myBookings = dummyBookings.filter(b => b.touristName === user.name)

  // Maps and AI state management integrations
  const [location, setLocation] = useState(null)
  const [guides, setGuides] = useState([])
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(false)

  // Criteria fields for AI Planner
  const [days, setDays] = useState(3)
  const [interests, setInterests] = useState('')

  const handleGenerateItinerary = async () => {
    if (!location) return alert("Select a location on the map first!")
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: location.address, days, interests })
      })
      const data = await res.json()
      setItinerary(data)
      setGuides([]) // Clear map queries when loading text planner
    } catch (err) {
      console.error("AI Generation Failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFindGuides = async () => {
    if (!location) return alert("Select a location on the map first!")
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/guides/nearby?lat=${location.lat}&lng=${location.lng}`)
      const data = await res.json()
      setGuides(data)
      setItinerary(null) // Clear itinerary when tracking nearby operators
    } catch (err) {
      console.error("Geospatial Fetch Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="dashboard__welcome">
        <div>
          <h2>My Bookings 👋</h2>
          <p>Here is a summary of your trips and bookings.</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/guides')}>
          Find a Guide
        </Button>
      </div>

      {/* --- NEW SECTION: Map & AI Explorer Control Panel --- */}
      <div className="dashboard__section" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Interactive Travel Center 🗺️</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="md-grid-cols-3">
          <div style={{ gridColumn: 'span 2', background: '#fff', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' }}>
              Where are you exploring?
            </label>
            <MapSelector onLocationSelect={(loc) => setLocation(loc)} />
          </div>

          <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'col', gap: '0.75rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid #edf2f7', fontSize: '1rem' }}>Parameters</h4>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>Days</label>
                <input type="number" value={days} onChange={e => setDays(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginTop: '0.25rem' }}/>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>Interests</label>
                <input type="text" placeholder="Temples, historical walks..." value={interests} onChange={e => setInterests(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginTop: '0.25rem' }}/>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <Button variant="primary" onClick={handleGenerateItinerary}>🧠 Ask AI Engine</Button>
              <Button variant="outline" onClick={handleFindGuides}>🧭 Hail Guides</Button>
            </div>
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#4f46e5', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>Crunching remote endpoints...</p>}

        {/* AI Output Result display */}
        <ItineraryAccordion itinerary={itinerary} />

        {/* Nearby Local Guides output rendering */}
        {guides.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>Available Operators In Chosen Area</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {guides.map((g) => (
                <div key={g._id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ margin: 0, fontWeight: 'bold' }}>{g.name}</h5>
                    <p style={{ margin: '2px 0', fontSize: '0.75rem', color: '#4f46e5', fontWeight: '600' }}>{g.specialty}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#a0aec0' }}>${g.ratePerHour}/hr base</p>
                  </div>
                  <Button variant="primary" size="small" onClick={() => navigate(`/booking/${g._id}`)}>Book</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Rest of your original design layouts --- */}
      <div className="dashboard__stats">
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">{bookings.length}</span>
          <span className="dashboard__stat-label">Total Bookings</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {bookings.filter(b => b.status === 'confirmed').length}
          </span>
          <span className="dashboard__stat-label">Confirmed</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {bookings.filter(b => b.status === 'pending').length}
          </span>
          <span className="dashboard__stat-label">Pending</span>
        </div>
      </div>

      <div className="dashboard__section">
        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <div className="dashboard__empty">
            <p>You have no bookings yet.</p>
            <Button variant="outline" onClick={() => navigate('/guides')}>
              Browse Guides
            </Button>
          </div>
        ) : (
          <div className="dashboard__table-wrapper">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Guide</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Group Size</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.guide?.fullName}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>{booking.groupSize}</td>
                    <td>NPR {booking.totalPrice}</td>
                    <td>
                      <span className={`dashboard__status dashboard__status--${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

// ----- Guide Dashboard -----
function GuideDashboard({ bookings, onStatusUpdate }) {
  const navigate = useNavigate()
  const myRequests = dummyBookings

  function handleAccept(bookingId) {
    console.log('Accepted booking:', bookingId)
    alert('Booking accepted!')
  }

  function handleReject(bookingId) {
    console.log('Rejected booking:', bookingId)
    alert('Booking rejected.')
  }

  return (
    <>
      <div className="dashboard__welcome">
        <div>
          <h2>Booking Requests 👋</h2>
          <p>Manage your incoming booking requests here.</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          View My Profile
        </Button>
      </div>

      <div className="dashboard__stats">
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">{bookings.length}</span>
          <span className="dashboard__stat-label">Total Requests</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {bookings.filter(b => b.status === 'confirmed').length}
          </span>
          <span className="dashboard__stat-label">Confirmed</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {bookings.filter(b => b.status === 'pending').length}
          </span>
          <span className="dashboard__stat-label">Pending</span>
        </div>
      </div>

      <div className="dashboard__section">
        <h3>Booking Requests</h3>
        {bookings.length === 0 ? (
          <div className="dashboard__empty">
            <p>No booking requests yet.</p>
          </div>
        ) : (
          <div className="dashboard__cards">
            {bookings.map((booking) => (
              <div key={booking._id} className="dashboard__request-card">
                <div className="dashboard__request-info">
                  <h4>{booking.tourist?.fullName}</h4>
                  <p>📅 {new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p>👥 Group size: {booking.groupSize}</p>
                  <p>💰 NPR {booking.totalPrice}</p>
                  {booking.message && (
                    <p className="dashboard__request-message">"{booking.message}"</p>
                  )}
                </div>
                <div className="dashboard__request-actions">
                  <span className={`dashboard__status dashboard__status--${booking.status}`}>
                    {booking.status}
                  </span>
                  {booking.status === 'pending' && (
                    <div className="dashboard__request-buttons">
                      <Button
                        variant="primary"
                        onClick={() => onStatusUpdate(booking._id, 'confirmed')}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onStatusUpdate(booking._id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

// ----- Main Dashboard -----
function Dashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await getMyBookings()
        setBookings(res.data.bookings)
      } catch (err) {
        setError('Failed to load bookings.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  async function handleStatusUpdate(bookingId, status) {
    try {
      await updateBookingStatus(bookingId, status)
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status } : b)
      )
    } catch (err) {
      alert('Failed to update booking status.')
    }
  }

  if (loading) {
    return <div className="guidelist__loading">Loading dashboard...</div>
  }

  if (error) {
    return <div className="guidelist__loading">{error}</div>
  }
  // Toggle this to test either the 'dummyTourist' or 'dummyGuide' view flows
  const user = dummyTourist

  return (
    <div className="dashboard">
      <div className="container">
        {user?.role === 'guide' ? (
          <GuideDashboard
            bookings={bookings}
            onStatusUpdate={handleStatusUpdate}
          />
        ) : (
          <TouristDashboard bookings={bookings} />
        )}
      </div>
    </div>
  )
}

export default Dashboard