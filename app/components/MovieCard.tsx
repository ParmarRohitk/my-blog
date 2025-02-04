// app/components/MovieCard.tsx

import Image from "next/image";

interface MovieCardProps {
    movie: { title: string; slug: string; poster: string };
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="movie-card">
            <a href={`/movie/${movie.slug}`}>
                <Image src={movie.poster} alt={movie.title} className="movie-poster" width="300" height="450" />
                <h2>{movie.title}</h2>
            </a>
        </div>
    );
};

export default MovieCard;
