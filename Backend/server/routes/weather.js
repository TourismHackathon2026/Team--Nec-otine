import express from 'express';
import axios from 'axios'; // npm install axios if you haven't already

const router = express.Router();

router.get('/current', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and Longitude are required." });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    
    // Send back just the clean data your UI cares about
    res.json({
      temp: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity
    });
  } catch (error) {
    console.error("Weather API breakdown:", error.message);
    res.status(500).json({ error: "Failed fetching local weather metrics." });
  }
});

export default router;
