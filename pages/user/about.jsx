import React from "react";
import SideNavbar from "../../components/Navbar";
import Link from "next/link";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react";

const AboutPage = () => {
    const handleSubmit = async () => {
        console.log("hello");
    };

    return (
        <SideNavbar>
            <section className='h-screen bg-gradient-to-r from-gray-900 to-indigo-500 text-center justify-center items-center'>
                <div className='flex flex-col items-center justify-center px-6 mx-auto h-full'>
                    <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white'>
                                Sign in to your account
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className='space-y-4 md:space-y-6'
                                action='#'
                            >
                                <div className='text-left'>
                                    <label
                                        htmlFor='email'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                    >
                                        Your Username
                                    </label>
                                    <input
                                        type='text'
                                        name='email'
                                        id='email'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                        placeholder=''
                                        required=''
                                    />
                                </div>
                                <div className='text-left'>
                                    <label
                                        htmlFor='password'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                    >
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        name='password'
                                        id='password'
                                        placeholder='••••••••'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                        required=''
                                    />
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
                                        className='text-sm font-medium text-indigo-600 hover:underline text-indigo-500'
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type='submit'
                                    className='w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800'
                                >
                                    Sign in
                                </button>
                                <p className='text-sm font-light text-gray-500 text-gray-400'>
                                    Don’t have an account yet?{" "}
                                    <Link
                                        href='/register'
                                        className='font-medium text-indigo-600 hover:underline text-indigo-500'
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </SideNavbar>
    );
};

export default AboutPage;
