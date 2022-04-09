import React from "react";
import Image from "next/image";
import { BsDot } from "react-icons/bs";

//flex grid elements
const gutter = "p-2 col-span-0   lg:col-span-1 "; //2x
const data = "p-2   col-span-12   lg:col-span-5 "; //2x
const imgBox = "relative rounded-md h-0 w-0 md:h-96 md:w-auto lg:h-96 lg:w-auto xl::h-128 xl:w-auto  bg-black";
const img = "";

function why() {
    return (
        <div className="flex flex-col">
            <div className="grid justify-items-center w-screen p-3">
                <div className="text-3xl font-bold">Santa Monica's Porsche Experts</div>
            </div>
            <div className="grid grid-cols-12">
                <div className={gutter} />
                <div className={data}>
                    {/* <div className="rounded-md">
                        <Image src="/gulfOil.jpg" height="400" width="600" /> */}

                    <div className={imgBox}>
                        <Image src="/gulfOil.jpg" layout="fill" objectFit="fill" className="absolute" />
                    </div>
                </div>
                <div className={data}>
                    <div className="text-3xl font-bold">Why go with Auto Haus?</div>

                    <div className="flex p-2 gap-2">
                        <div>
                            20 years experience working with all makes and models is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galle
                        </div>
                    </div>

                    <div className="flex p-2 gap-2">
                        <div>
                            Complementary car service dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer took a galle
                        </div>
                    </div>
                    <div className="flex p-2 gap-2">
                        <div>
                            I'm best choice dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galle
                        </div>
                    </div>
                </div>
                <div className={gutter} />
            </div>
        </div>
    );
}

export default why;
