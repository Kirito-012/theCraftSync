import type {Metadata} from 'next'
import './globals.css'
import Navbar from './Components/Header'
import Footer from './Components/Footer'
import SmoothScroll from './Components/SmoothScroll';




export const metadata: Metadata = {
	title: 'TheCraftSync',
	description: 'Digital Agency for all your crafting needs.Make your ideas come to life with our expert crafting services.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className='antialiased'>
			<Navbar />
		
			          <SmoothScroll>{children}</SmoothScroll>
			<Footer />
			</body>

		</html>
	)
}
