"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  name: string;
  slug: string;
  category: string;
  rating: number;
  duration: string;
  releaseDate: string;
  language: string;
  description: string;
  image: string;
  trailer: string;
  recommended: number[];
}

const TopRatedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/movies')
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const topRatedMovies = data.filter((movie: Movie) => movie.rating >= 8.0);
        setMovies(topRatedMovies.slice(0, 20)); // Display top 10 rated movies
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-white text-2xl">Loading...</div>;

  return (
    <>
      <head>
        <title>Top-Rated Movies | MovieStreamTV</title>
      </head>
      <div className="p-6 pt-[60px]">
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6">
          <div className="flex justify-center mb-9 mt-6">
            <div className="max-w-4xl mx-auto rounded-lg p-6 md:p-12 text-md">

              {/* Top-Rated Movies Section */}
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 mt-12 text-white">Top Rated Movies</h2>
              <ul className="space-y-10">
                {movies.map((movie, index) => (
                  <li key={movie.id} className={`p-4 bg-white bg-opacity-10 rounded-md shadow-md flex flex-col md:flex-row space-y-6 md:space-y-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:space-x-6`}>
                    <div className="md:w-1/2 flex justify-center">
                      <Link href={`/${movie.category}/${movie.slug}`}>
                        <div className="w-48 h-72 overflow-hidden rounded-md shadow-md">
                          <img src={movie.image} alt={movie.name} className="w-full h-full object-cover" />
                        </div>
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <div className="mt-4 text-white">
                        <h2 className="text-2xl font-semibold">{movie.name}</h2>
                        <p className="text-md text-gray-300">{movie.releaseDate}</p>
                        <p className="text-sm text-gray-300">{movie.category} | {movie.duration} | {movie.language}</p>
                        <p className="text-sm text-gray-300">Rating: {movie.rating}</p>
                        <p className="text-gray-300 mt-2">{movie.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRatedMovies;
