import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateRandomString } from "@/src/utils/generateRoute";
import {jwtDecode} from "jwt-decode";

export function middleware(request: NextRequest) {
    const currentUserCookie = request.cookies.get("currentUser")?.value;
    const currentUser = currentUserCookie
        ? JSON.parse(currentUserCookie)
        : null;
    const url = request.nextUrl.clone();
    console.log(currentUser);
    const pathname = url.pathname;

    if (!currentUser || !currentUser.accessToken) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("currentUser");
        return response;
    }

    const expiresToken = jwtDecode(currentUser.accessToken);
    if (new Date().getTime() > expiresToken.exp * 1000) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("currentUser");
        return response;
    }

    const pathMatch = pathname.match(/\/user\/.*\/\d+$/);
    if (!pathMatch && pathname.startsWith("/user/")) {
        const newPathname = `${pathname.replace(/\/$/, "")}/${Date.now()}`;
        return NextResponse.redirect(new URL(newPathname, request.url));
    }

    console.log(
        "user",
        new Date().getTime(),
        new Date(expiresToken.exp * 1000).getTime()
    );
    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*"]
};
