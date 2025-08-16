function Input({ value, onChange }) {
  return (
    <input
      className="border w-32 text-sm px-2"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}

export default Input;
