import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function TrendChart({ days }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!days.length || !canvasRef.current) return;
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const labels = days.map((d) =>
      new Date(d.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        month: "numeric",
        day: "numeric",
      })
    );

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temp (°C)",
            data: days.map((d) => d.temp),
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.07)",
            pointBackgroundColor: "#2563eb",
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.06)" },
            ticks: { font: { size: 11 }, color: "#666" },
          },
          y: {
            title: {
              display: true,
              text: "Temperature (°C)",
              font: { size: 11 },
              color: "#666",
            },
            grid: { color: "rgba(0,0,0,0.06)" },
            ticks: {
              font: { size: 11 },
              color: "#666",
              callback: (v) => v + "°",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [days]);

  return (
    <>
      <div className="section-title">Temperature Trend</div>
      <div className="chart-outer">
        <div className="chart-wrap">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </>
  );
}

export default TrendChart;
