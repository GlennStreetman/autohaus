import React from "react";
import Image from "next/image";
import { BsDot } from "react-icons/bs";

function why() {
    return (
        <div className="flex flex-col">
            <div className="grid justify-items-center w-screen p-3">
                <div className="text-3xl font-bold">Santa Monica's Porsche Experts</div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-2" />
                <div className="col-span-4 p-2 flex justify-end rounded-md">
                    <div className="rounded-md">
                        <Image src="/gulfOil.jpg" height="400" width="600" />
                    </div>
                </div>
                <div className="col-span-4 p-2">
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
                <div className="col-span-2" />
            </div>
        </div>
    );
}

export default why;
