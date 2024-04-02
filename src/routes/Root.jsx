import { Outlet, Link } from "react-router-dom";

export default function RootRoute() {
  return (
    <>
        <div>
            <Link to={`/login/aluno`}>Login aluno</Link>
            <Link to={`/login/instrutor`}>Login instrutor</Link>
        </div>
    </>
  );
}