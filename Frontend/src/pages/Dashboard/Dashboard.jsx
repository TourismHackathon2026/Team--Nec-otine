import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebase'

// =========================================================================
// MINIMAL INLINE COMPONENTS (Ensures Zero Compilation & API Key Failures)
// =========================================================================

function MiniMapSelector({ onLocationSelect }) {
  const popularDestinations = [
    { name: "Kathmandu Valley", lat: 27.7172, lng: 85.3240, address: "Kathmandu, Nepal" },
    { name: "Pokhara Lakeside", lat: 28.2096, lng: 83.9856, address: "Pokhara, Nepal" },
    { name: "Chitwan National Park", lat: 27.5311, lng: 84.4514, address: "Chitwan, Nepal" },
    { name: "Everest Base Camp Region", lat: 27.9807, lng: 86.9213, address: "Solukhumbu, Nepal" }
  ]

  return (
    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#64748b' }}>Select a target hub to sync geospatial coordinates:</p>
      <select 
        onChange={(e) => {
          const dest = popularDestinations.find(d => d.name === e.target.value);
          if (dest) onLocationSelect(dest);
        }}
        defaultValue=""
        style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
      >
        <option value="" disabled>-- Choose Location --</option>
        {popularDestinations.map(d => (
          <option key={d.name} value={d.name}>{d.name}</option>
        ))}
      </select>
    </div>
  )
}

function MiniWeatherWidget({ lat, lng }) {
  return (
    <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #bfdbfe' }}>
      <span style={{ fontSize: '1.5rem' }}>🌤️</span>
      <div>
        <h5 style={{ margin: 0, fontSize: '0.85rem', color: '#1e40af' }}>Live Microclimate Feed</h5>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#1d4ed8' }}>Coords: {lat.toFixed(2)}°N, {lng.toFixed(2)}°E | Syncing stable telemetry</p>
      </div>
    </div>
  )
}

function MiniItineraryAccordion({ itinerary }) {
  if (!itinerary) return null;
  return (
    <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 0.75rem 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🧠 Generated AI Matrix</h4>
      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.9rem', color: '#14532d', margin: 0 }}>
        {typeof itinerary === 'object' ? JSON.stringify(itinerary, null, 2) : itinerary}
      </pre>
    </div>
  )
}

// =========================================================================
// TOURIST OPERATIONS DASHBOARD
// =========================================================================

