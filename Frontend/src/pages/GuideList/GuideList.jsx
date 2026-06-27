import { useState, useEffect } from 'react'
import GuideCard from '../../components/GuideCard/GuideCard'
import { getAllGuides } from '../../services/api'
import './GuideList.css'

function GuideList() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGuides() {
      try {
        const res = await getAllGuides()
        setGuides(res.data.guides)
      } catch (err) {
        setError('Failed to load guides. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchGuides()
  }, [])

  if (loading) {
    return <div className="guidelist__loading">Loading guides...</div>
  }

  if (error) {
    return <div className="guidelist__loading">{error}</div>
  }

  if (guides.length === 0) {
    return <div className="guidelist__loading">No guides found yet.</div>
  }

  return (
    <div className="guidelist">
      <div className="container">
        <div className="guidelist__header">
          <h2>Find Your Local Guide</h2>
          <p>Browse verified local guides across Nepal</p>
        </div>
        <div className="guidelist__grid">
          {guides.map((guide) => (
            <GuideCard key={guide._id} guide={{
              _id: guide._id,
              name: guide.user?.fullName,
              location: guide.district,
              bio: guide.bio,
              specialties: [],
              pricePerDay: guide.pricePerDay,
              profileImage: guide.user?.profileImage,
              rating: guide.rating
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GuideList