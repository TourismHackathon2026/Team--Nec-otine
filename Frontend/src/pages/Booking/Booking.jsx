import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createBooking } from '../../services/api'
import Button from '../../components/Button/Button'
import './Booking.css'

function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    groupSize: 1,
    message: ''
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
      await createBooking({
        guideId: id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        groupSize: formData.groupSize,
        message: formData.message
      })
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking">
      <div className="container">
        <div className="booking__card">

          <h2>Book Your Guide</h2>
          <p>Fill in your trip details and we will confirm your booking.</p>

          {error && <div className="booking__error">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="booking__row">
              <div className="booking__field">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking__field">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="booking__field">
              <label htmlFor="groupSize">Group Size</label>
              <input
                id="groupSize"
                type="number"
                name="groupSize"
                min="1"
                max="20"
                value={formData.groupSize}
                onChange={handleChange}
                required
              />
            </div>

            <div className="booking__field">
              <label htmlFor="message">Message to Guide</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell the guide about your trip plans..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="booking__actions">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Confirm Booking'}
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking