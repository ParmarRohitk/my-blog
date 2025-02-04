'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

interface Movie {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  releaseDate: string;
  duration: string;
  rating: number;
}

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    // Fetch movies from the API
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data: Movie[]) => {
        const filteredMovies = data.filter((movie) =>
          movie.category.split(", ")[0].toLowerCase().split(", ").some((cat) =>
            category.toLowerCase().split(", ").includes(cat)
          )
        );

        setMovies(filteredMovies);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(true); // Set error state
        setLoading(false); // Stop loading
      });
  }, [category]);

  if (loading) {
    return (
      <div className="pt-[100px] px-9">
        {/* <h1 className="pb-5 text-xl">Loading movies...</h1> */}
        {/* Example skeleton loader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-300 animate-pulse h-[300px]  rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[100px] px-9">
        <h1 className="pb-5 text-xl">Error fetching movies. Please try again later.</h1>
      </div>
    );
  }

  return (
    <>
      {/*  <head>
        <title>{movies}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${language} movies, top ${language} films, best ${language} movies`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://moviestremtv.com/in/${language}`} />
        <meta property="og:site_name" content="Moviestremtv" />
        <link rel="canonical" href={`https://moviestremtv.com/in/${language}`} />

      </head> */}

      <div className="pt-[100px] px-9 pt-[50px]">
        {movies.length > 0 ? (
          <>
            <h1 className="pb-5 text-xl flex items-center justify-center">{category.toUpperCase()} Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <Link
                  key={movie.slug}
                  href={`/${movie.category.split(", ")[0]}/${movie.slug}`} // Create dynamic link to movie page
                >
                  <div className="movie-card cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg hover:shadow-2xl rounded-lg overflow-hidden">
                    {/* Movie Image */}
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
                    />


                    {/* Movie Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                      <h2 className="text-xl text-white font-bold">{movie.name}</h2>
                      <div className="flex justify-between items-center mt-2 text-white">
                        <h3 className="text-lg font-medium">{movie.category.split(", ")[0]}</h3>
                        <p className="text-yellow-400">{movie.rating} ⭐</p>
                        <p className="text-sm">{movie.duration}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              No movies found for this category.
            </p>
          </div>
        )}
      </div>
    </>


  );
};

export default CategoryPage;
