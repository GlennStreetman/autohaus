import React from "react";

interface props {
    text: string;
    callback: Function;
    icon: any; //svg icon?
}

function IconButton(p: props) {
    return (
        <button
            className="border-2 p-2 rounded-md bg-accent shadow-lg shadow-slate-600 hover:bg-strong hover:border-black hover:text-accent active:bg-strong text-sm"
            onClick={() => {
                p.callback();
            }}
        >
            <div className="flex">
                {p.icon}
                <div className="m-auto">{p.text}</div>
            </div>
        </button>
    );
}

export default IconButton;
