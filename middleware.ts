import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { errors, jwtVerify, SignJWT } from 'jose';
import { CookieName } from './values/GlobalValues'

export async function middleware(request: NextRequest) {
    if (request.url.indexOf('/login') > 0) return NextResponse.next();

    let token: string = request.headers.get('Authorization') ?? "";
    if (token == '') token = request.cookies.get(CookieName) ?? "";

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimStart();
    }

    try {
        let verified = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
        let { id } = verified.payload;
        if (typeof id == 'number' && id > 0) {
            return NextResponse.next();
        }
    }
    catch (e: any) {
        if (e instanceof errors.JWTExpired) {
            const iat = Math.floor(Date.now() / 1000);
            const exp = iat + 60 * 60; // one hour
            let newToken = await new SignJWT({ id: 1 })
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .setExpirationTime(exp)
                .setIssuedAt(iat)
                .setNotBefore(iat)
                .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

            const response: NextResponse = NextResponse.next();
            response.cookies.set(CookieName, newToken);
            return response;
        }
        else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }



    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: ['/details/:path*', '/api/:path*', '/']
}
