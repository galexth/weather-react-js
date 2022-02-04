export default function Spinner({ size }) {
  return (
    <div
      className={`w-${size} h-${size} border-l-2 border-gray-900 rounded-full animate-spin`}
    />
  );
}
