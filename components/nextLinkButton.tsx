import React from "react";
import Link from "next/link";

interface props {
    text: string | Element | JSX.Element;
    icon: JSX.Element; //svg icon?
    link: string;
    highlight?: boolean;
    newtab?: boolean;
    textSize?: string;
}



function NextLinkButton(p: props) {

    const textHighlight =
        `flex flex-row shrink border-2 border-highLight hover:border-black p-2 rounded-md bg-highLight font-medium hover:font-black ${p?.textSize || `text-sm`}  gap-1`;
    const textRegular =
        `flex flex-row shrink border-2 border-highLight hover:border-black p-2 rounded-md bg-highLight font-medium hover:font-black ${p?.textSize || `text-sm`} gap-1`;

    return (
        <div className="flex z-20">
            <Link href={p.link}>
                {p.newtab ? (
                    <a target="_blank" className={p.highlight === true ? textHighlight : textRegular}>
                        {p.icon}{" "}
                        <div className="flex">
                            <div className="shrink m-auto">{p.text}</div>
                        </div>
                    </a>
                ) : (
                    <a className={p.highlight === true ? textHighlight : textRegular}>
                        {p.icon}{" "}
                        <div className="flex">
                            <div className="shrink m-auto">{p.text}</div>
                        </div>
                    </a>
                )}
            </Link>
            <div className="flex grow" />
        </div>
    );
}

export default NextLinkButton;
