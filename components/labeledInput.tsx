import { useState, useEffect } from "react";

interface props {
    id: string;
    label: string;
    value: string;
    onClickCallback: Function;
    helperText?: any; //can be text or jsx object
    fieldType?: string; //tel, email, ...
    autocomplete?: string; //given-name, family-name, ...
    dataList?: any; //<datalist> used with fieldType='time' to limit selections.
    datalistID?: string; //used with datalist
    onFocusCallback?: Function;
}

function LabeledInput(p: props) {
    const [labelStyling, setLabelStyling] = useState("absolute text-accent bg-primary ");
    const helperStyleing = "absolute bottom-8 left-4 z-2 text-red-700 bg-primary";

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, callback: Function) {
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
        if (p.value !== "") setLabelStyling("absolute bottom-8 left-4 z-2  text-accent bg-primary");
    }, [p.value]);

    return (
        <div
            className="relative rounded-md border-2 p-2 text-primary w-full"
            onFocus={() => helperFocus(setLabelStyling)}
            onBlur={() => helperBlurr(p.value, setLabelStyling)}
        >
            <label
                htmlFor={p.id}
                className={p.helperText ? helperStyleing : labelStyling}
                onClick={() => {
                    document.getElementById(p.id)?.focus();
                }}
            >
                {p.helperText ? p.helperText : p.label}
            </label>
            <input
                autoComplete={p.autocomplete ? p.autocomplete : "off"}
                className="bg-primary outline-none w-full "
                id={p.id}
                type={p.fieldType ? p.fieldType : "text"}
                required
                value={p.value}
                onChange={(e) => handleChange(e, p.onClickCallback)}
                onInput={(e) => {
                    console.log("INPUT", e.target);
                }}
                list={p.datalistID ? p.datalistID : "pass"}
                onFocus={p.onFocusCallback ? (e) => p.onFocusCallback(e) : () => {}}
            />
            {p.dataList ? p.dataList : <></>}
        </div>
    );
}

export default LabeledInput;
