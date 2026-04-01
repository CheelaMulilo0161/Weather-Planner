function InsightCard({ insights }) {
  return (
    <div className="insight-card">
      <div className="insight-label">Insight:</div>
      {insights.map((ins, i) => (
        <div key={i} className={`insight-item ${i === 0 ? "primary" : ""}`}>
          {ins}
        </div>
      ))}
    </div>
  );
}

export default InsightCard;
