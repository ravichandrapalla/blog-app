"use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";
// import { fetchBlogBySlug, updateBlog } from "../../../utils/api";

export default function Page() {
  const router = useRouter();
  return <p>Post: </p>;

  // const [formData, setFormData] = useState({
  //   title: "",
  //   details: "",
  //   image: null,
  // });
  // const [imagePreview, setImagePreview] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!slug) return;

  //   const fetchBlogData = async () => {
  //     try {
  //       const result = await fetchBlogBySlug(slug);
  //       console.log(result);

  //       const blog = result?.data || {};

  //       if (blog) {
  //         setFormData({
  //           title: blog.title,
  //           details: blog.details,
  //           image: null,
  //         });
  //         setImagePreview(blog.img);
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching blog data:", error);
  //       setError("Failed to load blog data");
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogData();
  // }, [slug]);

  // if (loading)
  //   return <div className="container mx-auto px-4 py-8">Loading...</div>;

  // return (
  //   <div className="container mx-auto px-4 py-8 max-w-2xl">
  //     <Head>
  //       <title>Detailed Blog Post</title>
  //     </Head>

  //     <Link
  //       href="/"
  //       className="text-blue-500 hover:underline mb-6 inline-block"
  //     >
  //       ← Back to all posts
  //     </Link>

  //     <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>

  //     {error && (
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
  //         {error}
  //       </div>
  //     )}

  //     <form onSubmit={handleSubmit} className="space-y-6">
  //       <div>
  //         <label
  //           htmlFor="title"
  //           className="block text-sm font-medium text-gray-700 mb-1"
  //         >
  //           Title
  //         </label>
  //         <input
  //           type="text"
  //           id="title"
  //           name="title"
  //           value={formData.title}
  //           onChange={handleChange}
  //           className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label
  //           htmlFor="details"
  //           className="block text-sm font-medium text-gray-700 mb-1"
  //         >
  //           Details
  //         </label>
  //         <textarea
  //           id="details"
  //           name="details"
  //           value={formData.details}
  //           onChange={handleChange}
  //           rows="10"
  //           className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
  //           required
  //         ></textarea>
  //       </div>

  //       <div>
  //         <label
  //           htmlFor="image"
  //           className="block text-sm font-medium text-gray-700 mb-1"
  //         >
  //           Featured Image
  //         </label>
  //         <input
  //           type="file"
  //           id="image"
  //           name="image"
  //           onChange={handleImageChange}
  //           className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
  //           accept="image/*"
  //         />
  //         {imagePreview && (
  //           <div className="mt-2">
  //             <img
  //               src={imagePreview}
  //               alt="Preview"
  //               className="w-full h-48 object-cover rounded"
  //             />
  //             <p className="text-sm text-gray-500 mt-1">
  //               Current image shown. Upload a new one to replace it.
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </form>
  //   </div>
  // );
}
