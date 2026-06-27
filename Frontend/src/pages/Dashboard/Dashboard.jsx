import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Dashboard.css'

const dummyUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'tourist'
}

const dummyBookings = [
  {
    _id: 'b1',
    guideName: 'Ram Thapa',
    location: 'Pokhara',
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    status: 'confirmed'
  },
  {
    _id: 'b2',
    guideName: 'Sita Gurung',
    location: 'Kathmandu',
    startDate: '2024-04-01',
    endDate: '2024-04-03',
    status: 'pending'
  }
]

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard">
      <div className="container">

        {/* Welcome Section */}
        <div className="dashboard__welcome">
          <div>
            <h2>Welcome back, {dummyUser.name} 👋</h2>
            <p>Here is a summary of your trips and bookings.</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/guides')}>
            Find a Guide
          </Button>
        </div>

        {/* Stats */}
        <div className="dashboard__stats">
          <div className="dashboard__stat-card">
            <span className="dashboard__stat-number">2</span>
            <span className="dashboard__stat-label">Total Bookings</span>
          </div>
          <div className="dashboard__stat-card">
            <span className="dashboard__stat-number">1</span>
            <span className="dashboard__stat-label">Confirmed</span>
          </div>
          <div className="dashboard__stat-card">
            <span className="dashboard__stat-number">1</span>
            <span className="dashboard__stat-label">Pending</span>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="dashboard__section">
          <h3>Your Bookings</h3>
          {dummyBookings.length === 0 ? (
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
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.guideName}</td>
                      <td>{booking.location}</td>
                      <td>{booking.startDate}</td>
                      <td>{booking.endDate}</td>
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

      </div>
    </div>
  )
}

export default Dashboard