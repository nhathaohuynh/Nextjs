import { NextRequest, NextResponse } from 'next/server'

const privatePath = ['/account']
const authPath = ['/login', '/register']
export function middleware(request: NextRequest) {
	console.log(request.nextUrl.pathname)
	const sessionToken = request.cookies.get('session')?.value

	if (
		privatePath.some((path) => request.nextUrl.pathname.startsWith(path)) &&
		!sessionToken
	) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (
		authPath.some((path) => request.nextUrl.pathname.startsWith(path)) &&
		sessionToken
	) {
		return NextResponse.redirect(new URL('/account', request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/login', '/register', '/account'],
}
