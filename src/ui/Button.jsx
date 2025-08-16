function Button({ onClick, children }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onClick}
        className="border mt-2 w-28 text-[14px] rounded-xs bg-gray-200 hover:bg-gray-300"
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
