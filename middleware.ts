import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from 'infra/jwt'

const ALLOWED_HEADERS = 'Content-Type, Authorization'
const ALLOWED_METHODS = 'GET, POST, PUT, DELETE, PATCH, OPTIONS'

/**
 * Returns the value to use in `Access-Control-Allow-Origin`.
 *
 * - In dev (`NODE_ENV !== 'production'`) we reflect any origin so the mobile
 *   app, Expo web, and any local tool can hit the API.
 * - In production we reflect the request's origin if it's in the allowlist
 *   below; otherwise we fall back to `*` (which forbids credentials).
 *
 * Add domains you want to allow in prod to `PROD_ALLOWED_ORIGINS`.
 */
const PROD_ALLOWED_ORIGINS = new Set<string>([
    'https://voluntari-app-two.vercel.app',
])

function resolveAllowedOrigin(req: NextRequest): {
    origin: string
    credentials: boolean
} {
    const requestOrigin = req.headers.get('origin')

    if (process.env.NODE_ENV !== 'production') {
        return { origin: requestOrigin ?? '*', credentials: !!requestOrigin }
    }
    if (requestOrigin && PROD_ALLOWED_ORIGINS.has(requestOrigin)) {
        return { origin: requestOrigin, credentials: true }
    }
    return { origin: '*', credentials: false }
}

function applyCorsHeaders(
    response: NextResponse,
    allowedOrigin: string,
    credentials: boolean,
) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin)
    response.headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS)
    response.headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS)
    response.headers.set('Access-Control-Max-Age', '86400')
    response.headers.set('Vary', 'Origin')
    if (credentials) {
        response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // ────────────────────────────────────────────────────────────
    // CORS for /api/*  — preflight short-circuit + header injection
    // ────────────────────────────────────────────────────────────
    if (pathname.startsWith('/api/')) {
        const { origin, credentials } = resolveAllowedOrigin(request)

        if (request.method === 'OPTIONS') {
            const preflight = new NextResponse(null, { status: 204 })
            applyCorsHeaders(preflight, origin, credentials)
            return preflight
        }

        const response = NextResponse.next()
        applyCorsHeaders(response, origin, credentials)
        return response
    }

    // ────────────────────────────────────────────────────────────
    // Page auth — unchanged behaviour for the protected page routes
    // ────────────────────────────────────────────────────────────
    const token = request.cookies.get('token')?.value
    const isValidToken = token ? await verifyToken(token) : null

    // Public "/" route: if logged in, jump to /home
    if (pathname === '/') {
        if (isValidToken) {
            return NextResponse.redirect(new URL('/home', request.url))
        }
        return NextResponse.next()
    }

    if (!isValidToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/home',
        '/profile',
        '/ong',
        '/vaga',
        '/form',
        '/api/:path*',
    ],
}
