'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import { ArrowLeft } from 'lucide-react'

export default function BlogPost() {
	const [post, setPost] = useState<any>(null)
	const [recentPosts, setRecentPosts] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const params = useParams()
	const id = params?.id

	const heroRef = useRef(null)
	const contentRef = useRef(null)

	useEffect(() => {
		const fetchPostData = async () => {
			if (!id) return;
			try {
				setIsLoading(true)
				// Fetch the specific post
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs/${id}`)
				const data = await res.json()

				if (data.success) {
					setPost(data.data)
				}

				// Fetch recent posts for the "More Insights" section
				const recentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs`)
				const recentData = await recentRes.json()
				if (recentData.success) {
					// Exclude the current post and grab up to 3
					setRecentPosts(recentData.data.filter((p: any) => p._id !== id).slice(0, 3))
				}
			} catch (error) {
				console.error('Error fetching blog post:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchPostData()
	}, [id])

	useEffect(() => {
		if (isLoading || !post) return;

		const tl = gsap.timeline()

		tl.fromTo(
			heroRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
		).fromTo(
			contentRef.current,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
			'-=0.6'
		)
	}, [isLoading, post])


	if (isLoading) return <div className='min-h-screen flex items-center justify-center bg-[#f8fafc] w-full'><div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black'></div></div>
	if (!post) return <div className='min-h-screen flex items-center justify-center bg-[#f8fafc] w-full text-xl font-bold flex-col gap-4'>Blog post not found <Link href="/blogs" className="text-sm font-normal text-blue-500 hover:underline">Return to Blogs</Link></div>

	return (
		<main className='min-h-screen bg-[#f8fafc] w-full text-[#1a1a1a]'>
			{/* Navigation */}
			<div className='fixed bottom-8 right-8 md:bottom-auto md:right-auto md:top-8 md:left-8 z-50'>
				<Link
					href='/blogs'
					className='group flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 border border-black/5 shadow-sm text-sm font-bold tracking-wider font-descriptive text-gray-600'>
					<ArrowLeft
						size={18}
						className='group-hover:-translate-x-1 transition-transform'
					/>
					<span>BACK TO INSIGHTS</span>
				</Link>
			</div>

			{/* Hero Section */}
			<div className='relative w-full h-[60vh] md:h-[80vh] overflow-hidden'>
				<div className='absolute inset-0 bg-black/20 z-10' />
				<img
					ref={heroRef}
					src={post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920&h=1080'}
					alt={post.title}
					className='w-full h-full object-cover opacity-0'
				/>
				<div className='absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-linear-to-t from-black/90 via-black/50 to-transparent'>
					<div className='max-w-[1400px] mx-auto'>
						<div className='mb-6 flex gap-4 items-center'>
							<span className='bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase'>
								{post.category?.name || 'Uncategorized'}
							</span>
							<span className='text-gray-200 font-descriptive text-sm'>
								{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
							</span>
						</div>
						<h1 className='font-heading text-4xl md:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tighter max-w-5xl text-white'>
							{post.title}
						</h1>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className='max-w-3xl mx-auto px-6 py-20 md:py-32'>
				<div
					ref={contentRef}
					className='opacity-0 font-descriptive text-base md:text-lg leading-8 text-zinc-700 space-y-8 [&>h3]:text-2xl md:[&>h3]:text-3xl [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-12 [&>h3]:mb-4'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</div>

			{/* More Insights Section */}
			<div className='w-full bg-white py-20 px-4 md:py-32 border-t border-gray-100'>
				<div className='max-w-[1400px] mx-auto'>
					<h3 className='font-heading text-4xl md:text-5xl font-bold text-black mb-16'>More Insights</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{recentPosts.map((relatedPost) => (
							<Link
								key={relatedPost._id}
								href={`/blogs/${relatedPost.slug || relatedPost._id}`}
								className='block h-full'>
								<article className='group flex flex-col h-full bg-white rounded-[32px_8px_32px_8px] overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5'>
									{/* Image Container */}
									<div className='relative w-full h-64 overflow-hidden bg-gray-200 shrink-0'>
										<img
											src={relatedPost.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600'}
											alt={relatedPost.title}
											className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
										/>
									</div>

									{/* Card Body */}
									<div className='p-8 flex-1 flex flex-col'>
										{/* Category */}
										<div className='mb-4'>
											<span className='text-[10px] font-bold tracking-widest text-[#888888] uppercase'>
												{relatedPost.category?.name || 'Uncategorized'}
											</span>
										</div>

										{/* Headline */}
										<h2 className='font-heading text-2xl font-bold leading-[1.1] text-black mb-4 line-clamp-3 group-hover:text-amber-700 transition-colors'>
											{relatedPost.title}
										</h2>

										{/* Description */}
										<p className='font-descriptive text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1'>
											{relatedPost.metaDescription}
										</p>

										{/* Read More Link */}
										<div className='flex items-center gap-2 text-black text-xs font-bold tracking-wide uppercase transition-all duration-300 group-hover:opacity-70'>
											Read Article
											<div className='w-8 h-px bg-black/20' />
										</div>
									</div>
								</article>
							</Link>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}
