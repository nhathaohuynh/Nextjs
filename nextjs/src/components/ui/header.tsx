import { ModeToggle } from '@/components/ui/toggle-mode'
import Link from 'next/link'

const header = [
	{
		id: 1,
		text: 'Home',
		path: '/',
	},

	{
		id: 2,
		text: 'Products',
		path: '/products',
	},
	{
		id: 3,
		text: 'Register',
		path: '/register',
	},

	{
		id: 4,
		text: 'Login',
		path: '/login',
	},
]

export default function Header() {
	return (
		<header className='p-2'>
			<nav>
				<ul className='flex gap-4 items-center'>
					{header.map((item) => (
						<li
							key={item.id}
							className='bg-primary text-primary-foreground px-4 py-1.5 rounded-md'
						>
							<Link href={item.path}>{item.text}</Link>
						</li>
					))}
					<li>
						<ModeToggle />
					</li>
				</ul>
			</nav>
		</header>
	)
}
