import { useState, useEffect } from 'react'
import GuideCard from '../../components/GuideCard/GuideCard'
import { getAllGuides } from '../../services/api'
import './GuideList.css'

<<<<<<< HEAD
const dummyGuides = [
  {
    _id: '1',
    name: 'Ram Thapa',
    location: 'Pokhara',
    bio: 'Expert trekking guide with 10 years of experience in the Annapurna region.',
    specialties: ['Trekking', 'Photography'],
    pricePerDay: 3000,
    rating: 4.8, // 👈 Added rating
    profileImage: null
  },
  {
    _id: '2',
    name: 'Sita Gurung',
    location: 'Kathmandu',
    bio: 'Cultural guide specializing in heritage tours around Kathmandu Valley.',
    specialties: ['Culture', 'History', 'Food'],
    pricePerDay: 2500,
    rating: 4.9, // 👈 Added rating
    profileImage: null
  },
  {
    _id: '3',
    name: 'Bikash Rai',
    location: 'Chitwan',
    bio: 'Wildlife expert and jungle safari guide in Chitwan National Park.',
    specialties: ['Wildlife', 'Safari', 'Nature'],
    pricePerDay: 3500,
    rating: 4.5, // 👈 Added rating
    profileImage: null
  }
]

=======
>>>>>>> b48fcf977161c14a9af2a9026371f35b4af41c18
function GuideList() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
<<<<<<< HEAD
    setTimeout(() => {
      setGuides(dummyGuides)
      setLoading(false)
    }, 800)
=======
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
>>>>>>> b48fcf977161c14a9af2a9026371f35b4af41c18
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