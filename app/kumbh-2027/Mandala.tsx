// Decorative line-art mandala. Pure SVG, no assets.
export default function Mandala({
	className = '',
	stroke = 'currentColor',
}: {
	className?: string
	stroke?: string
}) {
	const petals = Array.from({ length: 16 }, (_, i) => i * 22.5)
	const inner = Array.from({ length: 24 }, (_, i) => i * 15)
	return (
		<svg
			viewBox='-200 -200 400 400'
			fill='none'
			stroke={stroke}
			strokeWidth='1'
			className={className}
			aria-hidden='true'>
			<circle r='196' strokeOpacity='0.5' />
			<circle r='188' strokeOpacity='0.25' strokeDasharray='2 6' />
			{petals.map((a) => (
				<path
					key={a}
					d='M0 -176 C 22 -150 22 -118 0 -96 C -22 -118 -22 -150 0 -176 Z'
					transform={`rotate(${a})`}
				/>
			))}
			{inner.map((a) => (
				<path
					key={a}
					d='M0 -92 C 10 -78 10 -64 0 -52 C -10 -64 -10 -78 0 -92 Z'
					transform={`rotate(${a})`}
					strokeOpacity='0.8'
				/>
			))}
			<circle r='46' />
			<circle r='38' strokeOpacity='0.5' strokeDasharray='1 5' />
			{petals.slice(0, 8).map((a) => (
				<path
					key={a}
					d='M0 -34 C 8 -24 8 -14 0 -6 C -8 -14 -8 -24 0 -34 Z'
					transform={`rotate(${a * 2})`}
				/>
			))}
			<circle r='3' fill={stroke} />
		</svg>
	)
}
