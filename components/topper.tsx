import dynamic from "next/dynamic";
import React from "react";
// import Gutter from "./gutter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Link from "next/link";

import { useRouter } from "next/router";

function Topper() {
    const router = useRouter();

    return <div className="top-0  right-3 xl:right-12 fixed flex justify-end w-screen sm:w-auto col-span-12 md:col-span-10 gap-2 p-2">TEST</div>;
}

export default Topper;
