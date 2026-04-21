'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ArrowLeft } from 'lucide-react'

interface BlogContentProps {
  post: any;
  recentPosts: any[];
}

export default function BlogContent({ post, recentPosts }: BlogContentProps) {
	const heroRef = useRef(null)
	const contentRef = useRef(null)

	useEffect(() => {
		// Force scroll to top once the full content is actually rendered.
		window.scrollTo(0, 0);

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
	}, [post])

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
			<div className='relative w-full h-screen overflow-hidden bg-black'>
				<div className='absolute inset-0 bg-black/40 z-10' />
				<img
					ref={heroRef}
					src={post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920&h=1080'}
					alt={post.title}
					className='w-full h-full object-cover opacity-0'
				/>
				<div className='absolute inset-0 w-full p-8 md:p-16 z-20 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-center md:justify-end'>
					<div className='max-w-[1400px] mx-auto w-full'>
						<div className='mb-6 flex gap-4 items-center justify-center md:justify-start'>
							<span className='bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase'>
								{post.category?.name || 'Uncategorized'}
							</span>
							<span className='text-gray-200 font-descriptive text-sm'>
								{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
							</span>
						</div>
						<h1 className='font-heading text-4xl md:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tighter max-w-5xl text-white text-center md:text-left'>
							{post.title}
						</h1>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className='max-w-4xl mx-auto px-6 py-20 md:py-32'>
				<div
					ref={contentRef}
					className={`opacity-0 font-descriptive text-base md:text-lg leading-relaxed text-zinc-700 
						[&>p]:mb-6 [&>p]:leading-loose
						[&>h1]:text-3xl md:[&>h1]:text-4xl [&>h1]:font-heading [&>h1]:font-bold [&>h1]:text-black [&>h1]:mt-12 [&>h1]:mb-6
						[&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-heading [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-10 [&>h2]:mb-5
						[&>h3]:text-xl md:[&>h3]:text-2xl [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-8 [&>h3]:mb-4
						[&>h4]:text-lg md:[&>h4]:text-xl [&>h4]:font-heading [&>h4]:font-bold [&>h4]:text-black [&>h4]:mt-6 [&>h4]:mb-3
						[&_a]:text-blue-600 [&_a]:underline [&_a]:decoration-blue-200 [&_a]:underline-offset-4 hover:[&_a]:text-blue-800 hover:[&_a]:decoration-blue-600 [&_a]:transition-colors
						[&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-zinc-600 [&_blockquote]:my-8 [&_blockquote]:py-2
						[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul_li::marker]:text-zinc-400
						[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
						[&_code]:bg-zinc-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:text-[0.875em] [&_code]:font-mono [&_code]:text-rose-600
						[&_pre]:bg-zinc-900 [&_pre]:text-zinc-100 [&_pre]:p-6 [&_pre]:rounded-xl [&_pre]:shadow-lg [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0 [&_pre_code]:text-[0.9em] [&_pre]:my-8
						[&_img]:w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:shadow-md [&_img]:my-8
						[&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:rounded-xl [&_iframe]:my-8
						[&_video]:w-full [&_video]:max-w-full [&_video]:rounded-xl [&_video]:my-8
						[&_hr]:border-t [&_hr]:border-zinc-200 [&_hr]:my-12
						[&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_th]:border-b-2 [&_th]:border-zinc-200 [&_th]:p-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-black [&_td]:border-b [&_td]:border-zinc-100 [&_td]:p-4
						wrap-break-word [&_p]:wrap-break-word [&_a]:break-all`}
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
								href={`/blogs/${relatedPost.slug || relatedPost._id || '#'}`}
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
