import Input from "../ui/Input";
import Button from "../ui/Button";

function Header({
  points,
  setPoints,
  time,
  playing,
  onStart,
  status,
  onRestart,
  autoPlay,
  OnAutoPlay,
}) {
  return (
    <div className="mb-4">
      <h2 className="font-bold text-lg">{status}</h2>

      <div className="flex  gap-26 items-center mt-3 justify-start">
        <p>Points:</p>
        <Input
          value={points}
          disabled={playing}
          onChange={(n) => setPoints(Number(n))}
        />
      </div>
      <div className="flex gap-[113px] items-center mt-1 justify-start">
        <p>Time:</p>
        <p>{time}s</p>
      </div>

      <div className="flex items-center gap-2 ">
        {!playing ? (
          <Button onClick={onStart}>Play</Button>
        ) : (
          <Button onClick={onRestart}>Restart</Button>
        )}

        {playing && status !== "GAME OVER" && (
          <Button onClick={OnAutoPlay}>
            {autoPlay ? "Auto-play: Off" : "Auto-play: On"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
