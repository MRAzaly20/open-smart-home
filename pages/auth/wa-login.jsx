import { logged_in } from '@/src/services';
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSession } from 'next-auth/react';



export default function Home() {
  const [formData, setFormData] = useState({ phoneNumber: '', password: ''});
  const [error, setError] = useState({ phoneNumber: '', password: ''});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phoneNumber) {
      setError({ ...error, phoneNumber: "Phone Number Field is Required" })
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "password Field is Required" })
      return;
    }
    const res = await logged_in(formData);
    if (res.error) {
      toast.error(res.error);
    }
    else {
      toast.success(res.message);
      router.push('/profile');
    }
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-screen dark:bg-gray-900 text-center justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 mx-auto h-full">

          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div className='text-left'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
                  <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="number" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01234567" required="" />
                  {
                    error.phoneNumber && <p className="text-sm text-red-500">{error.phoneNumber}</p>
                  }
                </div>
                <div className='text-left'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  {
                    error.password && <p className="text-sm text-red-500">{error.password}</p>
                  }
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    {/* <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:b/g-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" required="" />
                    </div> */}
                    {/* <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div> */}
                  </div>
                  <Link href="#" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500">Forgot password?</Link>
                </div>
                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="/register" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}
