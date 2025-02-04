import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

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
  trailer: string;
  recommended: number[];
  image: string;
  screenshots: string[];
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const duration = formData.get("duration") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const language = formData.get("language") as string;
    const description = formData.get("description") as string;
    const trailer = formData.get("trailer") as string;
    const recommended = (formData.get("recommended") as string)
      .split(",")
      .map(id => parseInt(id.trim()));

    // Validate required fields
    if (!name || !slug || !category || isNaN(rating) || !duration || !releaseDate || !language || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    
    // Load existing movies from JSON file
    const filePath = path.join(process.cwd(), 'app', 'data', 'movies.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const movies: Movie[] = JSON.parse(data); // Specify the type here

    // Determine the next ID based on existing movies
    const lastId = movies.length > 0 ? Math.max(...movies.map((movie: Movie) => movie.id)) : 0; // Specify type for movie
    const newMovie: Movie = {
       id: lastId + 1,
      name,
      slug,
      category,
      rating,
      duration,
      releaseDate,
      language,
      description,
      trailer,
      recommended,
      image: "",  // Initialize as an empty string
      screenshots: []  // Initialize as an empty array
    };
    // newMovie.id = lastId + 1;

    // Save image file
    const imageFile = formData.get("image") as File;
    if (imageFile) {
      const imagePath = path.join(process.cwd(), 'public', 'images', `${newMovie.slug}.webp`);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(imagePath, buffer);
      newMovie.image = `/images/${newMovie.slug}.webp`; // Store the image path
    }

    // Save screenshot files
    const screenshotFiles = formData.getAll("screenshots") as File[];
    for (let i = 0; i < screenshotFiles.length; i++) {
      const screenshotFile = screenshotFiles[i];
      if (screenshotFile) {
        const screenshotPath = path.join(process.cwd(), 'public', 'images', `${newMovie.slug}_${i + 1}.webp`);
        const buffer = Buffer.from(await screenshotFile.arrayBuffer());
        fs.writeFileSync(screenshotPath, buffer);
        newMovie.screenshots.push(`/images/${newMovie.slug}_${i + 1}.webp`); // Store each screenshot path
      }
    }

    // Add the new movie to the movies array
    movies.push(newMovie);

    // Write updated movies back to JSON file
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
 console.error("Movie added successfully");
    return NextResponse.json({ message: "Movie added successfully!" }, { status: 200 });
  } catch (error) {
     console.error("Error adding movie:", error);
    return NextResponse.json({ error: "Failed to add movie. Please try again." }, { status: 500 });
  }
}
