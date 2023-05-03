// pages/index.js
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState } from "react";
import { Dialog } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children, loading }: any) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <>
            <main
                className={`${inter.className} min-h-screen min-w-screen`}
            >
                <header>
                    <title>Mohit Bhole</title>
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="text-sm font-semibold leading-6 group rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                                <div className="scale-75 hover:scale-90 ease-in duration-200">
                                    <Image
                                        src="/MBLogo.png"
                                        alt="Mohit Bhole"
                                        width="65"
                                        height="65" />
                                </div>
                            </Link>
                        </div>

                        <div className="hidden lg:flex lg:gap-x-12">
                            <Link href="experience" className="text-sm font-semibold leading-6 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                                Experience
                            </Link>
                            <Link href="resume" className="text-sm font-semibold leading-6 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                                Resume
                            </Link>
                            <Link href="life" className="text-sm font-semibold leading-6 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                                Life
                            </Link>
                        </div>
                        <div className="hidden lg:flex"></div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                            </button>
                        </div>
                    </nav>
                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-10" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10 bg-slate-100">
                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-slate-900"
                                    style={{ marginTop: '2px' }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-slate-500/10">
                                    <div className="space-y-2 py-6">
                                        <Link
                                            href="/"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-white"
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href="experience"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-white"
                                        >
                                            Experience
                                        </Link>
                                        <Link
                                            href="resume"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-white"
                                        >
                                            Resume
                                        </Link>
                                        <Link
                                            href="life"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-white"
                                        >
                                            Life
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>
                <div className="mx-auto flex flex-col max-w-7xl md:py-6 lg:py-6 md:px-6 lg:px-8 items-center min-h-full">{children}</div>
            </main>
            {loading &&
                <main className="w-screen h-screen flex justify-center items-center z-10 absolute top-0 left-0 bg-black">
                    <Image
                        src="/MBLogo.png"
                        alt="Mohit Bhole"
                        width="80"
                        height="80" />
                    <ClimbingBoxLoader
                        color='#ffffff'
                        aria-label='Loading Spinner'>
                    </ClimbingBoxLoader>
                </main>}
        </>
    )
}