import React from "react";

function NumCircle({
  x = 0,
  y = 0,
  value,
  lifetime,
  done,
  onClick,
  zIndex = 1,
}) {
  const INIT_LIFETIME = 3;
  const opacity = Math.max(0, Math.min(1, lifetime / INIT_LIFETIME));
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    zIndex,
    opacity,
    transform: `scale(${0.9 + 0.1 * opacity})`,
    transition: "opacity 300ms linear, transform 300ms linear",
  };

  return (
    <div
      onClick={() => !done && onClick(value)}
      style={style}
      className={`absolute w-[50px] h-[50px] rounded-full cursor-pointer select-none border border-red-600 flex flex-col items-center justify-center box-border
        transition-opacity duration-300 transform 
        ${done ? `bg-red-600 text-white` : "bg-white text-black opacity-100"}
      `}
    >
      <span className="text-[11px] text-black font-semibold">{value}</span>
      {done && (
        <span className="text-[11px] leading-none">{lifetime.toFixed(1)}s</span>
      )}
    </div>
  );
}

export default React.memo(NumCircle, (prev, next) => {
  return (
    prev.x === next.x &&
    prev.y === next.y &&
    prev.lifetime === next.lifetime &&
    prev.done === next.done &&
    prev.zIndex === next.zIndex &&
    prev.value === next.value
  );
});
