import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGuideById } from '../../services/api'
import Button from '../../components/Button/Button'
import './GuideProfile.css'

function GuideProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGuide() {
      try {
        const res = await getGuideById(id)
        setGuide(res.data.guide)
      } catch (err) {
        setError('Failed to load guide. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [id])

  if (loading) {
    return <div className="guideprofile__loading">Loading guide...</div>
  }

  if (error) {
    return <div className="guideprofile__loading">{error}</div>
  }

  if (!guide) {
    return <div className="guideprofile__loading">Guide not found.</div>
  }

  return (
    <div className="guideprofile">
      <div className="container">
        <div className="guideprofile__card">

          <div className="guideprofile__left">
            <img
              src={guide.user?.profileImage || 'https://via.placeholder.com/300'}
              alt={guide.user?.fullName}
              className="guideprofile__image"
            />
            <div className="guideprofile__meta">
              <p>📍 {guide.district}</p>
              <p>⏳ {guide.experience} years experience</p>
              <p>💬 {guide.languages && guide.languages.join(', ')}</p>
              <p>⭐ {guide.rating} / 5</p>
            </div>
            <div className="guideprofile__price">
              NPR {guide.pricePerDay} / day
            </div>
            <Button
              variant="primary"
              onClick={() => navigate(`/booking/${guide._id}`)}
            >
              Book This Guide
            </Button>
          </div>

          <div className="guideprofile__right">
            <h2>{guide.user?.fullName}</h2>
            <p className="guideprofile__bio">{guide.bio}</p>

            <h3>Languages</h3>
            <div className="guideprofile__tags">
              {guide.languages && guide.languages.map((lang, index) => (
                <span key={index} className="guideprofile__tag">{lang}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GuideProfile