'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Interface for the Post type
interface FrontMatter {
  title: string;
  summary: string;
  date: string;
  tags: string[]; // Ensure tags is an array of strings
}

interface Post {
  slug: string;
  frontMatter: FrontMatter;
}

const ListLayout = ({ posts }: { posts: Post[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10; // posts per page
  const postsToShow = posts.slice(0, 500); // limit to 500 posts for display
  const totalPages = Math.ceil(postsToShow.length / postsPerPage);

  const sortedPosts = [...postsToShow].sort((a, b) => {
    return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
  });

  const filteredPosts = sortedPosts.filter((post) =>
    post.frontMatter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Search Input */}
      <div className="offcanvas__search !p-5 flex justify-center items-center w-full h-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search blog..."
          className="w-full max-w-[400px] p-2 border rounded"
        />
      </div>

      {/* Posts List */}
      <div className="row gx-5 mt-n50 mt-sm-n30 mb-50 mb-sm-30 p-4">
        {displayedPosts.map((post, i) => (
          <div
            key={i}
            className="post-prev-2 col-md-6 col-lg-4 mt-50 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-500 mt-sm-30 transform scale-95 transition-transform duration-300 ease-in-out hover:scale-100 hover:shadow-lg"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="p-2 rounded-lg flex flex-row">
                {/* Left side: Post Content */}
                <div className="flex-1 p-2">
                  <div className="post-prev-2-info flex items-center p-1 mb-2">
                    {/* Render Tags */}
                    {post.frontMatter.tags && post.frontMatter.tags.length > 0 ? (
                      post.frontMatter.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-600 text-white border border-black p-2 rounded-lg mr-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all"
                        >
                          <Link href={`/tag/${tag}`}>
                            <div className="text-white hover:text-white">{tag}</div>
                          </Link>
                        </span>
                      ))
                    ) : (
                      ''
                    )}
                  </div>

                  <h2 className="text-lg primary">{post.frontMatter.title}</h2>
                  <p className="py-3 text-sm">{post.frontMatter.summary}</p>

                  <div className="post-prev-2-info flex justify-between items-center">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="!text-white py-2"
                      aria-label={`Discover more ${post.frontMatter.title}`}
                    >
                      Read More
                      <span>
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </Link>
                    <span>{post.frontMatter.date}</span>
                  </div>
                </div>

                {/* Right side: Post Image */}
                <div className="flex-none ml-4 p-2">
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={`/blogimages/${post.slug}.webp`}
                      width={700}
                      height={479}
                      className="rounded-lg border border-black"
                      alt={post.frontMatter.title}
                    />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {searchQuery === "" && (
        <div className="pagination flex items-center justify-center p-6 rounded-lg mt-10 mb-20">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-gray-400 text-lg text-yellow-900 hover:bg-white hover:text-black border-2 border-transparent hover:border-white rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none"
          >
            Prev
          </button>
          <span className="px-6 py-3 primary">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-gray-400 text-lg text-yellow-900 hover:bg-white hover:text-black border-2 border-transparent hover:border-white rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ListLayout;
