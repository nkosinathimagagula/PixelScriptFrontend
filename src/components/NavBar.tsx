import { useState } from "react";
import { Link, NavLink} from "react-router-dom";

import { logo, menu, close } from "../assets";
import { navBarTabs } from "../constants/navbar";

export const NavBar = () => {
    const [toggle, setToggle] = useState<boolean>(false);

    const access_token = localStorage.getItem("access_token");
    const loggedIn: string = access_token ? access_token : 'undefined';

    return (
        <nav className="bg-[#00ffef] w-full sm:h-20 h-16 fixed sm:px-16 sm:py-2 py-1 px-5">
            <div className="w-full flex justify-between">
                <Link
                    to={loggedIn !== 'undefined' ? '/home' : '/'}
                >
                    <img src={logo} alt="logo" className="sm:w-32 sm:h-14 w-24 h-14" />
                </Link>
                    
                <ul className="sm:flex hidden gap-10 py-4">
                    {navBarTabs.map((tab) => (
                        <NavLink
                            to={`/${tab.id}/`}
                            key={tab.title}
                            style={({ isActive }) => {
                                return isActive ? { textDecoration: "underline"} : {}
                            }}
                            className={loggedIn !== 'undefined' ? 'text-[#374151]' : 'pointer-events-none text-[#37415155]'}
                        >
                            <li>
                                {tab.title}
                            </li>
                        </NavLink>
                    ))}
                </ul>

                <div className="sm:hidden flex py-2">
                    <img 
                        src={toggle ? close : menu} 
                        alt="menu" 
                        className="w-11 h-11"
                        onClick={() => {
                            setToggle(!toggle);
                        }}
                    />

                    <div className={`${toggle ? `flex` : `hidden`} absolute bg-[#00ffef] p-5 top-16 right-0`}>
                        <ul className="flex flex-col justify-end items-start gap-2">
                            {navBarTabs.map((tab) => (
                                <NavLink
                                    to={`${tab.id}`}
                                    key={tab.title}
                                    className={loggedIn !== 'undefined' ? 'text-[#374151]' : 'pointer-events-none text-[#37415155]'}
                                >
                                    <li
                                        key={tab.title}
                                        onClick={() => {
                                            setToggle(false);
                                        }}
                                        className="text-[#374151]"
                                    >
                                        {tab.title}
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
