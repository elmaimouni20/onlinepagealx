import { cn } from "@/lib/utils";
import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Header() {
    return (
        <header className="bg-white">
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="block font-semibold text-primary" href="#">
                            OnlinePage
                        </a>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                {/* <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
                                </li> */}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <LoginLink className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-primary shadow">Login</LoginLink>
                                <div className="hidden sm:flex">
                                    <RegisterLink className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-secondary">Sign up</RegisterLink>
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
