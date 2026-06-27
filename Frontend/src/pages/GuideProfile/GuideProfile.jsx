import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './GuideProfile.css'

const dummyGuide = {
  _id: '1',
  name: 'Ram Thapa',
  location: 'Pokhara',
  bio: 'Expert trekking guide with 10 years of experience in the Annapurna region. I have led over 200 successful treks and speak English, Hindi, and Nepali fluently.',
  specialties: ['Trekking', 'Photography', 'Camping'],
  pricePerDay: 3000,
  profileImage: null,
  languages: ['English', 'Nepali', 'Hindi'],
  experience: 10
}

function GuideProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace with real API call later
    setTimeout(() => {
      setGuide(dummyGuide)
      setLoading(false)
    }, 800)
  }, [id])

  if (loading) {
    return <div className="guideprofile__loading">Loading guide...</div>
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
              src={guide.profileImage || '/default-avatar.png'}
              alt={guide.name}
              className="guideprofile__image"
            />
            <div className="guideprofile__meta">
              <p>📍 {guide.location}</p>
              <p>⏳ {guide.experience} years experience</p>
              <p>💬 {guide.languages && guide.languages.join(', ')}</p>
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
            <h2>{guide.name}</h2>
            <p className="guideprofile__bio">{guide.bio}</p>

            <h3>Specialties</h3>
            <div className="guideprofile__tags">
              {guide.specialties && guide.specialties.map((tag, index) => (
                <span key={index} className="guideprofile__tag">{tag}</span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default GuideProfile