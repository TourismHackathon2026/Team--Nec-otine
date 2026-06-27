import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tourist'
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Signup data:', formData)
    // API call comes later
  }

  return (
    <div className="signup">
      <div className="signup__card">
        <h2>Create Account</h2>
        <p>Join NepalGuide and start exploring</p>

        <form onSubmit={handleSubmit}>

          <div className="signup__field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
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

          <Button type="submit" variant="primary">Create Account</Button>

        </form>

        <p className="signup__switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup