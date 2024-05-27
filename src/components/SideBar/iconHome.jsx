export function IconHome({img, selected = false}) {
    console.log(selected);
    return (
        <div className={`px-5 py-3 flex justify-center items-center ${selected ? 'bg-zinc-100 shadow-inset-green' : 'bg-transparent'}`}>
            {/* {selected ? <div className="w-1 relative z-[2px] bg-red-600"></div> : null} */}
            <img src={img} alt="vazio" className={`size-8`} />
        </div>
    )
}