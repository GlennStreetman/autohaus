import React from "react";

function homePage() {
    return (
        <div className="w-screen grid grid-cols-12">
            <div className="sm:col-span-0 md:col-span-1 lg:col-span-2 bg-red-500"></div>
            <div className=" sm:col-span-12 md:col-span-10 lg:col-span-8">
                <h1 className="font-logo text-3xl font-bold underline">Hello world!</h1>
            </div>
            <div className="sm:col-span-0 md:col-span-1 lg:col-span-2 bg-red-500"></div>
        </div>
    );
}

export default homePage;
