'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

interface Movie {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  language: string;
  releaseDate: string;
  duration: string;
  rating: number;
}

const LanguagePage = ({ params }: { params: { language: string } }) => {
  const { language } = params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data: Movie[]) => {
        const filteredMovies = data.filter((movie) =>
          movie.language.split(", ")[0].toLowerCase().split(", ").some((cat) =>
            language.toLowerCase().split(", ").includes(cat)
          )
        );

        // Sort movies by releaseDate (assuming releaseDate is in YYYY-MM-DD format)
        const sortedMovies = filteredMovies.sort((a, b) => {
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        });

        setMovies(sortedMovies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(true);
        setLoading(false);
      });
  }, [language]);

  const pageTitle = `${language.toUpperCase()} Movies - Find the Best ${language.toUpperCase()} Films`;
  const pageDescription = `Discover the top ${language} movies, including popular releases and highly rated films. Watch your favorite ${language} films today!`;

  if (loading) {
    return (
      <div className="pt-[100px] px-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-300 animate-pulse h-[300px] rounded-lg"></div>
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
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${language} movies, top ${language} films, best ${language} movies`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://moviestremtv.com/in/${language}`} />
        <meta property="og:site_name" content="Moviestremtv" />
        <link rel="canonical" href={`https://moviestremtv.com/in/${language}`} />
      </head>

      <div className="pt-[100px] px-9 pt-[50px]">
        {movies.length > 0 ? (
          <>
            <h1 className="pb-5 pt-5 text-xl flex items-center justify-center">{language.toUpperCase()} Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <Link
                  key={movie.slug}
                  href={`/${movie.category.split(", ")[0]}/${movie.slug}`}
                >
                  <div className="movie-card cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg hover:shadow-2xl rounded-lg overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                      <h2 className="text-xl text-white font-bold">{movie.name}</h2>
                      <p className="text-sm">{movie.releaseDate}</p>
                      <div className="flex justify-between items-center mt-2 text-white">
                        <h3 className="text-lg font-medium">{movie.language.split(", ")[0]}</h3>
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
              No movies found for this language.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguagePage;
