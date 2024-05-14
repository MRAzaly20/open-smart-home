"use client";
import { register_now } from "@/src/services";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        last_name: "",
        first_name: "",
        name: "",
        address: "",
        phoneNumber: ""
    });
    const [error, setError] = useState({
        email: "",
        last_name: "",
        first_name: "",
        password: "",
        phoneNumber: "",
        address: "",
        name: ""
    });

    const handleSubmit = async e => {
        //alert(formData.phoneNumber)
        e.preventDefault();
        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" });
            return;
        }
        if (!formData.password) {
            setError({ ...error, password: "Password Field is required" });
            return;
        }
        if (!formData.phoneNumber) {
            setError({
                ...error,
                phoneNumber: "Phone Number Field is required"
            });
            return;
        }
        if (!formData.name) {
            setError({ ...error, name: "Name Field is required" });
            return;
        }
        if (!formData.last_name) {
            setError({ ...error, last_name: "Last Name Field is required" });
            return;
        }
        if (!formData.first_name) {
            setError({ ...error, first_name: "First Name Field is required" });
            return;
        }
        if (!formData.address) {
            setError({ ...error, address: "Address Name Field is required" });
            return;
        }
        const res = await register_now(formData);
        if (res.message === "Register successful") {
            toast.success(res.message);
            router.push("/");
        } else {
            toast.error(res.message);
        }
    };
    return (
        <>
            <section className='h-full bg-gray-900 text-center'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white'>
                                Create Account
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className='space-y-4 md:space-y-6'
                                action='#'
                            >
                                <div className='text-left'>
                                    <label
                                        htmlFor='name'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                    >
                                        Username
                                    </label>
                                    <input
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value
                                            })
                                        }
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Name'
                                        required=''
                                    />
                                    {error.name && (
                                        <p className='text-sm text-red-500'>
                                            {error.name}
                                        </p>
                                    )}
                                </div>
                                <div className='text-left'>
                                    <label
                                        htmlFor='email'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                    >
                                        Email
                                    </label>
                                    <input
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                        type='email'
                                        name='email'
                                        id='email'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='name@gmail.com'
                                        required=''
                                    />
                                    {error.email && (
                                        <p className='text-sm text-red-500'>
                                            {error.email}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className='justify-center grid mt-2.5
                                    grid-cols-2 gap-2'
                                >
                                    <div className=' text-left'>
                                        <label
                                            htmlFor='f-name'
                                            className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                        >
                                            First Name
                                        </label>
                                        <input
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    last_name: e.target.value
                                                })
                                            }
                                            type='text'
                                            name='f-name'
                                            id='f-name'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                            placeholder=''
                                            required=''
                                        />
                                        {error.first_name && (
                                            <p className='text-sm text-red-500'>
                                                {error.first_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className=' text-left'>
                                        <label
                                            htmlFor='l-name'
                                            className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    first_name: e.target.value
                                                })
                                            }
                                            type='text'
                                            name='l-name'
                                            id='l-name'
                                            className='w-1/2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                                            placeholder=''
                                            required=''
                                        />
                                        {error.last_name && (
                                            <p className='text-sm text-red-500'>
                                                {error.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='text-left'>
                                    <label
                                        htmlFor='phone'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                phoneNumber: e.target.value
                                            })
                                        }
                                        type='number'
                                        name='phone'
                                        id='phone'
                                        className='bg-gray-50 border border-gray-300
                                    text-gray-900 sm:text-sm rounded-lg
                                    focus:ring-indigo-600
                                    focus:border-indigo-600 block w-full p-2.5
                                    bg-gray-700 border-gray-600
                                    placeholder-gray-400 text-white
                                    focus:ring-blue-500
                                    focus:border-blue-500'
                                        placeholder='012345678'
                                        required=''
                                    />
                                    {error.phoneNumber && (
                                        <p className='text-sm text-red-500'>
                                            {error.phoneNumber}
                                        </p>
                                    )}
                                </div>
                                 <div className='text-left'>
                                    <label
                                        htmlFor='addr'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
                                    >
                                        Address
                                    </label>
                                    <input
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                address: e.target.value
                                            })
                                        }
                                        type='text'
                                        name='addr'
                                        id='addr'
                                        className='bg-gray-50 border border-gray-300
                                    text-gray-900 sm:text-sm rounded-lg
                                    focus:ring-indigo-600
                                    focus:border-indigo-600 block w-full p-2.5
                                    bg-gray-700 border-gray-600
                                    placeholder-gray-400 text-white
                                    focus:ring-blue-500
                                    focus:border-blue-500'
                                        placeholder='address'
                                        required=''
                                    />
                                    {error.address && (
                                        <p className='text-sm text-red-500'>
                                            {error.address}
                                        </p>
                                    )}
                                </div>
                                <div className='text-left'>
                                    <label
                                        htmlFor='password'
                                        className='block mb-2 text-sm font-medium text-gray-900 text-white'
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

                                <button
                                    type='submit'
                                    className='w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800'
                                >
                                    Create Account
                                </button>
                                <p className='text-sm font-light text-gray-500 text-gray-400'>
                                    ALready have an account{" "}
                                    <Link
                                        href='/'
                                        className='font-medium text-indigo-600 hover:underline text-indigo-500'
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}
