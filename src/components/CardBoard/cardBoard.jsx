export function CardBoard({ numberInfo, textInfo}) {
    return (
        <div className="p-4 w-[25%] min-w-[25%] h-full rounded-xl bg-[#1A1A1A]">
            <div className="w-full h-full items-center justify-center flex flex-col text-white">
                <span className="text-[#48B75A] font-medium">{numberInfo}</span>
                <p className="text-center text-xs">{textInfo}</p>
            </div>
        </div>
    )
}