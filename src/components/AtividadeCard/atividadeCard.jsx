export function AtividadeCard({icon, title, currentAmount, totalAmount}) {
  return (
    <div className="w-[28%] h-full bg-white rounded-xl flex flex-col justify-center items-center p-2">
      <div className="flex items-center justify-center gap-1">
        {icon}
        <span className="font-semibold">{currentAmount}/{totalAmount}</span>
      </div>
      <h2 className="w-full text-sm text-center">{title}</h2>
    </div>
  );
}
