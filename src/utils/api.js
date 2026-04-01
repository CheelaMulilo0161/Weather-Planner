export const API_KEY = "637bdd703f2eb5c408b75ba25b833741";

const PROXY = (url) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

export async function apiFetch(url) {
  const res = await fetch(PROXY(url));
  if (!res.ok) throw new Error("Network error — check your connection.");
  const wrapper = await res.json();
  const data = JSON.parse(wrapper.contents);
  if (data.cod && String(data.cod) !== "200") {
    throw new Error(data.message || "City not found.");
  }
  return data;
}

export async function fetchCurrentWeather(city) {
  return apiFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}

export async function fetchForecast(city) {
  return apiFetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}
