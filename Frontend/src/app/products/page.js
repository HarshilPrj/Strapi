"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const products = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_HOST}/api/products?populate=*`)
            .then((data) => {
                console.log(data.data.data);
                setData(data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {data.map((item, index) => {
                        const handleChangeColor = () => {
                            if (item.attributes?.colors === "Black") {
                                return "bg-black";
                            } else if (item.attributes?.colors === "White") {
                                return "bg-white";
                            } else {
                                return `bg-${item.attributes?.colors.toLowerCase()}-500`;
                            }
                        };
                        return (
                            <div className="xl:w-1/4 md:w-1/2 p-4" key={index}>
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <img
                                        className="h-64 rounded w-auto mb-8 m-auto"
                                        src={`${process.env.NEXT_PUBLIC_HOST}${item.attributes.image.data.attributes.url}`}
                                        alt="content"
                                    />
                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                        {item.attributes.title}
                                    </h3>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                        {item.attributes.category}
                                    </h2>
                                    <div className="bg-black bg-green-500 bg-blue-500 bg-white"></div>
                                    <button
                                        className={`border-2 border-gray-300 ml-1 ${handleChangeColor()} rounded-full w-6 h-6 focus:outline-none`}
                                    ></button>
                                    <p className="mt-1">
                                        {item.attributes.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </p>
                                    <p className="leading-relaxed text-base">
                                        {item.attributes.description
                                            ? `${item.attributes.description.slice(
                                                  0,
                                                  30
                                              )}...`
                                            : "N/A"}
                                    </p>
                                    <Link href={`/products/${item.id}`}>
                                        <button className=" text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-400 rounded text-sm mt-4">
                                            Buy Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default products;
