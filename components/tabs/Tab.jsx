export default function Tab({ city, onChange }) {
  return (
    <li key={city.label} className="mr-2">
      <button
        role="tab"
        className={`tab ${city.active ? "active" : ""}`}
        onClick={() => onChange(city)}
      >
        {city.label}
      </button>
    </li>
  );
}
