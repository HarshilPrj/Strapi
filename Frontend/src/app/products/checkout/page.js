"use client";
import AppContext from "@/Context/context";
import axios from "axios";
import Script from "next/script";
import React, { useContext, useEffect, useState } from "react";

const checkout = () => {
    const [subtotal, setSubtotal] = useState(0);
    let context = useContext(AppContext);

    useEffect(() => {
        if (context.cart.length === 0) {
            let newcart = localStorage.getItem("cart");
            context.cart = JSON.parse(newcart);
        }
        let myTotal = 0;
        for (let index = 0; index < context.cart.length; index++) {
            const element = context.cart[index].attributes?.price;
            myTotal = myTotal + element;
        }
        setSubtotal(myTotal);
    }, [context.cart]);

    let shipping = subtotal === 0 ? 0 : 20 * context.cart.length;
    let grandTotal = subtotal + shipping;

    const submit = async () => {
        let orderId = "OID" + Math.floor(1000000 * Math.random());

        let txtToken = axios.post(
            `${process.env.NEXT_PUBLIC_HOST}/api/order/preTransaction`,
            {
                amount: grandTotal,
                orderId: orderId,
                email: "prajapatiharshil625@gmail.com",
                payment_info: {},
                products: context.cart,
                address: "Patan",
                name: "Harshil Prajapati",
                transections_id: null,
                status: "Pending",
            }
        );

        let config = {
            root: "",
            flow: "DEFAULT",
            data: {
                orderId: orderId /* update order id */,
                token: txtToken /* update token value */,
                tokenType: "TXN_TOKEN",
                amount: grandTotal /* update amount */,
            },
            handler: {
                notifyMerchant: function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                },
            },
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method
            window.Paytm.CheckoutJS.init(config)
                .then(function onSuccess() {
                    // after successfully updating configuration, invoke JS Checkout
                    window.Paytm.CheckoutJS.invoke();
                })
                .catch(function onError(error) {
                    console.log("error => ", error);
                });
        }
    };

    return (
        <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
            <Script
                type="application/javascript"
                src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}
                crossorigin="anonymous"
            ></Script>

            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Your Cart Items
                    </h1>
                </div>

                <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                <ul className="-my-8">
                                    {context?.cart?.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="border-t flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                                            >
                                                <div className="shrink-0">
                                                    <img
                                                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                        src={`${process.env.NEXT_PUBLIC_HOST}${item.attributes?.image?.data?.attributes.url}`}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="relative flex flex-1 flex-col justify-between">
                                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                        <div className="pr-8 sm:pr-5">
                                                            <p className="text-base font-semibold text-gray-900">
                                                                {item.attributes?.title}
                                                            </p>
                                                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                                                {
                                                                    item.attributes
                                                                        ?.category
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                                                {item.attributes?.price.toLocaleString(
                                                                    "en-US",
                                                                    {
                                                                        style: "currency",
                                                                        currency: "INR",
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                        <button
                                                            onClick={() => {
                                                                context.removeFromCart(
                                                                    item,
                                                                    index
                                                                );
                                                            }}
                                                            type="button"
                                                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                viewBox="0 0 48 48"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M0 0h48v48H0V0z"
                                                                    fill="none"
                                                                />
                                                                <path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z" />
                                                                <path
                                                                    d="M0 0h48v48H0z"
                                                                    fill="none"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Subtotal</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {subtotal.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">
                                        Shipping (Per item ₹20)
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ₹{subtotal !== 0 ? `${shipping}.00` : "0.00"}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    <span className="text-xs font-normal text-gray-400">
                                        INR
                                    </span>
                                    &nbsp;
                                    {grandTotal.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    })}
                                </p>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    disabled={grandTotal === 0 ? true : false}
                                    onClick={submit}
                                    type="button"
                                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                >
                                    Pay Now
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default checkout;
