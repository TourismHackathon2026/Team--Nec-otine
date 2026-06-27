import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">

      {/* Hero Section */}
      <section className="landing__hero">
        <div className="container">
          <h1 className="landing__title">
            Explore Nepal With a <span>Local Guide</span>
          </h1>
          <p className="landing__subtitle">
            Connect with verified local guides for an authentic Nepali experience.
            From Everest trails to Kathmandu temples — we have got you covered.
          </p>
          <div className="landing__hero-buttons">
            <Button variant="primary" onClick={() => navigate('/guides')}>
              Find a Guide
            </Button>
            <Button variant="outline" onClick={() => navigate('/planner')}>
              Plan My Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing__features">
        <div className="container">
          <h2>Why Tour Genie?</h2>
          <div className="landing__feature-grid">

            <div className="landing__feature-card">
              <span className="landing__feature-icon">🗺️</span>
              <h3>Local Expertise</h3>
              <p>Our guides are locals who know every hidden trail, temple, and teahouse.</p>
            </div>

            <div className="landing__feature-card">
              <span className="landing__feature-icon">✅</span>
              <h3>Verified Guides</h3>
              <p>Every guide is registered and verified before joining our platform.</p>
            </div>

            <div className="landing__feature-card">
              <span className="landing__feature-icon">🤖</span>
              <h3>AI Trip Planner</h3>
              <p>Use our AI to generate a personalized travel itinerary in seconds.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing__cta">
        <div className="container">
          <h2>Ready to Explore Nepal?</h2>
          <p>Join hundreds of tourists who found their perfect local guide.</p>
          <Button variant="primary" onClick={() => navigate('/signup')}>
            Get Started Free
          </Button>
        </div>
      </section>

    </div>
  )
}

export default Landing