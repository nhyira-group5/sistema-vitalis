export function InputLogin(props) {
    return (
        <div className="flex flex-col gap-4">
          <span className="max-w-min font-mavenPro text-2xl border-b text-[#5EAF6B]" {...props} />
          <input
            className="w-full px-3 w-72 py-6 bg-[#111111]/85 rounded-xl flex-1 outline-none border-0 p-0 ring-0 focus:ring-0 text-black100"
            type="text"
          />
        </div>
    )
}
