import './GuideCard.css';
import Button from '../Button/Button';

function GuideCard({ 
  name = "Nirajan Katwal", 
  location = "Ghandruk, Pokhara", 
  rating = "4.8", 
  imageUrl = "https://via.placeholder.com/400x300",
  onBook 
}) {
  return (
    <div className="guide-card">
      <img src={imageUrl} alt={`Guide ${name}`} className="guide-card__image" />
      <div className="guide-card__content">
        <h3 className="guide-card__name">{name}</h3>
        <p className="guide-card__location">📍 {location}</p>
        
        <div className="guide-card__footer">
          <span className="guide-card__rating">⭐ {rating}/5</span>
          <Button variant="outline" onClick={onBook}>View Profile</Button>
        </div>
      </div>
    </div>
  );
}

export default GuideCard;