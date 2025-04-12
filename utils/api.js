"use client";

export const fetchBlogs = async (page = 1, limit = 5) => {
  console.log("calaling api");
  try {
    const response = await fetch(
      `http://localhost:5000/api/blogs?page=${page}&limit=${limit}`
    );

    const data = await response.json();
    console.log(data);
    if (!data || data.length === 0) {
      return {
        data: [],
        totalPages: 0,
        currentPage: 1,
      };
    }
    const { blogs = [], currentPage = 1, totalPages = 1 } = data;
    console.log("data is ", data);

    return {
      data: blogs,
      totalPages: totalPages,
      currentPage: currentPage,
    };
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const fetchBlogBySlug = async (slug) => {
  try {
    return {
      data: null,
    };
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    return {
      data: null,
    };
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const createBlog = async (formData) => {
  try {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("details", formData.details);
    if (formData.image) {
      form.append("image", formData.image);
    }

    const response = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    console.log("posting done", data);
    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const updateBlog = async (id, formData) => {
  try {
    return {
      success: true,
      data: {
        id,
        title: formData.title,
        details: formData.details,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        imageUrl: formData.image ? "image-url-would-go-here" : null,
        updatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
