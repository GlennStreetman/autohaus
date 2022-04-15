import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton2 from "./iconButton";
import { SiPorsche } from "react-icons/si";

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const dataLeft = "p-2  col-span-12 md:col-span-3 lg:col-span-5 xl:flex xl:justify-end"; //2x
const dataRight = "p-2 col-span-12 md:col-span-9 lg:col-span-5 "; //2x
const imgBox = "relative rounded-md bg-black overflow-hidden h-0 w-0 md:h-80 md:w-auto lg:h-96 lg:w-auto xl::h-96 xl:w-116 ";

function why() {
    const router = useRouter();
    return (
        <div className="flex flex-col">
            <div className="grid justify-items-center w-screen p-3">
                <div className="text-3xl font-bold">Why go with Auto Haus?</div>
            </div>
            <div className="grid grid-cols-12">
                <div className={gutter} />
                <div className={dataLeft}>
                    {/* <div className="rounded-md">
                        <Image src="/gulfOil.jpg" height="400" width="600" /> */}

                    <div className={imgBox}>
                        <Image src="/gulfOil.jpg" layout="fill" objectFit="fill" />
                    </div>
                </div>
                <div className={dataRight}>
                    <div className="text-3xl font-bold">Santa Monica's Porsche Experts</div>

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
                    <div className="flex p-2 gap-2 justify-center">
                        <IconButton2 text={"Meet the team"} callback={() => {}} icon={<SiPorsche className="h-7 w-7" />} link="/team" />
                    </div>
                </div>
                <div className={gutter} />
            </div>
        </div>
    );
}

export default why;
