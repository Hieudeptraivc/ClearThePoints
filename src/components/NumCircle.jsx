function NumCircle({ x = 0, y = 0, value, lifetime, done, onClick }) {
  const style = {
    left: x,
    top: y,
    width: 50,
    height: 50,
  };

  return (
    <div
      onClick={() => !done && onClick(value)}
      style={style}
      className={`absolute flex flex-col items-center justify-center
        rounded-full  cursor-pointer select-none border-red-500 border-2
        ${done && lifetime <= 0 ? "opacity-0" : "opacity-100"}
      `}
    >
      <span className="text-[11px] font-medium text-black">{value}</span>
      {done && (
        <span className="text-[11px] text-white leading-none">
          {lifetime.toFixed(1)}s
        </span>
      )}
    </div>
  );
}

export default NumCircle;
