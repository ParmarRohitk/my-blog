import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
// import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';

interface Params {
    slug: string;
}

// Fetch blog data from the file system
async function getBlogData(slug: string) {
    const dirs = [path.join(process.cwd(), 'app/data/blog')]; // Adjust to check multiple directories

    const getMdxFiles = (dir: string) => {
        if (fs.existsSync(dir)) {
            return fs.readdirSync(dir)
                .filter(file => file.endsWith('.mdx'))
                .map(file => path.join(dir, file));
        }
        return [];
    };

    let filePath: string | undefined;
    for (const dir of dirs) {
        const mdxFiles = getMdxFiles(dir);
        filePath = mdxFiles.find(file => file.includes(`${slug}.mdx`));
        if (filePath) break;
    }

    if (!filePath) throw new Error(`File for slug "${slug}" not found.`);

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);

    return { content, data };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { data } = await getBlogData(slug);
    const baseSiteURL = process.env.FRONTEND_URL;

    const siteURLWithBlog = `${baseSiteURL}/blog/${slug}`;
    const seoURL = `/assets/data/blogimages/${slug}.webp`;
    const imageUrl = seoURL ? `${baseSiteURL}${seoURL}` : `${baseSiteURL}/default_seo_image.webp`;

    const seotitle = data.seotitle || data.title;

    return {
        title: seotitle,
        description: data.summary,
        keywords: (data.tags && data.tags.join(", ")),
        /* metadataBase: new URL(siteURLWithBlog),
        alternates: {
            canonical: siteURLWithBlog,
        }, */
        authors: data.author,
        images: [
            {
                url: imageUrl,
                width: "1200",
                height: "700",
                alt: seotitle,
                type: "image/webp",
            },
        ],
        openGraph: {
            locale: "en_US",
            // type: "image/webp",
            url: siteURLWithBlog,
            title: seotitle,
            description: data.summary,
            siteName: data.author,
            images: [
                {
                    url: imageUrl,
                    width: "1200",
                    height: "700",
                    alt: seotitle,
                    type: "image/webp",
                },
            ],
        },
    };
}

// Blog detail page component
export default async function BlogDetailPage({ params }: { params: Params }) {
    const { slug } = params;

    const { content, data } = await getBlogData(slug);

    // const serializedContent = await serialize(content);

    return (
        <main>
            <section className="blog__detail py-12 ">
                <div className="container px-4 mx-auto">
                    <div className="row">
                        <div className="col-xxl-12 flex items-center justify-center">
                            <div className=" text-center space-y-6 mt-6 mb-5">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-300">{data.title}</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-center pt-2">
                            <Image
                                src={`${data.images}`}
                                width={700}
                                height={479}
                                className="rounded-lg border border-black"
                                alt={data.title}
                            />
                        </div>

                        <div className="col-xxl-12 mt-5">
                            <div className="blog__detail-content pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8">
                                <div className="prose max-w-full">
                                    <MDXRemote source={content} />
                                    {/* <MDXRemote source={serializedContent} {...serializedContent} /> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

