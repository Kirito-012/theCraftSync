'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

export default function Reveal({
	children,
	delay = 0,
	className = '',
	as: Tag = 'div',
}: {
	children: ReactNode
	delay?: number
	className?: string
	as?: ElementType
}) {
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('kb-in')
						io.unobserve(e.target)
					}
				})
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])

	return (
		<Tag
			ref={ref}
			className={`kb-reveal ${className}`}
			style={{ ['--d' as string]: `${delay}ms` }}>
			{children}
		</Tag>
	)
}
