export default function Tab({ city, onChange }) {
  return (
    <li key={city.label} className={`tab ${city.active ? "active" : ""}`}>
      <button
        role="tab"
        className="block w-full leading-10 md:px-4"
        onClick={() => onChange(city)}
      >
        {city.label}
      </button>
    </li>
  );
}
