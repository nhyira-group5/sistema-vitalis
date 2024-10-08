export function IconHome({img, selected}) {
    return (
        <div className={`px-5 py-3 flex justify-center items-center ${selected ? 'bg-zinc-100 shadow-inset-green' : 'bg-transparent'}`}>
            <img src={img} alt="vazio" className={`size-8`} />
        </div>
    )
}