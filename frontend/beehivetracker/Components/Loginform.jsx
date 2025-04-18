'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Githubform from "../Components/githubauth";
import {loginUser}  from "../src/lib/api/auth"
import { jwtDecode } from 'jwt-decode';
import { toast } from "sonner"

export default function Login({ searchParams }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      const decoded = jwtDecode(token);

      const role = decoded?.role;
      if (!role) throw new Error("Role not found in token");

      Cookies.set('token', token, { expires: 7 });

      if (role === 'admin') {
        toast("Welcome admin redirecting to dashboard")
        router.push('/dashboard');
      } else if (role === 'beekeeper') {
        toast("Welcome beekeeper redirecting to your Workspace")
        router.push('/beekeeper');
      } else {
        setErrorMsg('Invalid user role');
      }
    } catch (err) {
      toast.error("Something not work " + err)
      setErrorMsg(err.message || 'Login failed');
    }
  };


  return (
    <div className='justify-center flex pt-[90px]'>
      <div className="flex-1 pt-10 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link href="/" className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm">
          ← Back
        </Link>
        <h3 className="text-3xl font-extrabold mb-8 max-md:text-center">Sign in</h3>

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={signIn}>
          <label className="text-md" htmlFor="email">Email</label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-md" htmlFor="password">Password</label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Sign In</button>
        </form>

        <Link className='flex justify-center' href={"/register"} >
        Create a Acount
        </Link>


        {errorMsg && (
          <p className="mt-4 p-4 bg-red-100 text-red-800 text-center">{errorMsg}</p>
        )}

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}

        <p className="my-4 text-sm text-gray-400 text-center">or continue with</p>
        <Githubform />
      </div>
    </div>
  );
}
