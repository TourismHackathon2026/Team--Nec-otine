import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyBookings, updateBookingStatus } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/Button/Button'
import './Dashboard.css'

// ----- Tourist Dashboard -----
function TouristDashboard({ bookings }) {
  const navigate = useNavigate()

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