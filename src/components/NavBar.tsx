import { useState } from "react";

import { logo, menu, close } from "../assets";
import { navBarTabs } from "../constants/navbar";

export const NavBar = () => {
    const [active, setActive] = useState<string>("");
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <nav className="bg-[#00ffef] w-full sm:h-20 h-16 fixed sm:px-16 sm:py-2 py-1 px-5">
            <div className="w-full flex justify-between">
                <a href="/">
                    <img src={logo} alt="logo" className="sm:w-32 sm:h-14 w-24 h-14" />
                </a>
                    
                <ul className="sm:flex hidden gap-10 py-4">
                    {navBarTabs.map((tab) => (
                        <li
                            key={tab.title}
                            onClick={() => {
                                setActive(tab.title);
                            }}
                            className={active === tab.title ? `underline` : `text-[#374151]`}
                        >
                            <a href="#">
                                {tab.title}
                            </a>
                        </li>
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
                                <li
                                    key={tab.title}
                                    onClick={() => {
                                        setActive(tab.title);
                                        setToggle(false);
                                    }}
                                    className="text-[#374151]"
                                >
                                    <a href="#">
                                        {tab.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
