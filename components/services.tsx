import { useState } from "react";
import CustomCarousel from "./customCarousel";

function serviceSlicer() {
    // const [position, setPosition] = useState(0);
    // const [showNumber, setShowNumber] = useState(3); //default to showing 3 slides

    return (
        <div className="w-full flex justify-center bg-neutral-900 p-2">
            <div className="flex flex-col">
                <div className="flex justify-center text-accent font-bold text-xl">
                    <div>Featured Services:</div>
                </div>
                <CustomCarousel />
            </div>
        </div>
    );
}

export default serviceSlicer;
