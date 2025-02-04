"use client";
import Link from 'next/link';
import React from 'react';
import data from '../data/data.json'
// import Image from 'next/image';
// interface post {
//   id: number;
//   name: string;
//   slug: string;
//   category: string;
//   rating: number;
//   duration: string;
//   releaseDate: string;
//   language: string;
//   description: string;
//   image: string;
//   trailer: string;
//   recommended: number[];
// }

const Newposts = () => {

  const sorted = data.sort((a, b) => {
    // Convert the date strings into Date objects for comparison
    const dateA = new Date(a.frontMatter.date);
    const dateB = new Date(b.frontMatter.date);

    // Sort in descending order (newest first)
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      <head>
        <title>New Blogs | postStreamTV</title>
      </head>
      <div className="p-6 pt-[60px]">
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6">
          <div className="flex justify-center mb-9 mt-6">
            <div className="max-w-4xl mx-auto rounded-lg p-6 md:p-12 text-md">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Latest Blogs</h1>
              {/* {JSON.stringify(data)} */}
              <ul className="space-y-10">
                {sorted.slice(0, 20).map((post, index) => (
                  <li key={index} className="p-4 bg-white bg-opacity-10 rounded-md shadow-md flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                    {index % 2 === 0 ? (
                      <>
                        <div className="md:w-1/2">
                          <Link href={`/blog/${post.slug}`}>

                            <div className="mt-4 text-white">
                              <h2 className="text-2xl font-semibold">{post.frontMatter.title}</h2>
                              <p className="text-md text-gray-300">{post.frontMatter.date}</p>
                              <p className="text-sm text-gray-300">{post.frontMatter?.tags?.[0]} </p>
                              {/* <p className="text-sm text-gray-300">Rating: {post.frontMatter.rating}</p> */}
                              <p className="text-gray-300 text-sm mt-2">{post.frontMatter.summary}</p>
                            </div>
                          </Link>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                          <Link href={`/blog/${post.slug}`}>
                            <div className="w-full h-60 overflow-hidden rounded-md shadow-md">
                              <img
                                src={`http://localhost:3000/${post.frontMatter.images}`}
                                alt={post.frontMatter.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="md:w-1/2 flex justify-center">
                          <Link href={`/blog/${post.slug}`}>
                            <div className="w-full h-60 overflow-hidden rounded-md shadow-md">
                              <img
                                src={`http://localhost:3000/${post.frontMatter.images}`}
                                alt={post.frontMatter.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="md:w-1/2">
                          <Link href={`/blog/${post.slug}`}>

                            <div className="mt-4 text-white">
                              <h2 className="text-2xl font-semibold">{post.frontMatter.title}</h2>
                              <p className="text-md text-gray-300">{post.frontMatter.date}</p>
                              <p className="text-sm text-gray-300">{post.frontMatter?.tags?.[0]} </p>
                              {/* <p className="text-sm text-gray-300">Rating: {post.frontMatter.rating}</p> */}
                              <p className="text-gray-300 text-sm mt-2">{post.frontMatter.summary}</p>
                            </div>
                          </Link>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newposts;
