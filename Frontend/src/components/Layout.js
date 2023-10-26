"use client";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppContext from "@/Context/context";

const Layout = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [reloadKey, setReloadKey] = useState(1);

    const addToCart = (item, qty) => {
        let newCart = cart;
        newCart.push(item);

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setReloadKey(Math.random());
    };

    const removeFromCart = (item, index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setReloadKey(Math.random());
    };

    return (
        <>
            <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
                <Header />
                <div>{children}</div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};

export default Layout;
