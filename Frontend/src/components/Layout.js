"use client";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppContext from "@/Context/context";
import Alert from "./Alert";

const Layout = ({ children }) => {
    const [show, setShow] = useState(false);
    const [des, setdes] = useState("");
    const [cart, setCart] = useState([]);
    const [reloadKey, setReloadKey] = useState(1);

    const addToCart = (item, qty) => {
        let newCart = cart;
        newCart.push(item);

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setReloadKey(Math.random());
        setShow(true);
        setdes("Item added in cart");
    };

    const removeFromCart = (item, index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setReloadKey(Math.random());
        setShow(true);
        setdes("Item removed from the cart");
    };

    setTimeout(() => {
        setShow(false);
    }, 3000);

    return (
        <>
            <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
                <Header />
                <Alert show={show} title={"Success"} des={des} />
                <div>{children}</div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};

export default Layout;
