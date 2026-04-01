function SearchBar({ city, setCity, onSearch, loading }) {
  return (
    <div className="search-row">
      <label htmlFor="cityInput">Enter city:</label>
      <input
        id="cityInput"
        className="search-input"
        type="text"
        placeholder="e.g. London"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button className="search-btn" onClick={onSearch} disabled={loading}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
