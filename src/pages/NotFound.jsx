import img404 from "../assets/404.svg";

export function NotFound() {
  return (
    <div className="bg-slate-900 w-full h-screen flex items-center justify-center">
      <div className="max-w-fit h-4/5">
        <img className="max-h-full block" src={img404} />
      </div>
    </div>
  );
}
