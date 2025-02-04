// types.ts
export interface Movie {
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
