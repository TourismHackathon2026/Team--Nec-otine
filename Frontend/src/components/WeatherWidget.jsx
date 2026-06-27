import React, { useEffect, useState } from 'react';

export default function WeatherWidget({ lat, lng }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/weather/current?lat=${lat}&lng=${lng}`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]); // Re-runs instantly whenever map coordinates shift

  if (loading) return <div className="text-xs text-gray-400 animate-pulse">Checking local climate sky conditions...</div>;
  if (!weather) return null;

  return (
    <div className="flex items-center gap-4 bg-indigo-50/60 border border-indigo-100 p-3 rounded-xl mt-3 animate-fadeIn">
      {/* Dynamic weather graphic icon directly from OpenWeather servers */}
      <img 
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
        alt={weather.condition} 
        className="w-12 h-12 bg-indigo-200/50 rounded-full"
      />
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-black text-gray-800">{weather.temp}°C</span>
          <span className="text-xs font-bold text-indigo-600 capitalize">{weather.condition}</span>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          Expect {weather.description} today with {weather.humidity}% humidity levels.
        </p>
      </div>
    </div>
  );
}
