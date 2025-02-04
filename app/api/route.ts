import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const moviesPath = path.join(process.cwd(), 'app/data/movies.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!fs.existsSync(moviesPath)) {
      fs.writeFileSync(moviesPath, JSON.stringify([]));
    }

    const fileData = fs.readFileSync(moviesPath, 'utf8');
    const movies = JSON.parse(fileData) || [];
    const newMovie = { ...body, id: movies.length + 1 };

    movies.push(newMovie);
    fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

    return NextResponse.json({ message: 'Movie added successfully!', movie: newMovie });
  } catch (error) {
    console.error("Error adding movie:", error);
    return NextResponse.json({ message: 'Failed to add movie.' }, { status: 500 });
  }
}
