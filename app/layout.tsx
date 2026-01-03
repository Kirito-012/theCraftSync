import type {Metadata} from 'next'
import './globals.css'
import Navbar from './Components/Header'

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
			{children}
			</body>
		</html>
	)
}
