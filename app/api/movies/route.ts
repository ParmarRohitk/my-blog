import { NextResponse } from 'next/server';
import movies from '@/app/data/movies.json';

export async function GET() {
  return NextResponse.json(movies);
}
