"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import AboutPage from "../components/user/dashboard";
import SideNavbar from "../components/elements/Navbar";

export default function Home() {
    const { data: session } = useSession();
    const [value, setValue] = useLocalStorage("token");
    const [authorized, setAuthorized] = useState();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [statusLogin, setStatusLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async () => {
        const status = await getSession();
        const all_token = value ? JSON.parse(JSON.stringify(value)) : "";
        const _accessToken = all_token ? all_token.accessToken : 1;
        alert(authorized);
    };
    /*
     */
    useEffect(() => {
        const checkLoginStatus = async () => {
            const session = await getSession();
            //alert(sisi)
            if (!statusLogin) {
                await setValue(session);
            }
            //    setValue("")
            const all_token = value ? JSON.parse(JSON.stringify(value)) : "";
            const _accessToken = all_token ? all_token.accessToken : 1;
            try {
                //alert(_accessToken)
                const response = await fetch("/api/services/restricted/", {
                    headers: {
                        "Content-Type": "application/json",
                        // Sertakan token JWT
                        Authorization: `Bearer ${_accessToken}`
                    }
                });
                if (response.status === 401) {
                    setAuthorized(false);
                }
                if (response.status === 200 && !statusLogin) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    setStatusLogin(true);

                    console.log("hello");
                }
                await new Promise(resolve => setTimeout(resolve, 70));
                setLoading(false);
                setAuthorized(true);
            } catch (error) {
                console.error("Failed to check:", error);
            }
        };

        checkLoginStatus();
    }, [statusLogin, value]);
    const submit = async e => {
        const username = formData.email;
        const password = formData.password;
        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" });
            return;
        }
        if (!formData.password) {
            setError({ ...error, password: "Password Field is required" });
            console.log("jajaj");
            return;
        }
        const result = await signIn("credentials", {
            username,
            password
        });
        if (result) {
            const session = await getSession();
            await setValue(session);
            if (session) {
                const { accessToken, refreshToken } = session;
                alert(value);
                //router.push('/user/dashboard')
            }
        }
        // const res = await signIn("credentials", {
        //     formData.email,
        //     formData.password,
        //     callbackUrl: "/dashboard"
        // });

        // if (res.error) {
        //     toast.error(res.error);
        // } else {
        //     toast.success(res.message);
        //     router.push("/user/dashboard");
        // }
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {loading || !authorized ? null : value && session && authorized ? (
                <section
                    className="h-screen w-screen bg-cover bg-gray-300 bg-center
                bg-[url('/bg.png')] sm:items-start"
                >
                    <AboutPage />
                </section>
            ) : (
                <section className="h-screen bg-cover  bg-no-repeat bg-center bg-[url('https://img.freepik.com/free-vector/neon-purple-curve-background_53876-113116.jpg')] text-center justify-center items-center">
                    <div className='flex flex-col items-center justify-center px-6 mx-auto h-full'>
                        <div className='w-full rounded-lg shadow border border-2 md:mt-0 sm:max-w-md	xl:p-0 bg-gray-800 border-gray-800'>
                            <div className='p-6 space-y-4 md:space-y-6 sm:p-8 md'>
                                <h1 className='text-xl font-bold leading-tight tracking-tight hover:underlinetext text-white'>
                                    Sign in to Your Account
                                </h1>
                                {/*{value.accessToken}*/}
                                <div
                                    className='justify-center grid mt-2.5 sm:grid-cols-1
                            md:grid-row-2 gap-2'
                                >
                                    <div className='text-left'>
                                        {/*<p>{JSON.stringify(router)}</p>*/}
                                        <label
                                            htmlFor='email'
                                            className='block mb-2 text-sm
                                        font-medium text-gray-300
                                        hover:underline text-text-gray-300'
                                        >
                                            Your email
                                        </label>
                                        <input
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value
                                                })
                                            }
                                            type='text'
                                            name='email'
                                            id='email'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                            placeholder='name@company.com'
                                            required=''
                                        />
                                        {error.email && (
                                            <p className='text-sm text-red-500'>
                                                {error.email}
                                            </p>
                                        )}
                                    </div>
                                    <div className='text-left'>
                                        <label
                                            htmlFor='password'
                                            className='block mb-2 text-sm
                                        font-medium text-gray-300
                                        hover:underline text-text-gray-300'
                                        >
                                            Password
                                        </label>
                                        <input
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    password: e.target.value
                                                })
                                            }
                                            type='password'
                                            name='password'
                                            id='password'
                                            placeholder='••••••••'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                            required=''
                                        />
                                        {error.password && (
                                            <p className='text-sm text-red-500'>
                                                {error.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-start'>
                                            {/* <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 b/g-gray-700 border-gray-600 focus:ring-indigo-600 ring-offset-gray-800" required="" />
                    </div> */}
                                            {/* <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 text-gray-300">Remember me</label>
                    </div> */}
                                        </div>
                                        <Link
                                            href='#'
                                            className='text-sm font-medium text-indigo-50 hover:underline	'
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    {/* <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800">Sign in</button> */}
                                    <div className='mb-3 flex flex-row  gap-2'>
                                        <button
                                            onClick={() => submit()}
                                            className='w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800'
                                        >
                                            Sign in
                                        </button>
                                        {/*<button
                                            onClick={() => handleSubmit()}
                                            className='w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800'
                                        >
                                            Test
                                        </button>*/}
                                    </div>
                                    <div
                                        className='grid sm:grid-cols-1 md:grid-cols-2
                                gap-2'
                                    >
                                        <Link
                                            href='/auth/username'
                                            className='md:w-full sm:w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
                                        >
                                            Login with username
                                        </Link>
                                        <Link
                                            href='/auth/wa-login'
                                            className='md:w-full sm:w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800'
                                        >
                                            Login with whatsapp
                                        </Link>
                                    </div>
                                    <p className='text-sm font-light text-gray-500 text-gray-400'>
                                        Don’t have an account yet?{" "}
                                        <Link
                                            href='/auth/register'
                                            className='font-medium text-gray-900 hover:underline text-gray-900'
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <ToastContainer />
        </>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    };
}
