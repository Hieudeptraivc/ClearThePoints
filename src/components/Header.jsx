import Input from "../ui/Input";
import Button from "../ui/Button";

function Header({
  points,
  setPoints,
  time,
  playing,
  start,
  stop,
  autoPlay,
  setAutoPlay,
}) {
  return (
    <div className="mb-4">
      <h2 className="font-bold text-lg">Clear The Points</h2>
      <div className="mt-2">
        <div className="flex w-52 gap-6 items-center justify-start">
          <p>Points:</p>
          <Input value={points} onChange={(v) => setPoints(Number(v) || 1)} />
        </div>
        <div className="flex w-[190px] gap-6 items-center justify-start">
          <p>Time:</p>
          <p>{time}s</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`mt-2 px-3 py-1 text-sm rounded-xs ${
              autoPlay ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {autoPlay ? "Auto-play: On" : "Auto-play: Off"}
          </button>
        </div>
      </div>
      <Button onStart={start} onStop={stop} playing={playing} />
    </div>
  );
}

export default Header;
