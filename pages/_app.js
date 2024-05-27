"use client";
import "@/styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideNavbar from "@/src/components/elements/Navbar";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import { Provider } from "react-redux";
import { store } from "@/src/utils/store";
import { redirect } from "next/navigation";
import createRoom from "@/src/services/rooms/createRoom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    const [value, setValue] = useLocalStorage("token");
    const [roomNames, setRoomNames] = useState([
        "Sit Room",
        "Bath Room",
        "Bad Room",
        "Kitchen Room"
    ]);
    const [first, setfirst] = useState();
    const getAccessToken = () => {
        try {
            const access = Cookies.get("currentUser");
            if (access) {
                const TokenObj = JSON.parse(access);
                return TokenObj?.accessToken;
            }
        } catch (error) {
            console.error("Error accessing the cookie:", error);
            return null;
        }
    };

    const accessToken = getAccessToken();
    const handleCreateMultipleRooms = async () => {
        const jwt_token = jwtDecode(accessToken);
        const jwt_user_id = jwt_token.user_id;
        let successfulRooms = [];
        const roomID = Cookies.get("userRoom");

        for (const name of roomNames) {
            const roomData = {
                user: jwt_user_id,
                name: name,
                roomID: ""
            };
            //alert(name)
            try {
                if (!roomID) {
                    const response = await createRoom(roomData, accessToken);
                    setfirst(response);
                    if (response) {
                        alert(JSON.stringify(response));
                        Cookies.set("userRoom", response.room, {
                            expires: 720
                        });
                    } else {
                        console.error(
                            `Gagal membuat ruangan ${name}:`,
                            response
                        );
                    }
                }
            } catch (error) {
                console.error(
                    `Terjadi kesalahan saat membuat ruangan ${name}:`,
                    error
                );
            }
        }

        if (successfulRooms.length > 0) {
            console.log("Ruangan yang berhasil dibuat:", successfulRooms);
        } else {
            console.error("Tidak ada ruangan yang berhasil dibuat");
        }
    };

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
            }
            if (
                localValue &&
                session &&
                accessToken &&
                typeof accessToken === "string"
            ) {
                const res = handleCreateMultipleRooms();
                return res;
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
