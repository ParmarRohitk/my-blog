'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    slug: string;
    name: string;
    category: string;
    rating: number;
    duration: string;
    releaseDate: string;
    language: string;
    description: string;
    image: string;
    trailer: string;
    screenshots: string[];
    recommended: number[];
}

const MoviesList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/api/movies');
            if (response.ok) {
                const data = await response.json();
                setMovies(data);
            } else {
                console.error('Failed to fetch movies.');
            }
        };
        fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort movies by release date (latest first)
    const sortedMovies = filteredMovies.sort((a, b) =>
        new Date(b.id).getTime() - new Date(a.id).getTime()
    );

    return (
        <>
            <head>
                <title>Sitemap | Moviestremtv</title>
            </head>
            <div className='p-6 pt-[60px]'>
                <div className="min-h-screen p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                    <div className="flex justify-center mb-9 mt-6 -pt-8">
                        <input
                            type="text"
                            placeholder="Search Movie Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 w-full md:w-1/3 rounded text-center text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                        {sortedMovies.map(movie => (
                            <div key={movie.id} className="bg-white text-black rounded-lg shadow-lg p-4">
                                <Link href={`/${movie.category.split(", ")[0]}/${movie.slug}`} >
                                    <h2 className="text-xl font-semibold">
                                        {/* {movie.id} */}
                                        <span className="text-sm">{movie.name}</span>
                                    </h2>
                                </Link>

                                {/*  <img
                            src={movie.image || '/placeholder.png'} // Use a placeholder if image is not available
                            alt={movie.name}
                            className="mt-2 w-[200px] h-[300px] object-cover rounded-md border border-black"
                        /> */}
                                {/*  <p><strong>Category:</strong> {movie.category}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <p><strong>Duration:</strong> {movie.duration}</p>
                        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                        <p><strong>Language:</strong> {movie.language}</p>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <p><strong>Recommended:</strong> {movie.recommended.join(', ')}</p> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};


export default MoviesList;
