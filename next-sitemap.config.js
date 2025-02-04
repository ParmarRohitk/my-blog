// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// Load the movie data from the JSON file
const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./app/data/data.json"), "utf8")
);

module.exports = {
  siteUrl: process.env.SITE_URL || "https://moviestremtv.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,

  // Add dynamic paths for movies, categories, and languages
  additionalPaths: async (config) => {
    const moviePaths = movies.map((movie) => ({
      loc: `/blog/${movie.slug}`, // Dynamic movie URL based on slug
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }));

    // Generate unique category paths (e.g., /movie-category)
    /*    const categoryPaths = Array.from(
      new Set(movies.map((movie) => `/${movie.category}`))
    ).map((category) => ({
      loc: category.toLowerCase(), // Assuming category names are URL-friendly
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    })); */

    // Generate unique language paths (e.g., /in/movie-language)
    /* const languagePaths = Array.from(
      new Set(movies.map((movie) => `/in/${movie.language}`))
    ).map((language) => ({
      loc: language.toLowerCase(), // Assuming language names are URL-friendly
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    })); */

    const staticPaths = [
      {
        loc: "/new-blogs",
        changefreq: config.changefreq,
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },

      {
        loc: "/about-us",
        changefreq: config.changefreq,
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/privacy-policy",
        changefreq: config.changefreq,
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ];

    // Combine all paths (moviePaths, categoryPaths, languagePaths)
    const allPaths = [...moviePaths, ...staticPaths];

    // Filter out paths that should not be included in the sitemap
    const filteredPaths = allPaths.filter((path) => {
      const loc = path.loc.toLowerCase();
      return !loc.startsWith("/api/") && !loc.startsWith("/add-movie/");
    });

    return filteredPaths;
  },
};
