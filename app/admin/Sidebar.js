"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState('dashboard')
    const pathname = usePathname()

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName)
    }

    const isActive = (path) => {
        if (path === '/admin') {
            return pathname === '/admin'
        }
        return pathname === path
    }

    return (
        <div className='w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white fixed left-0 top-0 shadow-2xl flex flex-col'>
            {/* Header */}
            <div className='px-6 py-5 border-b border-slate-700/50 bg-slate-900/50'>
                <h2 className='text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                    Admin Panel
                </h2>
            </div>

            {/* Navigation */}
            <nav className='py-4 px-3 flex-1 overflow-y-auto'>
                {/* Dashboard Menu */}
                <div className='mb-2'>
                    <Link
                        href='/admin'
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive('/admin')
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                            : 'hover:bg-slate-700/50'
                            }`}>
                        <svg
                            className='w-5 h-5 text-green-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                            />
                        </svg>
                        <span className='font-medium'>Dashboard</span>
                    </Link>
                </div>


                {/* Blog Menu */}
                <div className='mb-2'>
                    <button
                        onClick={() => toggleMenu('blog')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${pathname.includes('/admin/blogs')
                            ? 'bg-slate-700/50'
                            : 'hover:bg-slate-700/50'
                            }`}>
                        <div className='flex items-center gap-3'>
                            <svg
                                className='w-5 h-5 text-yellow-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                                />
                            </svg>
                            <span className='font-medium'>Blog</span>
                        </div>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${openMenu === 'blog' ? 'rotate-180' : ''
                                }`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                            />
                        </svg>
                    </button>

                    {openMenu === 'blog' && (
                        <div className='mt-1 ml-4 space-y-1 animate-fadeIn'>
                            <Link
                                href='/admin/blogs/add'
                                className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive('/admin/blogs/add')
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                                    }`}>
                                Add Blog
                            </Link>
                            <Link
                                href='/admin/blogs/manage'
                                className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive('/admin/blogs/manage')
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                                    }`}>
                                Manage Blogs
                            </Link>
                        </div>
                    )}
                </div>

                {/* Categories Menu */}
                <div className='mb-2'>
                    <button
                        onClick={() => toggleMenu('categories')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${pathname.includes('/admin/categories')
                            ? 'bg-slate-700/50'
                            : 'hover:bg-slate-700/50'
                            }`}>
                        <div className='flex items-center gap-3'>
                            <svg
                                className='w-5 h-5 text-orange-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                                />
                            </svg>
                            <span className='font-medium'>Categories</span>
                        </div>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${openMenu === 'categories' ? 'rotate-180' : ''
                                }`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                            />
                        </svg>
                    </button>

                    {openMenu === 'categories' && (
                        <div className='mt-1 ml-4 space-y-1 animate-fadeIn'>
                            <Link
                                href='/admin/categories/add'
                                className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive('/admin/categories/add')
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                                    }`}>
                                Add Category
                            </Link>
                            <Link
                                href='/admin/categories/manage'
                                className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive('/admin/categories/manage')
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                                    }`}>
                                Manage Categories
                            </Link>
                        </div>
                    )}
                </div>

                {/* Users Menu */}
                <div className='mb-2'>
                    <Link
                        href='/admin/users'
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive('/admin/users')
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                            : 'hover:bg-slate-700/50'
                            }`}>
                        <svg
                            className='w-5 h-5 text-purple-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                            />
                        </svg>
                        <span className='font-medium'>Users</span>
                    </Link>
                </div>
            </nav>

            {/* Logout Button */}
            <div className='p-3 border-t border-slate-700/50'>
                <button
                    onClick={() => {
                        localStorage.removeItem('token')
                        window.location.href = '/'
                    }}
                    className='w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-all duration-200 group'>
                    <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                    </svg>
                    <span className='font-medium'>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar