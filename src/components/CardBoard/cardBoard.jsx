export function CardBoard({ numbers, text}) {
    return (
        <div className="w-1/4 h-full rounded-xl bg-[#1A1A1A]">
            <div className="w-full h-full items-center justify-center flex flex-col text-white">
                <span className="text-[#48B75A] font-medium">10:30</span>
                <span className="text-xs">Tempo de execução</span>
            </div>
        </div>
    )
}