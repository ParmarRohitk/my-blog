// about-us/page.tsx
import React from 'react';

const AboutUs = () => {
    return (
        <>
            <head>
                <title>About Us | Moviestremtv</title>
            </head>
            <div className='p-6 pt-[60px]'>
                <div className="min-h-screen p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                    <div className="flex justify-center mb-9 mt-6 -pt-8">
                        <div className="-max-w-4xl mx-auto space-y-10 rounded-lg p-6 md:p-12 text-md">

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About Us</h1>

                            {/* Introduction Section */}
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                Welcome to <span className="font-semibold text-white">MovieStreamTV</span>, your one-stop destination for discovering and streaming movies from diverse genres and languages. We are dedicated to bringing an exciting and effortless movie-watching experience to film lovers worldwide.
                            </p>

                            {/* What We Offer Section */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold">What We Offer:</h2>
                                <ul className="list-disc list-inside space-y-3 text-gray-300">
                                    <li><strong className="text-white">Wide Range of Movies:</strong> From Hollywood blockbusters to indie gems, our collection includes movies across genres and languages that cater to every taste.</li>
                                    <li><strong className="text-white">User-Friendly Streaming:</strong> Our platform offers a seamless viewing experience with easy navigation and high-quality playback.</li>
                                    <li><strong className="text-white">Personalized Recommendations:</strong> Discover films curated just for you, thanks to our advanced recommendation algorithms.</li>
                                    <li><strong className="text-white">New Releases and Classics:</strong> Our library includes the latest releases as well as timeless classics and all-time favorites.</li>
                                </ul>
                            </div>

                            {/* Our Vision Section */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold">Our Vision</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    Our vision is to build a community of movie enthusiasts passionate about storytelling and cinematic arts. At MovieStreamTV, we are committed to making films accessible to everyone, fostering a shared love for cinema and promoting cross-cultural understanding through storytelling.
                                </p>
                            </div>
                        </div></div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