function TouristDashboard({ user, token }) {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [location, setLocation] = useState(null)
  const [guides, setGuides] = useState([])
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bookingsLoading, setBookingsLoading] = useState(true)

  const [days, setDays] = useState(3)
  const [interests, setInterests] = useState('')

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings/tourist', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        setBookings(data || [])
      } catch (err) {
        console.error("Failed to fetch live bookings:", err)
      } finally {
        setBookingsLoading(false)
      }
    }
    if (token) fetchMyBookings()
  }, [token])

  const handleGenerateItinerary = async () => {
    if (!location) return alert("Select a hub location from the drop-down panel first!")
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/planner/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ destination: location.address, days, interests })
      })
      const data = await res.json()
      setItinerary(data)
      setGuides([]) 
    } catch (err) {
      console.error("AI Generation Failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFindGuides = async () => {
    if (!location) return alert("Select a hub location from the drop-down panel first!")
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/guides/nearby?lat=${location.lat}&lng=${location.lng}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setGuides(data || [])
      setItinerary(null) 
    } catch (err) {
      console.error("Geospatial Fetch Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="dashboard__welcome" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Welcome back, {user.displayName || user.email} 👋</h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0 0' }}>Here is a live summary of your trips and bookings.</p>
        </div>
        <button onClick={() => navigate('/guides')} style={{ padding: '0.6rem 1.2rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          Find a Guide
        </button>
      </div>

      {/* --- Responsive Control Grid Fix --- */}
      <div className="dashboard__section" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Interactive Travel Center 🗺️</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fff', padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' }}>
              Where are you exploring?
            </label>
            <MiniMapSelector onLocationSelect={(loc) => setLocation(loc)} />
            {location && <MiniWeatherWidget lat={location.lat} lng={location.lng} />}
          </div>

          <div style={{ background: '#fff', padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={handleGenerateItinerary} style={{ width: '100%', padding: '0.6rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>🧠 Ask AI Engine</button>
              <button onClick={handleFindGuides} style={{ width: '100%', padding: '0.6rem', background: '#fff', color: '#4f46e5', border: '1px solid #4f46e5', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>🧭 Hail Guides</button>
            </div>
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#4f46e5', fontWeight: 'bold' }}>Crunching remote endpoints...</p>}

        <MiniItineraryAccordion itinerary={itinerary} />

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
                  <button onClick={() => navigate(`/booking/${g._id}`)} style={{ padding: '0.4rem 0.8rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>Book</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Booking Counters --- */}
      <div className="dashboard__stats" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[{ num: bookings.length, label: "Total Bookings" }, { num: bookings.filter(b => b.status === 'confirmed').length, label: "Confirmed" }, { num: bookings.filter(b => b.status === 'pending').length, label: "Pending" }].map((stat, i) => (
          <div key={i} style={{ flex: '1', minWidth: '150px', background: '#fff', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.75rem', fontWeight: 'bold', color: '#1e293b' }}>{stat.num}</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dashboard__section">
        <h3>Your Bookings</h3>
        {bookingsLoading ? (
          <p>Syncing secure cloud ledger...</p>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#64748b', margin: '0 0 1rem 0' }}>You have no live bookings yet.</p>
            <button onClick={() => navigate('/guides')} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}>Browse Guides</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: '#fff' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>Guide</th>
                  <th style={{ padding: '0.75rem' }}>Location</th>
                  <th style={{ padding: '0.75rem' }}>Start Date</th>
                  <th style={{ padding: '0.75rem' }}>End Date</th>
                  <th style={{ padding: '0.75rem' }}>Group Size</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem' }}>{booking.guideName}</td>
                    <td style={{ padding: '0.75rem' }}>{booking.location}</td>
                    <td style={{ padding: '0.75rem' }}>{booking.startDate}</td>
                    <td style={{ padding: '0.75rem' }}>{booking.endDate}</td>
                    <td style={{ padding: '0.75rem' }}>{booking.groupSize}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', background: booking.status === 'confirmed' ? '#dcfce7' : '#fef9c3', color: booking.status === 'confirmed' ? '#15803d' : '#a16207' }}>
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

// =========================================================================
// GUIDE REVENUE OPERATIONS DASHBOARD
// =========================================================================

function GuideDashboard({ user, token }) {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings/guide', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        setRequests(data || [])
      } catch (err) {
        console.error("Failed to load requests:", err)
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchRequests()
  }, [token])

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        setRequests(prev => prev.map(b => b._id === bookingId ? { ...b, status: newStatus } : b))
        alert(`Booking state set to ${newStatus}!`)
      }
    } catch (err) {
      console.error("Failed to update status:", err)
    }
  }

  return (
    <>
      <div className="dashboard__welcome" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Welcome, {user.displayName || user.email} 👋</h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0 0' }}>Manage your real-time incoming operations here.</p>
        </div>
        <button onClick={() => navigate('/')} style={{ padding: '0.6rem 1.2rem', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          View My Profile
        </button>
      </div>

      <div className="dashboard__stats" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[{ num: requests.length, label: "Total Requests" }, { num: requests.filter(b => b.status === 'confirmed').length, label: "Confirmed" }, { num: requests.filter(b => b.status === 'pending').length, label: "Pending" }].map((stat, i) => (
          <div key={i} style={{ flex: '1', minWidth: '150px', background: '#fff', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.75rem', fontWeight: 'bold', color: '#1e293b' }}>{stat.num}</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dashboard__section">
        <h3>Booking Requests</h3>
        {loading ? (
          <p>Scanning inbound payloads...</p>
        ) : requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#64748b', margin: 0 }}>No live booking requests found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {requests.map((booking) => (
              <div key={booking._id} style={{ padding: '1.25rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{booking.touristName}</h4>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#4a5568' }}>📍 {booking.location}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#4a5568' }}>📅 {booking.startDate} → {booking.endDate}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#4a5568' }}>👥 Group size: {booking.groupSize}</p>
                  <p style={{ margin: '0.5rem 0 0 0', padding: '0.5rem', background: '#f8fafc', borderRadius: '6px', fontSize: '0.85rem', italic: 'true', color: '#64748b' }}>"{booking.message}"</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', background: booking.status === 'confirmed' ? '#dcfce7' : '#fef9c3', color: booking.status === 'confirmed' ? '#15803d' : '#a16207' }}>
                    {booking.status}
                  </span>
                  {booking.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => updateStatus(booking._id, 'confirmed')} style={{ padding: '0.4rem 0.8rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>Accept</button>
                      <button onClick={() => updateStatus(booking._id, 'rejected')} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>Reject</button>
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

// =========================================================================
// CENTRAL ROUTER COMPONENT
// =========================================================================

function Dashboard() {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [userRole, setUserRole] = useState('tourist') 
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setFirebaseUser(user)
        const token = await user.getIdToken()
        setAuthToken(token)

        try {
          const profileRes = await fetch('http://localhost:5000/api/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          const profileData = await profileRes.json()
          if (profileData && profileData.role) {
            setUserRole(profileData.role)
          }
        } catch (err) {
          console.error("Error identifying user metadata role:", err)
        }
      } else {
        setFirebaseUser(null)
        setAuthToken(null)
      }
      setInitializing(false)
    })

    return () => unsubscribe()
  }, [])

  if (initializing) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <h3>Validating Session Integrity...</h3>
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <div style={{ padding: '5rem 2rem', textAlign: 'center', background: '#f8fafc', height: '100vh' }}>
        <h3>🔒 Secure Access Restrained</h3>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Please log in to view your travel matrix dashboard workspace.</p>
      </div>
    )
  }

  return (
    <div className="dashboard" style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {userRole === 'guide' ? (
          <GuideDashboard user={firebaseUser} token={authToken} />
        ) : (
          <TouristDashboard user={firebaseUser} token={authToken} />
        )}
      </div>
    </div>
  )
}

export default Dashboard