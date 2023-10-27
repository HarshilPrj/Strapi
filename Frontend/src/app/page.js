import Image from "next/image";

export default function Home() {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="flex w-full mb-20 flex-wrap">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
                            ShopXpress
                        </h1>
                        <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
                            ShopXpress, your premier destination for online shopping,
                            offers a diverse range of products, exceptional customer
                            service, and seamless shopping experiences
                        </p>
                    </div>
                    <div className="flex flex-wrap md:-m-2 -m-1">
                        <div className="flex flex-wrap w-1/2">
                            <div className="md:p-2 p-1 w-1/2">
                                <img
                                    alt="gallery"
                                    className=" object-cover  object-center block"
                                    src="https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                            <div className="md:p-2 p-1 w-1/2">
                                <img
                                    alt="gallery"
                                    className="w-full object-cover h-full object-center block"
                                    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                            <div className="md:p-2 p-1 w-full">
                                <img
                                    alt="gallery"
                                    className="w-full h-full object-cover object-center block"
                                    src="https://plus.unsplash.com/premium_photo-1661774910035-05257f7d73a6?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap w-1/2">
                            <div className="md:p-2 p-1 w-full">
                                <img
                                    alt="gallery"
                                    className="w-full h-full object-cover object-center block"
                                    src="https://c0.wallpaperflare.com/preview/676/705/125/ecommerce-online-marketing-internet.jpg"
                                />
                            </div>
                            <div className="md:p-2 p-1 w-1/2">
                                <img
                                    alt="gallery"
                                    className="w-full object-cover h-full object-center block"
                                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                            <div className="md:p-2 p-1 w-1/2">
                                <img
                                    alt="gallery"
                                    className="w-full object-cover h-full object-center block"
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
