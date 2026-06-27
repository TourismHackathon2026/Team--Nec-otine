import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import './GuideCard.css'

function GuideCard({ guide }) {
  const navigate = useNavigate()

  return (
    <div className="guide-card">
      <img
        src={guide.profileImage || 'https://via.placeholder.com/400x300'}
        alt={guide.name}
        className="guide-card__image"
      />
      <div className="guide-card__content">
        <h3 className="guide-card__name">{guide.name}</h3>
        <p className="guide-card__location">📍 {guide.location}</p>
        <div className="guide-card__footer">
          <span className="guide-card__rating">⭐ {guide.rating || '4.8'}/5</span>
          <Button
            variant="outline"
            onClick={() => navigate(`/guides/${guide._id}`)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GuideCard