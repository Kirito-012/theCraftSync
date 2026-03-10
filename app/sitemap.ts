import { MetadataRoute } from 'next'
import connectDB from './config/database'
import Blog from './models/Blog'
import { projectsData } from './lib/projectsData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.thecraftsync.com'
  
  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about-us',
    '/projects',
    '/contact',
    '/blogs',
    '/services',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Case Study Routes (from library)
  const caseStudyRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/case-study/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // 3. Blog Routes (from database)
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    await connectDB()
    const blogs = await Blog.find({}, 'slug _id updatedAt').lean()
    blogRoutes = blogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug || blog._id}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Sitemap: Error fetching blogs', error)
  }

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes]
}
