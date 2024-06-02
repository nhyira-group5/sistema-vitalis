import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';




export function SideBarItem({URI, Icon, Label}) {
    const location = useLocation();
    const isActive = location.pathname === URI;
  
    return(
        <Link to={URI} className={`${isActive ? 'bg-white  after:content-[""] after:absolute after:h-full after:w-[5px] after:bg-primary-green400 after:left-0' : 'bg-transparent'} relative w-full flex items-center justify-center gap-2 p-3`}>
            <span className={`${isActive ? 'text-primary-green300 ' : ' text-white '}`}>
                {Icon} 
            </span>

            {Label}
        </Link>
    )
}