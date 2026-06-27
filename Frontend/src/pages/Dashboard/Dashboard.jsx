import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Dashboard.css'

const dummyTourist = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'tourist'
}

const dummyGuide = {
  name: 'Ram Thapa',
  email: 'ram@example.com',
  role: 'guide'
}

const dummyBookings = [
  {
    _id: 'b1',
    guideName: 'Ram Thapa',
    touristName: 'John Doe',
    location: 'Pokhara',
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    status: 'confirmed',
    groupSize: 3,
    message: 'Looking forward to the trek!'
  },
  {
    _id: 'b2',
    guideName: 'Sita Gurung',
    touristName: 'Jane Smith',
    location: 'Kathmandu',
    startDate: '2024-04-01',
    endDate: '2024-04-03',
    status: 'pending',
    groupSize: 2,
    message: 'Interested in cultural tours.'
  }
]

// ----- Tourist Dashboard -----
function TouristDashboard({ user }) {
  const navigate = useNavigate()

  const myBookings = dummyBookings.filter(b => b.touristName === user.name)

  return (
    <>
      <div className="dashboard__welcome">
        <div>
          <h2>Welcome back, {user.name} 👋</h2>
          <p>Here is a summary of your trips and bookings.</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/guides')}>
          Find a Guide
        </Button>
      </div>

      <div className="dashboard__stats">
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">{myBookings.length}</span>
          <span className="dashboard__stat-label">Total Bookings</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {myBookings.filter(b => b.status === 'confirmed').length}
          </span>
          <span className="dashboard__stat-label">Confirmed</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {myBookings.filter(b => b.status === 'pending').length}
          </span>
          <span className="dashboard__stat-label">Pending</span>
        </div>
      </div>

      <div className="dashboard__section">
        <h3>Your Bookings</h3>
        {myBookings.length === 0 ? (
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
                  <th>Location</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Group Size</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.guideName}</td>
                    <td>{booking.location}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.endDate}</td>
                    <td>{booking.groupSize}</td>
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
function GuideDashboard({ user }) {
  const navigate = useNavigate()

  const myRequests = dummyBookings

  function handleAccept(bookingId) {
    console.log('Accepted booking:', bookingId)
    // API call comes later
    alert('Booking accepted!')
  }

  function handleReject(bookingId) {
    console.log('Rejected booking:', bookingId)
    // API call comes later
    alert('Booking rejected.')
  }

  return (
    <>
      <div className="dashboard__welcome">
        <div>
          <h2>Welcome, {user.name} 👋</h2>
          <p>Manage your incoming booking requests here.</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          View My Profile
        </Button>
      </div>

      <div className="dashboard__stats">
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">{myRequests.length}</span>
          <span className="dashboard__stat-label">Total Requests</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {myRequests.filter(b => b.status === 'confirmed').length}
          </span>
          <span className="dashboard__stat-label">Confirmed</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-number">
            {myRequests.filter(b => b.status === 'pending').length}
          </span>
          <span className="dashboard__stat-label">Pending</span>
        </div>
      </div>

      <div className="dashboard__section">
        <h3>Booking Requests</h3>
        {myRequests.length === 0 ? (
          <div className="dashboard__empty">
            <p>No booking requests yet.</p>
          </div>
        ) : (
          <div className="dashboard__cards">
            {myRequests.map((booking) => (
              <div key={booking._id} className="dashboard__request-card">
                <div className="dashboard__request-info">
                  <h4>{booking.touristName}</h4>
                  <p>📍 {booking.location}</p>
                  <p>📅 {booking.startDate} → {booking.endDate}</p>
                  <p>👥 Group size: {booking.groupSize}</p>
                  <p className="dashboard__request-message">"{booking.message}"</p>
                </div>
                <div className="dashboard__request-actions">
                  <span className={`dashboard__status dashboard__status--${booking.status}`}>
                    {booking.status}
                  </span>
                  {booking.status === 'pending' && (
                    <div className="dashboard__request-buttons">
                      <Button
                        variant="primary"
                        onClick={() => handleAccept(booking._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(booking._id)}
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
  // Change this to dummyGuide to test guide view
  const user = dummyGuide

  return (
    <div className="dashboard">
      <div className="container">
        {user.role === 'guide' ? (
          <GuideDashboard user={user} />
        ) : (
          <TouristDashboard user={user} />
        )}
      </div>
    </div>
  )
}

export default Dashboard