export function InputAcad({ label, placeholder, type, width }) {
  return (
    <div className={`${width} flex flex-col gap-1 "`}>
      <p className="font-medium">{label}</p>
      <input
        className="border-2 border-black rounded-full py-1.5 px-3"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
