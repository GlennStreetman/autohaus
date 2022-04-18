import { useState } from "react";
import CustomCarousel from "./customCarousel";

function serviceSlicer() {
    return (
        <div className="w-full flex justify-center bg-almostBlack p-2">
            <div className="flex flex-col">
                <div className="flex justify-center text-white font-bold text-3xl relative">
                    <div className="z-10 bg-almostBlack px-2">Featured Services</div>
                    <div className="absolute left-20 right-20 h-0 border-y-2 top-1/2" />
                </div>
                <CustomCarousel />
            </div>
        </div>
    );
}

export default serviceSlicer;
