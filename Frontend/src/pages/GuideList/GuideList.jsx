import { useState, useEffect } from 'react'
import GuideCard from '../../components/GuideCard/GuideCard'
import './GuideList.css'

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

function GuideList() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setGuides(dummyGuides)
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return <div className="guidelist__loading">Loading guides...</div>
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
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GuideList