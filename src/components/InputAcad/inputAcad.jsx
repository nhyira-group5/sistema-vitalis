export function InputAcad({ label, placeholder, type, width, valueOption, onChangeFunction }) {
  return (
    <div className={`${width} flex flex-col gap-1 "`}>
      <p className="font-medium">{label}</p>
      <input
        className="border border-black rounded-full py-1.5 px-3"
        type={type}
        value={valueOption}
        onChange={onChangeFunction}
        placeholder={placeholder}
        maxLength="8"
      />
    </div>
  );
}
