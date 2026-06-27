import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/Button/Button'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'tourist',
    phone: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signup(
        formData.fullName,
        formData.email,
        formData.password,
        formData.role,
        formData.phone
      )
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup">
      <div className="signup__card">
        <h2>Create Account</h2>
        <p>Join Tour Genie and start exploring</p>

        {error && <div className="signup__error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="signup__field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup__field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+977 9800000000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="signup__field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup__field">
            <label htmlFor="role">I am a</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="tourist">Tourist</option>
              <option value="guide">Local Guide</option>
            </select>
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

        </form>

        <p className="signup__switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup