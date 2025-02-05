import React from "react";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ListLayout from "./ListLayout";

export async function generateMetadata() {
    const baseSiteURL = process.env.SITE_URL;
    const siteURLWithBlog = `${baseSiteURL}/blog`;
    /* const defaultImage = "";
    const imageUrl = ''; */

    const siteName = 'JBcodeapp Article';

    return {
        title: 'Watch Movies & TV Shows Online - MovieStremTV',
        description: 'Stream the latest movies and TV shows online in HD on MovieStremTV. Enjoy unlimited entertainment anytime, anywhere on any device.',
        keywords: "Movies streaming, Watch TV shows online, Free movie streaming, HD movies online, Latest movies 2025, Best streaming site, Online TV shows, MovieStremTV, Watch free movies, HD streaming platform",
        metadataBase: new URL(siteURLWithBlog),
        alternates: {
            canonical: siteURLWithBlog,
        },
        authors: "moviestremtv",
        /*  images: [
             {
                 url: imageUrl,
                 width: metadata.og_image_width,
                 height: metadata.og_image_height,
                 alt: metadata.og_image_alt,
                 type: defaultImage,
             },
         ], */
        openGraph: {
            locale: "en_US",
            // type: "image/webp",
            url: siteURLWithBlog,
            title: 'Watch Movies & TV Shows Online - MovieStremTV',
            description: 'Stream the latest movies and TV shows online in HD on MovieStremTV. Enjoy unlimited entertainment anytime, anywhere on any device.',
            siteName: siteName,
            /* images: [
                {
                    url: imageUrl,
                    width: "1200",
                    height: "700",
                    alt: 'Watch Movies & TV Shows Online - MovieStremTV',
                    type: "image/webp",
                },
            ], */
        }
    };
}

const getMdxFilesFromDirectory = (dir: string) => {
    let files: string[] = [];

    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            files = [...files, ...getMdxFilesFromDirectory(itemPath)];
        } else if (stat.isFile() && item.endsWith('.mdx')) {
            files.push(itemPath);
        }
    });

    return files;
};

// Function to save data to JSON file
const saveDataToJson = (data: string) => {
    const jsonFilePath = path.join(process.cwd(), 'app/data/data.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

export default async function BoldBlogPage() {
    const postsDirectory = path.join(process.cwd(), 'app/data/blog');
    const mdxFiles = getMdxFilesFromDirectory(postsDirectory);

    const posts = mdxFiles.map((filePath) => {

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = path.basename(filePath, '.mdx');

        return {
            slug,
            frontMatter: data,
        }

    });

    saveDataToJson(posts as never);

    return (
        <>
            <main className='p-9 pt-[80px]'>
                <ListLayout posts={posts as never} />
            </main>
        </>
    );
} 