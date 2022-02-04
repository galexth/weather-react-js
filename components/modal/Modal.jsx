export default function Modal({ text, onClose }) {
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-16 py-6 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Something went wrong
        </h1>
        <div className="my-6">{text}</div>
        <button
          onClick={onClose}
          className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
