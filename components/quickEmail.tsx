import { useState } from "react";
import LabeledInput from "./labeledInput";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import OutlinedSurface from "./outlinedSurface";
import validEmail from "../lib/validEmail";
import {GiCancel} from 'react-icons/gi';


const body = "col-span-12 lg:col-span-10 xl:col-span-6 my-4 relative"; //1x
const big = " col-span-12 lg:col-span-6";

function stringLength(testString: string, testLength: number): boolean {
    if (testString.length > testLength) {
        return true;
    } else {
        return false;
    }
}

function formatName(name) {
    let formatName = name.replaceAll(/[^a-zA-Z\s]/gs, "");
    return formatName.charAt(0).toUpperCase() + formatName.slice(1);
}

interface props {
    description: string
    reset: Function
}

export default function ShortQuote(p: props) {
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameHelp, setFirstNameHelp] = useState("");
    const [email, setEmail] = useState("");
    const [emailHelp, setEmailHelp] = useState("");

    const router = useRouter();

    function runCapcha(value) {
        if (value) setEnableSubmit(true);
    }

    function expiredCapcha() {
        setEnableSubmit(false);
    }

    function processRequest(e) {
        e.preventDefault();
        let processRequest = true;
        //test phone
        if (!validEmail(email)) {
            processRequest = false;
            setEmailHelp("Please enter a valid email address");
        } else {
            setEmailHelp("");
        }
        //test first name isnt empty
        if (!stringLength(firstName, 0)) {
            processRequest = false;
            setFirstNameHelp("Please enter your first name");
        } else {
            setFirstNameHelp("");
        }
        if (!enableSubmit) {
            processRequest = false;
        }

        if (processRequest) {
            //all tests passed.
            // console.log("requests passed.");
            setRequestAdditional(false);
            postQuote();
            router.push(`/thankyou?first=${firstName}`);
        } else {
            setRequestAdditional(true);
            console.log("problem processing request");
        }
    }

    async function postQuote() {
        const data = {
            firstName: firstName,
            lastName: '',
            email: '',
            phone: '',
            prefDate: "",
            prefTime: "",
            altDate: "",
            altTime: "",
            make: "",
            model: "",
            year: "",
            vinNumber: "",
            reason: p.description,
        };
        fetch(`/api/requestQuote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        // .then((response) => response.json())
        // .then((data) => console.log(data));
    }

    return (
        <>
            <div className="grid grid-row grid-cols-12 p-1 ">
                <div className={body}>
                    <OutlinedSurface>
                        {/* <div className="flex justify-center text-secondary active:bg-strong text-3xl font-bold p-6">Receive Call</div> */}
                        <div className="grid grid-row grid-cols-12 gap-x-2 gap-y-4 mt-4 bg-white">
                            <div className={big}>
                                <LabeledInput
                                    autocomplete="given-name"
                                    id="first_id"
                                    label="First Name"
                                    value={firstName}
                                    onClickCallback={(e) => {
                                        setFirstName(formatName(e));
                                    }}
                                    helperText={firstNameHelp}
                                />
                            </div>
                            <div className={big}>
                                <LabeledInput
                                    autocomplete="email"
                                    fieldType="email"
                                    id="email_id"
                                    label="Email"
                                    value={email}
                                    onClickCallback={setEmail}
                                    helperText={emailHelp}
                                />
                            </div>
                            {requestAdditional ? (
                                <div className="col-span-12">
                                    <div className="flex justify-center text-accent active:bg-strong text-1xl font-bold p-2">
                                        <div> Review request fields and check captcha below.</div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className={big}>
                                <div className="flex justify-center">
                                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_CAPCHA_PUBLIC_KEY} onChange={runCapcha} onExpired={expiredCapcha} />
                                </div>
                            </div>
                            <div className={big}>
                                <div className="flex justify-center">
                                    <button
                                        className="h-[78px] border-2 p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak hover:border-black hover:text-accent active:bg-strong text-2x font-bold"
                                        onClick={processRequest}
                                    >
                                        Request Phone call!
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            className="absolute top-1 right-1"
                            onClick={()=>{p.reset('')}}
                        >
                            <GiCancel />
                        </button>
                    </OutlinedSurface>
                </div>
            </div>
        </>
    );
}