import { useState, useEffect } from "react";

interface props {
    id: string;
    label: string;
    value: string;
    onClickCallback: Function;
    onFocusCallback?: Function;
    children: any;
}

function LabeledSelect(p: props) {
    const [labelStyling, setLabelStyling] = useState("absolute text-accent bg-primary ");

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>, callback: Function) {
        e.preventDefault();
        callback(e.target.value);
    }

    function helperFocus(helperStyling: Function) {
        //on focus, move helper text to upper left side of input form, set zIndex to bring it above outline.
        helperStyling("absolute bottom-8 left-4 z-2  text-accent bg-primary");
    }

    function helperBlurr(fieldValue: string, helperStyling: Function) {
        //on focus, move helper text to upper left side of input form, set zIndex to bring it above outline.
        if (fieldValue === "") {
            helperStyling("absolute text-accent bg-primary p-1");
        }
    }

    useEffect(() => {
        if (p.value !== "") setLabelStyling("absolute bottom-8 left-1 z-2  text-accent bg-primary");
    }, [p.value]);

    return (
        <div
            className="relative rounded-md border-2 p-2 text-primary"
            onFocus={() => helperFocus(setLabelStyling)}
            onBlur={() => helperBlurr(p.value, setLabelStyling)}
        >
            <label
                htmlFor={p.id}
                className={labelStyling}
                onClick={() => {
                    document.getElementById(p.id)?.focus();
                }}
            >
                {p.label}
            </label>
            <select
                className="bg-primary outline-none"
                id={p.id}
                required
                value={p.value}
                onChange={(e) => handleChange(e, p.onClickCallback)}
                onInput={(e) => {
                    // console.log("INPUT", e.target);
                }}
                onFocus={p.onFocusCallback ? (e) => p.onFocusCallback(e) : () => {}}
            >
                {p.children}
            </select>
        </div>
    );
}

export default LabeledSelect;
