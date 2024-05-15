"use client";
import "@/styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SideNavbar from "@/src/components/elements/Navbar";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import { Provider } from "react-redux";
import { store } from "@/src/utils/store";
import { redirect } from "next/navigation";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");

    useEffect(() => {
        const checkLoginStatus = () => {
            const session = getSession();
            const localValue = value;
            if (
                router.asPath !== "/" &&
                router.asPath !== "/auth/register" &&
                router.asPath !== "/auth/username" &&
                router.asPath !== "/auth/wa-login" &&
                !session &&
                !localValue
            ) {
                router.push("/");
                //console.log();
            }
        };

        checkLoginStatus();
    }, [router, value]);

    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <App Component={Component} pageProps={pageProps} />
            </SessionProvider>
        </Provider>
    );
}

function App({ Component, pageProps }) {
    const router = useRouter();
    const hideNavForRoutes = ["/", "/signin", "/auth/*"];
    const shouldHideNav = pathname => {
        return hideNavForRoutes.some(route => {
            if (route.endsWith("/*")) {
                const routeBase = route.slice(0, -2);
                return pathname.startsWith(routeBase);
            }
            return pathname === route;
        });
    };

    const showNav = !shouldHideNav(router.pathname);

    return (
        <div>
            {showNav && <SideNavbar />}
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
