import React from 'react'
import connectDB from '../../config/database'
import Blog from '../../models/Blog'
import Category from '../../models/Category'
import BlogContent from './BlogContent'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getPostData(idOrSlug: string) {
  await connectDB()
  
  // Try finding by slug first, then by ID
  let post = await Blog.findOne({ slug: idOrSlug }).populate('category').lean()
  if (!post && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    post = await Blog.findById(idOrSlug).populate('category').lean()
  }
  
  if (!post) return null

  // Fetch recent posts
  const recentPostsData = await Blog.find({ _id: { $ne: post._id } })
    .populate('category')
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()

  return {
    post: JSON.parse(JSON.stringify(post)),
    recentPosts: JSON.parse(JSON.stringify(recentPostsData))
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const data = await getPostData(id)
  
  if (!data) return { title: 'Post Not Found' }

  return {
    title: data.post.metaTitle || data.post.title,
    description: data.post.metaDescription,
    openGraph: {
      title: data.post.title,
      description: data.post.metaDescription,
      images: [data.post.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.post.title,
      description: data.post.metaDescription,
      images: [data.post.image],
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params
  const data = await getPostData(id)

  if (!data) {
    notFound()
  }

  return <BlogContent post={data.post} recentPosts={data.recentPosts} />
}
