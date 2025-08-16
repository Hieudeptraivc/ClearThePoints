import { useEffect } from "react";
import NumCircle from "./NumCircle";

function GameBoard({
  points,
  numbers = [],
  target,
  status,
  onNumberClick,
  playing,
  setNumbers,
}) {
  useEffect(() => {
    if (!playing || status === "GAME OVER") return;

    const timer = setInterval(() => {
      onTick();
    }, 100);

    return () => clearInterval(timer);
  }, [playing, status]);

  const onTick = () => {
    setNumbers((nums) => {
      let changed = false;
      const next = nums.map((n) => {
        if (n.done && n.lifetime > 0) {
          changed = true;
          return { ...n, lifetime: +(n.lifetime - 0.1).toFixed(1) };
        }
        return n;
      });
      return changed ? next.filter((n) => n.lifetime > 0) : nums;
    });
  };
  return (
    <div>
      <div className="border-3 h-[500px] rounded-xs relative overflow-hidden bg-slate-50">
        {playing &&
          numbers.map((n) => {
            const baseZ = points - n.id + 1;
            const zIndex = n.id === target ? baseZ + points + 10 : baseZ;
            return (
              <NumCircle
                key={n.id}
                x={n.x}
                y={n.y}
                zIndex={zIndex}
                done={n.done}
                lifetime={n.lifetime}
                value={n.id}
                onClick={() => onNumberClick && onNumberClick(n.id)}
              />
            );
          })}
      </div>
      {playing && status !== "GAME OVER" && points >= target && (
        <p className="text-base"> Next: {target}</p>
      )}
    </div>
  );
}

export default GameBoard;
