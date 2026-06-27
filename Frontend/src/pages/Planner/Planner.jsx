import { useState } from 'react'
import Button from '../../components/Button/Button'
import './Planner.css'

function Planner() {
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    interests: ''
  })
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setItinerary(null)

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: `Create a ${formData.days}-day travel itinerary for ${formData.destination} in Nepal. The traveler is interested in: ${formData.interests}. Format it clearly with Day 1, Day 2 etc. For each day list morning, afternoon and evening activities. Keep it practical and specific to Nepal.`
            }
          ]
        })
      })

      const data = await response.json()
      console.log('Groq response:', data)

      if (data.choices && data.choices[0]) {
        setItinerary(data.choices[0].message.content)
      } else {
        setError('Failed to generate itinerary. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to generate itinerary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="planner">
      <div className="container">

        <div className="planner__header">
          <h2>AI Trip Planner</h2>
          <p>Tell us about your trip and we will generate a personalized itinerary for you.</p>
        </div>

        <div className="planner__layout">

          <form className="planner__form" onSubmit={handleSubmit}>

            <div className="planner__field">
              <label htmlFor="destination">Destination in Nepal</label>
              <input
                id="destination"
                type="text"
                name="destination"
                placeholder="e.g. Pokhara, Kathmandu, Chitwan"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className="planner__field">
              <label htmlFor="days">Number of Days</label>
              <input
                id="days"
                type="number"
                name="days"
                min="1"
                max="30"
                value={formData.days}
                onChange={handleChange}
                required
              />
            </div>

            <div className="planner__field">
              <label htmlFor="interests">Your Interests</label>
              <textarea
                id="interests"
                name="interests"
                rows="3"
                placeholder="e.g. hiking, temples, local food, wildlife"
                value={formData.interests}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Itinerary'}
            </Button>

          </form>

          <div className="planner__result">
            {loading && (
              <div className="planner__loading">
                <p>✨ Generating your itinerary...</p>
              </div>
            )}

            {error && (
              <div className="planner__error">
                <p>{error}</p>
              </div>
            )}

            {itinerary && (
              <div className="planner__itinerary">
                <h3>Your Itinerary</h3>
                <div className="planner__itinerary-content">
                  {itinerary.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {!loading && !itinerary && !error && (
              <div className="planner__placeholder">
                <span>🗺️</span>
                <p>Your itinerary will appear here</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Planner