import React from "react";

interface props {
    label?: string;
    children: any;
}

function outlinedSurface(p: props) {
    return (
        <div className="border-2 border-black rounded-md shadow-md mb-4">
            <div className="text-center font-bold text-xl text-accent py-4">{p.label}</div>
            <div className="px-4 pb-6">{p.children}</div>
        </div>
    );
}

export default outlinedSurface;
