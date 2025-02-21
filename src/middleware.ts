/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default async function handler(req: NextRequest, res: NextResponse) {
    if (
        req.nextUrl.pathname.startsWith("/api") &&
        !req.nextUrl.pathname.includes("auth")
    ) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.next();
    }
    return withAuth({
        pages: {
            signIn: '/auth/login'
        }
    })(req as any, res as any)
}

export const config = { 
    matcher: [
        "/dashboard(.*)",
        "/api(.*)"
    ] 
}
