import React from "react";

interface props {
    label?: string;
    children: any;
    dark?: boolean;
}

function outlinedSurface(p: props) {
    return (
        <div className={`${p.dark === true ? "dark" : ""}`}>
            <div
                className={`border-2 border-black rounded-md shadow-md mb-4 w-full text-black dark:text-white bg-white dark:border-white dark:bg-primaryDark`}
            >
                {p.label ? <div className="text-center font-bold text-xl text-accent py-4">{p.label}</div> : <></>}
                <div className="px-4 pb-6">{p.children}</div>
            </div>
        </div>
    );
}

export default outlinedSurface;
