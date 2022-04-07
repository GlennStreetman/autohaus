import React from "react";

interface props {
    onClick?: Function;
    children: any;
}

function bgButton(p: props) {
    return (
        <button
            className=" flex p-1 font-light text-primary hover:text-accent rounded-md active:bg-strong gap-1"
            onClick={(e) => {
                p.onClick(e);
            }}
        >
            {p.children}
        </button>
    );
}

export default bgButton;
