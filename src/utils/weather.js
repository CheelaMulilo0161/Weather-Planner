export function processForecast(data) {
  const map = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!map[date]) map[date] = { temps: [], pop: [] };
    map[date].temps.push(item.main.temp);
    map[date].pop.push(item.pop ?? 0);
  });
  return Object.entries(map).map(([date, v]) => ({
    date,
    temp: +(v.temps.reduce((a, b) => a + b, 0) / v.temps.length).toFixed(1),
    pop: +(v.pop.reduce((a, b) => a + b, 0) / v.pop.length).toFixed(2),
  }));
}

export function getInsight(days) {
  const warnings = [];
  days.forEach((d) => {
    const lbl = new Date(d.date + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (d.temp > 35)
      warnings.push(`Very hot on ${lbl} (${d.temp}°C) — stay hydrated`);
    if (d.temp < 5)
      warnings.push(`Very cold on ${lbl} (${d.temp}°C) — dress warmly`);
    if (d.pop > 0.6)
      warnings.push(`Rain likely on ${lbl} (${Math.round(d.pop * 100)}% chance)`);
  });
  const best = days.reduce((a, b) =>
    b.temp - b.pop * 20 > a.temp - a.pop * 20 ? b : a
  );
  const bestLbl = new Date(best.date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
  });
  return [
    `Best day to go out: ${bestLbl} (${best.temp}°C)`,
    ...warnings,
  ];
}

export function formatCondition(description) {
  return description.charAt(0).toUpperCase() + description.slice(1);
}
