import Home from "./components/Home";

export const metadata = {
  title: "Latest Movies | Watch New & Top-Rated Films Online",
  description: "Discover the latest movies, top-rated films, action, and horror movies with reviews, ratings, and trailers. Stream or watch your favorite films now.",
  keywords: "latest movies, top rated films, action movies, horror movies, movie trailers, movie streaming, watch online, bollywood, hollywood, watch movies online trailer",
  openGraph: {
    title: "Watch New & Top-Rated Movies Online",
    description: "Stream the latest films, explore action-packed movies, and watch trailers of upcoming releases.",
    url: "https://moviestremtv.com",
    type: "website",
    /*  images: [
       {
         url: "https://moviestremtv.com/images/og-image.jpg",
         width: 1200,
         height: 630,
         alt: "Latest Movies Poster",
       }
     ] */
  },
  /*  twitter: {
     card: "summary_large_image",
     site: "@yourTwitterHandle",
     title: "New & Top-Rated Movies | Watch Online",
     description: "Stream the latest movies and top-rated films in action, horror, and more categories.",
     image: "https://moviestremtv.com/images/twitter-image.jpg",
   }, */
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://moviestremtv.com",
  alternates: {
    canonical: "https://moviestremtv.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
