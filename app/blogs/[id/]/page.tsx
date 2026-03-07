import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import Link from 'next/link';

type Props = {
	params: Promise<{ id: string }>;
};

async function getPostData(id: string) {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
		const res = await fetch(`${baseUrl}/api/blogs/${id}`, { next: { revalidate: 3600 } });
		const data = await res.json();
		return data.success ? data.data : null;
	} catch (error) {
		console.error('Error fetching post:', error);
		return null;
	}
}

async function getRecentPosts(currentId: string) {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
		const res = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 3600 } });
		const data = await res.json();
		if (data.success) {
			return data.data.filter((p: any) => p._id !== currentId && p.slug !== currentId).slice(0, 3);
		}
		return [];
	} catch (error) {
		console.error('Error fetching recent posts:', error);
		return [];
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const post = await getPostData(id);

	if (!post) {
		return {
			title: 'Post Not Found',
		};
	}

	return {
		title: post.metaTitle || post.title,
		description: post.metaDescription,
		alternates: {
			canonical: `https://www.thecraftsync.com/blogs/${post.slug || post._id}`,
		},
		openGraph: {
			title: post.metaTitle || post.title,
			description: post.metaDescription,
			images: post.image ? [post.image] : [],
			type: 'article',
			publishedTime: post.date,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.metaTitle || post.title,
			description: post.metaDescription,
			images: post.image ? [post.image] : [],
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { id } = await params;
	const post = await getPostData(id);

	if (!post) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#f8fafc] w-full text-xl font-bold flex-col gap-4'>
				Blog post not found
				<Link href="/blogs" className="text-sm font-normal text-blue-500 hover:underline">
					Return to Blogs
				</Link>
			</div>
		);
	}

	const recentPosts = await getRecentPosts(post._id);

	return <BlogPostClient post={post} recentPosts={recentPosts} />;
}
