import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import TrendChart from "../components/TrendChart";
import InsightCard from "../components/InsightCard";
import { fetchCurrentWeather, fetchForecast } from "./utils/api";
import { processForecast, getInsight, formatCondition } from "./utils/weather";
import "./App.css";

function App() {
  const [city, setCity]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [current, setCurrent]   = useState(null);
  const [forecast, setForecast] = useState([]);
  const [insights, setInsights] = useState([]);

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setCurrent(null);
    setForecast([]);
    setInsights([]);

    try {
      const [curData, fcData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);

      const days = processForecast(fcData).slice(0, 7);

      setCurrent({
        name: curData.name + (curData.sys?.country ? `, ${curData.sys.country}` : ""),
        temp: curData.main.temp.toFixed(1),
        condition: formatCondition(curData.weather[0].description),
      });
      setForecast(days);
      setInsights(getInsight(days));
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        loading={loading}
      />

      {error   && <div className="status-error">{error}</div>}
      {loading && <div className="status-loading">Fetching forecast…</div>}

      {!loading && current && (
        <>
          <WeatherCard current={current} />
          {forecast.length > 0 && <TrendChart days={forecast} />}
          {insights.length > 0 && <InsightCard insights={insights} />}
        </>
      )}
    </div>
  );
}

export default App;
