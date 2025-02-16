import { NextRequest, NextResponse } from 'next/server';
import {jwtDecode} from "jwt-decode"
export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token');
    try {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }else{
            const decoded = jwtDecode(token.value);
            console.log(decoded);
            return NextResponse.next();
        }
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};