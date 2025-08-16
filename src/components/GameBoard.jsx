import NumCircle from "./NumCircle";

function GameBoard({ numbers = [], onNumberClick, target, playing }) {
  return (
    <div className="border-2 h-[400px] relative bg-slate-50">
      {numbers.map((n) => (
        <NumCircle
          key={n.id}
          x={n.x}
          y={n.y}
          value={n.id}
          done={n.done}
          isTarget={n.id === target}
          onClick={() => onNumberClick && onNumberClick(n.id)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
