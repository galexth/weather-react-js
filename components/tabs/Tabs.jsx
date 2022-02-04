import Tab from "./Tab";

export default function Tabs({ cities, onChange }) {
  return (
    <ul className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mt-10">
      {cities.map((city) => (
        <Tab key={city.label} city={city} onChange={onChange} />
      ))}
    </ul>
  );
}
