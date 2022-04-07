import React from "react";

interface props {
    onClick?: Function;
    children: any;
}

function HighlightButton(p: props) {
    return (
        <button
            className=" flex p-1 bg-pRed font-light text-secondary hover:text-accent rounded-md active:bg-strong gap-1"
            onClick={(e) => {
                p.onClick(e);
            }}
        >
            {p.children}
        </button>
    );
}

export default HighlightButton;
