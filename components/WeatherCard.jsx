function WeatherCard({ current }) {
  return (
    <div className="info-card">
      <div className="info-city">{current.name}</div>
      <div className="info-row">
        <span className="info-lbl">Current temperature:</span>
        <span className="info-val">{current.temp}°C</span>
      </div>
      <div className="info-row">
        <span className="info-lbl">Condition:</span>
        <span className="info-val">{current.condition}</span>
      </div>
    </div>
  );
}

export default WeatherCard;
