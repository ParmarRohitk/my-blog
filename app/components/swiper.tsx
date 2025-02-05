"use client";
import Link from "next/link";
import { useRef } from "react";

interface Post {
    frontMatter: {
        title: string;
        images: string[];
        tags: string[];
        summary: string;
    };
    slug: string;
}

interface MovieScrollProps {
    title: string;
    slug: string;
    movies: Post[];  // Renamed from 'movies' to 'posts'
}


const Swiper: React.FC<MovieScrollProps> = ({ title, movies, slug }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg">
            {/* Title with link */}
            <Link href={slug}>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            </Link>

            {/* Button on the right top corner */}
            <div className="absolute right-4 top-4 text-white p-2 rounded-md shadow-lg">
                <button
                    onClick={handleScrollLeft}
                    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                >
                    {"<"}
                </button>
                <button
                    onClick={handleScrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                >
                    {">"}
                </button>x
            </div>

            {/* Horizontal scroll container */}
            <div
                className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide"
                ref={scrollContainerRef}
            >
                {movies.map((post, i) => (
                    <Link href={`/blog/${post.slug}`} key={i} className="p-2">
                        <div className="min-w-[300px] w-[200px] bg-gradient-to-b from-gray-400 to-gray-300 p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src={`https://moviestremtv.com/${post.frontMatter?.images}`}
                                alt={post.frontMatter?.title}
                                className="w-full h-full object-cover"
                            />
                            <h3 className="mt-2 text-sm font-bold text-black">{post.frontMatter?.title}</h3>
                            {/*  <h3 className="mt-2 text-lg font-bold text-black">{movie.name}</h3>
                            <p className="text-sm text-gray-500">{movie.category}</p>
                            <p className="text-sm text-gray-500">Rating: {movie.rating} ⭐</p> */}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Scroll Buttons */}

        </div>
    );
};

export default Swiper;
