"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { fetchBlogs } from "../utils/api";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    console.log("triggered");
    const getBlogs = async () => {
      try {
        const result = await fetchBlogs(currentPage, postsPerPage);
        const { data, totalPages } = result;

        console.log("API response --> ", result);

        setBlogs(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, [currentPage, postsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Blog Website</title>
        <meta
          name="description"
          content="A blogging website built with Next.js"
        />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      <div className="mb-4">
        <Link
          href="/blog"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <img
                  src={blog.imageUrl || "/images/placeholder.jpg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="md:w-3/4 md:pl-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="mb-4">{blog.details.substring(0, 150)}...</p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </Link>
                <div className="mt-4">
                  <Link
                    href={`/blog/edit/${blog.id}`}
                    className="text-yellow-500 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
