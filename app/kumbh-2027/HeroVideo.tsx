'use client'

import { useState, useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const canPlay = () => {
	const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
	return (
		window.matchMedia('(min-width: 768px)').matches &&
		!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
		!conn?.saveData
	)
}

// Loads the drone video only where it is worth it: desktop-class screens,
// no data-saver, no reduced-motion preference. Everyone else keeps the poster.
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
	const play = useSyncExternalStore(subscribe, canPlay, () => false)
	const [ready, setReady] = useState(false)

	if (!src || !play) return null

	return (
		<video
			autoPlay
			muted
			loop
			playsInline
			preload='metadata'
			poster={poster}
			onCanPlay={() => setReady(true)}
			className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
				ready ? 'opacity-100' : 'opacity-0'
			}`}>
			<source src={src} type='video/mp4' />
		</video>
	)
}
