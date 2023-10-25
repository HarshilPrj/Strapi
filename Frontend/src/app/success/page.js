import React from "react";

const Sucess = () => {
    return (
        <div className="min-h-screen">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            Your order has been successfully placed.
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Thank you for choosing us! Your order is confirmed, and we're
                            thrilled to serve you. We'll work diligently to ensure your
                            order is delivered promptly. Your satisfaction is our top
                            priority. Enjoy your shopping experience!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sucess;
