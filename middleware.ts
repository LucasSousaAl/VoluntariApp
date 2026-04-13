import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from 'infra/jwt'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isValidToken = token ? await verifyToken(token) : null;

    // Rota pública "/": se autenticado, redireciona para /home
    if (pathname === '/') {
        if (isValidToken) {
            return NextResponse.redirect(new URL('/home', request.url));
        }
        return NextResponse.next();
    }

    // Rotas protegidas: sem token válido → redireciona para login
    if (!isValidToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/home', '/profile', '/ong', '/vaga', '/form'],
}