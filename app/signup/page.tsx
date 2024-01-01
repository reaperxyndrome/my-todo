// SignupForm.js
"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {useRouter} from "next/navigation"
import Link from 'next/link';

interface FormProps{
    name: string,
    email: string,
    password: string
}
async function PostUserServer({formData}: {formData:FormProps}) {
    try{
        console.log('Sending user to server:', formData);
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return true

    } catch(error){
        console.error(error)
    }
} 
const SignupForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const success = await PostUserServer({formData})
    console.log(success)
    if(!!success) {
        router.push("/dashboard")
    }

    console.log(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className='flex flex-col items-center mb-[4rem]'>
            <h1 className="text-4xl font-bold mb-5">
            MyTodo, not only a Todo List App
            </h1>
            <h2 className='text-2xl text-[#b04141]'>
            A TodoList App made just for you.
            </h2> 
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up to My Todo</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="**********"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </form>
        <p>Already have an account? 
            <Link href={"/signin"} className='text-[blue]'> Sign In</Link>
        </p>
    </div>
  );
};

export default SignupForm;
