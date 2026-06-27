import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import './GuideCard.css'

function GuideCard({ guide }) {
  const navigate = useNavigate()
  
  // Calculate dynamic stars (defaults to 5 if rating is missing)
  const rating = guide.rating || 5 
  const roundedRating = Math.round(rating)

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
          
          {/* 🌟 Here is the dynamic star magic! */}
          <div className="guide-card__rating-container">
            <span className="guide-card__stars">
              {'★'.repeat(roundedRating)}
              {'☆'.repeat(5 - roundedRating)}
            </span>
            <span className="guide-card__rating-num">{rating}/5</span>
          </div>

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