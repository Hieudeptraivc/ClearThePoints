function NumCircle({ x = 0, y = 0, value, done, isTarget, onClick }) {
  const size = 36;
  const style = {
    left: x,
    top: y,
    width: size,
    height: size,
    lineHeight: `${size}px`,
  };
  return (
    <div
      onClick={onClick}
      className={`absolute rounded-full border flex items-center justify-center cursor-pointer select-none
        ${
          done
            ? "bg-green-300 text-white"
            : isTarget
            ? "bg-yellow-300"
            : "bg-white"
        }`}
      style={style}
    >
      {value}
    </div>
  );
}

export default NumCircle;
