'use client'
import {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import logo1 from '../assets/logo1.png'
import Link from 'next/link'
import gsap from 'gsap'

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const navRef = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	const navItems: {name: string; href: string; hasDropdown?: boolean}[] = [
		{name: 'Home', href: '/'},
		{name: 'About Us', href: '/about-us'},
		{name: 'Projects', href: '/projects'},
		{name: 'Case Study', href: '/case-study'},
		{name: 'Blog', href: '/blogs'},
	]

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
				// Scrolling down and past 100px
				setIsVisible(false)
			} else if (currentScrollY < lastScrollY || isMenuOpen) {
				// Scrolling up or menu is open
				setIsVisible(true)
			}

			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll, {passive: true})

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [lastScrollY, isMenuOpen])

	useEffect(() => {
		if (isMenuOpen && menuRef.current) {
			const items = menuRef.current.children
			gsap.fromTo(
				items,
				{y: 50, opacity: 0},
				{y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out'}
			)
		}
	}, [isMenuOpen])

	return (
		<nav
			ref={navRef}
			className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[80%] max-w-4xl transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${
				isVisible ? 'translate-y-0' : '-translate-y-[150%]'
			}`}>
			<div
				className={`bg-black/90 px-6 backdrop-blur-xl shadow-2xl border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] overflow-hidden flex flex-col ${
					isMenuOpen
						? 'rounded-4xl pt-6 pb-12 h-[85vh]'
						: 'rounded-[34px] md:px-8 py-3 h-17'
				}`}>
				<div
					className={`flex items-center justify-between w-full gap-20 transition-all duration-300`}>
					{/* Logo */}
					<Link href='/'>
						<Image
							src={logo1}
							alt='Logo'
							width={40}
							height={40}
							className='h-8 w-auto shrink-0'
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden lg:flex items-center gap-5'>
						{navItems.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								className='text-zinc-400 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center gap-1 group whitespace-nowrap'>
								{item.name}
								{item.hasDropdown && (
									<svg
										className='w-4 h-4 group-hover:rotate-180 transition-transform duration-300'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								)}
							</Link>
						))}
					</div>

					{/* Contact Button - Desktop */}
					<button className='hidden lg:flex items-center gap-2 border-2 border-gray-800 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white hover:text-black group'>
						<Link href='/contact'>
							<span className='w-2 h-2 bg-white rounded-full transition-all duration-300 group-hover:bg-black'></span>
							Contact Us
						</Link>
					</button>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className='lg:hidden text-white p-2 relative z-50'
						aria-label='Toggle menu'>
						<div className='flex flex-col gap-1.5 w-6'>
							<span
								className={`h-0.5 w-full bg-white transition-all duration-300 ${
									isMenuOpen ? 'rotate-45 translate-y-2' : ''
								}`}
							/>
							<span
								className={`h-0.5 w-full bg-white transition-all duration-300 ${
									isMenuOpen ? 'opacity-0' : ''
								}`}
							/>
							<span
								className={`h-0.5 w-full bg-white transition-all duration-300 ${
									isMenuOpen ? '-rotate-45 -translate-y-2' : ''
								}`}
							/>
						</div>
					</button>
				</div>

				{/* Mobile Menu Content */}
				{isMenuOpen && (
					<div
						ref={menuRef}
						className='lg:hidden mt-12 flex flex-col justify-between flex-1 h-full w-full'>
						<div className='flex flex-col gap-6 text-center'>
							{navItems.map((item, index) => (
								<Link
									key={index}
									href={item.href}
									className='text-3xl font-heading font-bold text-white/90 hover:text-white transition-colors'
									onClick={() => setIsMenuOpen(false)}>
									{item.name}
								</Link>
							))}
						</div>

						{/* Contact Button - Mobile */}
						<div className='flex flex-col gap-4 w-full'>
							<Link
								href='/contact'
								onClick={() => setIsMenuOpen(false)}
								className='w-full bg-white text-black py-4 rounded-full font-bold text-center tracking-wider hover:bg-gray-200 transition-colors'>
								CONTACT US
							</Link>
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
