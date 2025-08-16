function Input({ value, onChange, disabled }) {
  return (
    <input
      disabled={disabled}
      className="border rounded-xs w-40 text-sm px-1"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}

export default Input;
