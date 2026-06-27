import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/Button/Button'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
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
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <h2>Welcome Back</h2>
        <p>Login to your Tour Genie account</p>

        {error && <div className="login__error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login__field">
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

          <div className="login__field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="login__switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login