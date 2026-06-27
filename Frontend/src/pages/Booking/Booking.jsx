import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Booking data:', { guideId: id, ...formData })
    // API call comes later
    alert('Booking submitted! We will connect you shortly.')
    navigate('/dashboard')
  }

  return (
    <div className="booking">
      <div className="container">
        <div className="booking__card">

          <h2>Book Your Guide</h2>
          <p>Fill in your trip details and we will confirm your booking.</p>

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
              <Button type="submit" variant="primary">Confirm Booking</Button>
              <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking