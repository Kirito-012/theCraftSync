"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './Sidebar'

export default function AdminLayout({ children }) {
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        checkAdminAccess()
    }, [])

    const checkAdminAccess = async () => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                toast.error('Access Denied! Please login first.', {
                    position: 'top-center',
                    autoClose: 3000,
                })
                router.push('/')
                return
            }

            // Verify user and check role
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.data.success) {
                const userRole = response.data.data.user.role

                if (userRole === 'admin') {
                    setIsAdmin(true)
                } else {
                    toast.error('Access Denied! Admin privileges required.', {
                        position: 'top-center',
                        autoClose: 4000,
                    })
                    router.push('/')
                }
            }
        } catch (error) {
            console.error('Auth check error:', error)
            toast.error('Authentication failed. Please login again.', {
                position: 'top-center',
                autoClose: 3000,
            })
            router.push('/')
        } finally {
            setIsChecking(false)
        }
    }

    if (isChecking) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100'>
                <ToastContainer />
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4'></div>
                    <p className='text-slate-600 font-medium'>Verifying access...</p>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return null
    }

    return (
        <div className='flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
            <ToastContainer />
            <Sidebar />
            <div className='ml-64 flex-1 p-8'>
                {children}
            </div>
        </div>
    )
}
