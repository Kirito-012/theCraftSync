import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from './Components/SmoothScroll';
import { LoadingProvider } from './lib/LoadingContext';
import AppWrapper from './Components/AppWrapper';

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
				<LoadingProvider>
					<AppWrapper>
						<SmoothScroll>{children}</SmoothScroll>
					</AppWrapper>
				</LoadingProvider>
			</body>
		</html>
	)
}
