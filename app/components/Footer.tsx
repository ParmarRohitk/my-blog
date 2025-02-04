import React from 'react';

const Footer = () => {
    return (
        <footer className="p-6 rounded-lg ">
            <div className=" bg-gray-900 text-white p-6 rounded-lg container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Left Side: Footer Text */}
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <p className="text-sm sm:text-base">
                        © 2025 <span className="font-semibold"><a href="/" >Moviestreamtv</a></span> | All Rights Reserved
                    </p>
                </div>

                {/* Right Side: Links */}
                <div className="flex space-x-4 text-center md:text-right">
                    <a href="/about-us" className="text-sm hover:underline">About Us</a>
                    {/* <a href="/sitemap" className="text-sm hover:underline">Sitemap</a> */}
                    {<a href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</a>}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
