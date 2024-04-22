import "@/styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SideNavbar from "../components/elements/Navbar";
import useLocalStorage from "@/hooks/useLocalStorage";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    //const { data: sessionData } = useSession();
    const [value, setValue] = useLocalStorage("token");

    useEffect(() => {
        const checkLoginStatus = async () => {
            const session = await getSession();
            const localValue = value;
            //await setValue(session)
            if (
                router.asPath !== "/" &&
                router.asPath !== "/auth/register" &&
                router.asPath !== "/auth/username" &&
                router.asPath !== "/auth/wa-login" &&
                !session &&
                !localValue
            ) {
                router.push("/");
                console.log();
            }
        };

        checkLoginStatus();
    }, [router, value]);

    return (
        <SessionProvider session={session}>
            <App Component={Component} pageProps={pageProps} />
        </SessionProvider>
    );
}

function App({ Component, pageProps }) {
    const router = useRouter();
    const noNav = [
        "/",
        "/signin",
        "/auth/register",
        "/auth/username",
        "/auth/wa-login"
    ];
    const noNav_ = ["/", "/auth/register", "/auth/username", "/auth/wa-login"];
    const [value, setValue] = useLocalStorage("token");
    const showNav = !noNav.includes(router.pathname);

    return (
        <div>
            {showNav && <SideNavbar />}
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
