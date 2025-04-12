"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { fetchBlogById, updateBlog } from "../../../../utils/api";

export default function EditBlog({ params }) {
  const router = useRouter();
  const { id } = params;

  console.log("parsm", id);

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async () => {
      try {
        const mockBlogs = {
          1: {
            id: 1,
            title: "Getting Started with Next.js",
            slug: "getting-started-with-nextjs",
            details: `Next.js is a React framework for production that makes building web applications simple and powerful.

With Next.js, you get:
- Server-side rendering and static site generation
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support
- API routes to build API endpoints
- Fully extendable

This framework has gained tremendous popularity due to its developer experience and performance optimizations. Whether you're building a small personal blog or a large enterprise application, Next.js provides the tools you need to create a fast, user-friendly experience.`,
            imageUrl: "/images/nextjs.jpg",
            createdAt: "2025-04-10",
          },
          2: {
            id: 2,
            title: "Node.js Best Practices",
            slug: "nodejs-best-practices",
            details: `When building applications with Node.js, following established best practices can significantly improve your code quality and application performance.

Here are some key Node.js best practices:

1. Use async/await for asynchronous operations
2. Implement proper error handling
3. Follow the Twelve-Factor App methodology
4. Use environment variables for configuration
5. Implement logging for better debugging
6. Write unit and integration tests
7. Use a style guide and linter
8. Keep your dependencies updated
9. Use a process manager in production
10. Implement proper security measures

These practices will help you build more maintainable, secure, and efficient Node.js applications.`,
            imageUrl: "/images/nodejs.jpg",
            createdAt: "2025-04-09",
          },
        };

        const blog = mockBlogs[id] || null;

        if (blog) {
          setFormData({
            title: blog.title,
            details: blog.details,
            image: null,
          });
          setImagePreview(blog.imageUrl);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data");
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (!formData.title.trim() || !formData.details.trim()) {
        throw new Error("Title and details are required");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to homepage after successful update
      router.push("/");
    } catch (error) {
      console.error("Error updating blog post:", error);
      setError(error.message || "Failed to update blog post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Head>
        <title>Edit Blog Post</title>
      </Head>

      <Link
        href="/"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        ← Back to all posts
      </Link>

      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Details
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="10"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Featured Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            accept="image/*"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                Current image shown. Upload a new one to replace it.
              </p>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
