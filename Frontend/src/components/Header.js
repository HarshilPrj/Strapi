import AppContext from "@/Context/context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Header = () => {
    let context = useContext(AppContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (context.cart.length === 0) {
            let newcart = localStorage.getItem("cart");
            setData(newcart);
            context.cart = data;
        }
    }, [data]);

    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">ShopXpress</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link href="/" className="mr-5 hover:text-red-600">
                            Home
                        </Link>
                        <Link href="/products" className="mr-5 hover:text-red-600">
                            Products
                        </Link>
                        <Link href="/about" className="mr-5 hover:text-red-600">
                            About
                        </Link>
                        <Link href="/contactUs" className="mr-5 hover:text-red-600">
                            Contact Us
                        </Link>
                        <Link
                            href="/products/checkout"
                            className="mr-5 hover:text-red-600"
                        >
                            Cart ({context && context.cart && context.cart.length})
                        </Link>
                    </nav>
                    <Link href={"/login"}>
                        <button className="md:mt-4 lg:mt-0 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-sm">
                            Login
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default Header;
