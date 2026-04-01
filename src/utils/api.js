export const API_KEY = "637bdd703f2eb5c408b75ba25b833741";

async function apiFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "City not found.");
  }
  const data = await res.json();
  if (data.cod && String(data.cod) !== "200") {
    throw new Error(data.message || "City not found.");
  }
  return data;
}

export async function fetchCurrentWeather(city) {
  return apiFetch(
    `/api/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}

export async function fetchForecast(city) {
  return apiFetch(
    `/api/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}
