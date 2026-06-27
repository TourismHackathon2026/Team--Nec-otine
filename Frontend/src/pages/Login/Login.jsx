import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Login data:', formData)
    // API call comes later
  }

  return (
    <div className="login">
      <div className="login__card">
        <h2>Welcome Back</h2>
        <p>Login to your NepalGuide account</p>

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
            />
          </div>

          <Button type="submit" variant="primary">Login</Button>
        </form>

        <p className="login__switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login