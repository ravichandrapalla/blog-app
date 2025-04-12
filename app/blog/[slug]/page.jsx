"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchBlogBySlug } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";

export default function Page() {
  const { slug } = useParams();

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
    if (!slug) return;

    const fetchBlogData = async () => {
      try {
        const result = await fetchBlogBySlug(slug);
        console.log(result);

        const blog = result?.data || {};

        if (blog) {
          setFormData({
            title: blog.title,
            details: blog.details,
            image: null,
          });
          setImagePreview(blog.img);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data");
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Head>
        <title>Detailed Blog Post</title>
      </Head>

      <Link
        href="/"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        ← Back to all posts
      </Link>

      <h1 className="text-3xl font-bold mb-6">{formData.title}</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold  mb-2">Details</h2>
          <p className=" whitespace-pre-line">{formData.details}</p>
        </div>

        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Featured"
              className="w-full h-64 object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
