import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser");

    if (!currentUser) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("currentUser");
        return response;
    }

    console.log("user", currentUser);
    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*']
}
