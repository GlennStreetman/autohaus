import React from "react";

interface props {
    value: string;
    callback: Function;
    label: string;
    id: string;
}

function labeledTextArea(p: props) {
    return (
        <div id={p.id} className="col-span-12 border-2 p-2 relative">
            <label className="absolute -top-4 left-4 z-2  text-accentBlue bg-white">{p.label}</label>
            <textarea
                rows={6}
                className="bg-white outline-none w-full"
                value={p.value}
                onChange={(e) => {
                    e.preventDefault();
                    p.callback(e.target.value);
                }}
            />
        </div>
    );
}

export default labeledTextArea;
