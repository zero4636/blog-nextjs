'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {login} from '@/services/admin'
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Link from 'next/link';

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
 
export default function SimpleLoginForm() {
    const router = useRouter();
    // storing form data in state   
    const [formData, setFormData] = useState({ username: '', password: '' })

    // handling form data and sending it to backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Validate the form data
        if (!formData.username || !formData.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        
        const data = await login(formData) || [];
        if(data.status == 200) {
            toast.success(data.data.msg)
            router.push('/admin')
            Cookies.set('user', JSON.stringify(data.data), { expires: 7 })
        } else {
            toast.error(data.data.msg)
        }
    }

    return (
        <Card color="transparent" shadow={false} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Typography variant="h4" color="blue-gray">
            Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details to login admin dashboard.
        </Typography>
        <form onSubmit={handleSubmit} encType="application/json" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
            <Input type="password" size="lg" label="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
            Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
            Create a account, do you want?{" "}
             <Link href="signup" className="font-medium text-gray-900">Sign up</Link>
            </Typography>
        </form>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        </Card>
    );
}