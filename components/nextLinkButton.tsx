import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface props {
    text: string | Element | JSX.Element;
    icon: JSX.Element; //svg icon?
    link: string;
    highlight?: boolean;
}

const textHighlight =
    "flex flex-row shrink border-2 hover:border-black p-2 rounded-md bg-secondary shadow-lg shadow-slate-600 hover:bg-strong active:bg-strong text-sm  gap-1 hover:text-accent text-red-600";
const textRegular =
    "flex flex-row shrink border-2 hover:border-black p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak active:bg-strong text-sm gap-1 hover:text-accent";

function NextLinkButton(p: props) {
    return (
        <div className="flex">
            <Link href={p.link}>
                <a className={p.highlight === true ? textHighlight : textRegular}>
                    {p.icon}{" "}
                    <div className="flex">
                        <div className="shrink m-auto">{p.text}</div>
                    </div>
                </a>
            </Link>
            <div className="flex grow" />
        </div>
    );
}

export default NextLinkButton;
