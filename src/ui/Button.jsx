function Button({ onStart, onStop, playing }) {
  return (
    <div className="flex gap-2">
      {!playing ? (
        <button
          onClick={onStart}
          className="border mt-2 px-4 py-1 text-[14px] rounded-xs bg-green-200 hover:bg-green-300"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onStop}
          className="border mt-2 px-4 py-1 text-[14px] rounded-xs bg-red-200 hover:bg-red-300"
        >
          Stop
        </button>
      )}
    </div>
  );
}

export default Button;
