import { IconContext} from 'react-icons';
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import './header.css';

export default function Header(){
    const [navOpen, setNavOpen] = useState(false);
    const className = "header " + (navOpen ? "nav-open": null );
    const handleClick = () => {
        setNavOpen(!navOpen);
    }

    return(
        <>
            <header className={className}>
                <img className="company-logo" alt="Agropedia Logo" src="logo.png"></img>
                <nav className="nav-main">
                    <ul className="nav-list">
                        <li><a className="nav-item" href="#">Marketplace</a></li>
                        <li><a className="nav-item" href="#">Loturi de pamant</a></li>
                        <li><a className="nav-item" href="#">Profil</a></li>
                    </ul>
                </nav>
                <button className="btn-nav" onClick={handleClick}>
                    <IconContext.Provider value={{size:50}}>
                    {navOpen ? <IoClose /> : <IoIosMenu />}
                    </IconContext.Provider>
                </button>
            </header>
        </>
    )

}