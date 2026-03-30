import React from 'react'
import connectDB from '../config/database'
import Blog from '../models/Blog'
import Category from '../models/Category'
import BlogListContent from './BlogListContent'

// For SEO: Dynamic Metadata
export const metadata = {
  title: 'Insights | TheCraftSync',
  description: 'Discover practical ideas and proven strategies across marketing, technology, and business growth on TheCraftSync blog.',
}

export default async function BlogPage() {
  await connectDB()

  // Fetch blogs with category population
  const blogsData = await Blog.find({})
    .populate('category')
    .sort({ createdAt: -1 })
    .lean();

  // Fetch active categories
  const categoriesData = await Category.find({ isActive: true })
    .lean();

  // Convert MongoDB objects to plain JS objects for the Client Component
  const serializableBlogs = JSON.parse(JSON.stringify(blogsData));
  const serializableCategories = JSON.parse(JSON.stringify(categoriesData));

  return (
    <BlogListContent 
      blogs={serializableBlogs} 
      categoriesData={serializableCategories} 
    />
  )
}
