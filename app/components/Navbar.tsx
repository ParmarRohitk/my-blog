'use client'
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
    const [isScrolled, setIsScrolled] = useState(false); // State to change background on scroll

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu on click
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30); // Change background on scroll
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full px-5 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center -py-4">

                {/* Logo with black background for white logo */}
                <a href="/" className="-bg-black rounded-full p-2">
                    <div className="flex items-center justify-center">
                        <img alt="Moviestreamtv" src="/logo.png" height={80} width={80} />
                    </div>
                </a>

                {/* Desktop and Tablet Navigation */}
                <nav className={`absolute lg:static top-16 right-0 lg:right-auto bg-transparent w-full lg:w-auto ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 p-4 lg:p-0 text-center lg:text-left rounded-full lg:rounded-none bg-black lg:bg-transparent">
                        <li className="hover:bg-white hover:text-black transform transition-transform duration-200 hover:scale-105 rounded-lg lg:rounded-none">
                            <a href="/blog" className="text-white hover:text-black py-2 px-4 rounded-full">
                                Blogs
                            </a>
                        </li>
                        {/*   <li className="hover:bg-white hover:text-black transform transition-transform duration-200 hover:scale-105 rounded-lg lg:rounded-none">
                            <a href="/in/english" className="text-white hover:text-black py-2 px-4 rounded-full">
                                English
                            </a>
                        </li>
                        <li className="hover:bg-white hover:text-black transform transition-transform duration-200 hover:scale-105 rounded-lg lg:rounded-none">
                            <a href="/in/gujarati" className="text-white hover:text-black py-2 px-4 rounded-full">
                                Gujarati
                            </a>
                        </li> */}
                    </ul>
                </nav>

                {/* Hamburger Menu Icon for Mobile */}
                <button onClick={toggleMenu} className="text-white focus:outline-none text-3xl lg:hidden">
                    {isMenuOpen ? '✖' : '☰'}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
