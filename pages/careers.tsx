import { useState, useRef } from "react";
import Banner from "./../components/banner";
import LabeledInput from "../components/labeledInput";
import ReCAPTCHA from "react-google-recaptcha";
import { addDashes, stripPhone, validPhone } from "../lib/formatPhone";
import OutlinedSurface from "./../components/outlinedSurface";
import { PublicHOC } from "../components/publicData";
import prisma from "../lib/prismaPool";
import { useRouter } from "next/router";
import { BiUpload } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Head from "next/head";

export async function getStaticProps() {
    const data = await prisma.sitesetup.findMany({});
    return {
        props: {
            data: data,
        },
        // revalidate: 10,
    };
}

function emailIsValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
}

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 my-4"; //1x
const max = "col-span-12";
const big = " col-span-12 lg:col-span-6";
const medium = "col-span-12 lg:col-span-4";
const small = "col-span-6 lg:col-span-3";

function Careers() {
    function dropHandler(ev) {
        console.log("File(s) dropped");
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            if (ev.dataTransfer.items[0].kind === "file") {
                var file = ev.dataTransfer.items[0].getAsFile();
                console.log("... file[" + 0 + "].name = " + file.name);
                const data = new FormData();
                data.append("file", file);
                setFileReference(data);
                setFileName(file.name);
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            const data = new FormData();
            data.append("file", ev.dataTransfer.files[0]);
            setFileReference(data);
            setFileName(ev.dataTransfer.files[0].name);
            console.log("... file[" + 0 + "].name = " + ev.dataTransfer.files[0].name);
        }
    }

    function selectFile(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", e.target.files[0]);
        setFileReference(data);
        setFileName(e.target.files[0].name);
    }

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameHelp, setFirstNameHelp] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameHelp, setLastNameHelp] = useState("");
    const [email, setEmail] = useState("");
    const [emailHelp, setEmailHelp] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneHelp, setPhoneHelp] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [description, setDescription] = useState("Tell us about yourself. Why do you want to join the team?");

    const [fileReference, setFileReference] = useState<any>();
    const [fileName, setFileName] = useState("");
    const inputReference = useRef<HTMLInputElement>(null);

    const router = useRouter();

    function fileUploadAction() {
        if (inputReference.current !== null) inputReference.current.click();
    }

    function runCapcha(value) {
        if (value) setEnableSubmit(true);
    }

    function expiredCapcha() {
        setEnableSubmit(false);
    }

    function stringLength(testString: string, testLength: number): boolean {
        if (testString.length > testLength) {
            return true;
        } else {
            return false;
        }
    }

    function processRequest(e) {
        e.preventDefault();
        let processRequest = true;
        //test email
        if (!emailIsValid(email)) {
            processRequest = false;
            setEmailHelp("Please enter a valid email address");
        } else {
            setEmailHelp("");
        }
        //test phone
        if (!validPhone(phone)) {
            processRequest = false;
            setPhoneHelp("Please enter a valid phone number");
        } else {
            setPhoneHelp("");
        }
        //test first name isnt empty
        if (!stringLength(firstName, 0)) {
            processRequest = false;
            setFirstNameHelp("Please enter your first name");
        } else {
            setFirstNameHelp("");
        }
        //test last name isnt empty
        if (!stringLength(lastName, 0)) {
            processRequest = false;
            setLastNameHelp("Please enter your last name");
        } else {
            setLastNameHelp("");
        }
        //resume uploaded
        if (!fileReference) {
            processRequest = false;
        }
        //test capcha has been clicked
        if (!enableSubmit) {
            processRequest = false;
        }
        if (processRequest) {
            //all tests passed.
            // console.log("requests passed.");
            setRequestAdditional(false);
            postResume();
        } else {
            setRequestAdditional(true);
            console.log("problem processing request");
        }
    }

    function postResume() {
        if (checkFileName().upload) {
            const data = fileReference;
            data.append("firstName", firstName);
            data.append("lastName", lastName);
            data.append("email", email);
            data.append("phone", phone);
            data.append("address", address);
            data.append("address2", address2);
            data.append("city", city);
            data.append("state", state);
            data.append("zip", zip);
            data.append("coverLetter", description);

            fetch(`/api/submitResume`, {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.msg === "success") {
                        router.push("/resumeSubmitted");
                    }
                });
        }
    }

    function checkFileName() {
        if (fileName !== "" && ["txt", "doc", "docx"].includes(fileName.split(".").pop())) {
            return { upload: true, msg: `Ready to submit: ${fileName}` };
        } else if (fileName !== "" && !["txt", "doc", "docx"].includes(fileName.split(".").pop())) {
            return { upload: false, msg: `Please submit a text or word document ending in .txt, .doc, or .docx` };
        } else {
            return { upload: false, msg: `<-- Drop Resume Here or Click-->` };
        }
    }

    return (
        <div>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Careers`}</title>
            </Head>
            <Banner />

            <div className="grid grid-row grid-cols-12 p-1 bg-white">
                <div className={gutter} />
                <div className={body}>
                    <OutlinedSurface>
                        <div className="flex justify-center text-accent active:bg-strong text-3xl font-bold p-6">Apply to join the team!</div>
                        <div className="grid grid-row grid-cols-12 gap-x-2 gap-y-4">
                            <div className={big}>
                                <LabeledInput
                                    autocomplete="given-name"
                                    id="first_id"
                                    label="First Name"
                                    value={firstName}
                                    onClickCallback={setFirstName}
                                    helperText={firstNameHelp}
                                />
                            </div>
                            <div className={big}>
                                <LabeledInput
                                    autocomplete="family-name"
                                    id="last_id"
                                    label="Last Name"
                                    value={lastName}
                                    onClickCallback={setLastName}
                                    helperText={lastNameHelp}
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
                            <div className={big}>
                                <LabeledInput
                                    autocomplete="tel"
                                    fieldType="tel"
                                    id="phone_id"
                                    label="Phone"
                                    value={addDashes(phone)}
                                    onClickCallback={(e) => {
                                        setPhone(stripPhone(e));
                                    }}
                                    helperText={phoneHelp}
                                />
                            </div>
                            <div className={max}>
                                <LabeledInput
                                    autocomplete="address-line1"
                                    fieldType="text"
                                    id="address1-id"
                                    label="Address"
                                    value={address}
                                    onClickCallback={setAddress}
                                />
                            </div>
                            <div className={max}>
                                <LabeledInput
                                    autocomplete="address-line2"
                                    fieldType="text"
                                    id="address2-id"
                                    label="Address Line 2"
                                    value={address2}
                                    onClickCallback={setAddress2}
                                />
                            </div>

                            <div className={medium}>
                                <LabeledInput autocomplete="address-level2" fieldType="text" id="city-id" label="City" value={city} onClickCallback={setCity} />
                            </div>

                            <div className={medium}>
                                <LabeledInput
                                    autocomplete="address-level1"
                                    fieldType="text"
                                    id="state-id"
                                    label="State"
                                    value={state}
                                    onClickCallback={setState}
                                />
                            </div>

                            <div className={medium}>
                                <LabeledInput autocomplete="postal-code" fieldType="text" id="zip-id" label="Zip Code" value={zip} onClickCallback={setZip} />
                            </div>
                            <div className="col-span-12 border-2 p-2 relative">
                                <label className="absolute -top-4 left-4 z-2  text-accent bg-primary">Cover Letter:</label>
                                <textarea
                                    rows={6}
                                    className="bg-primary outline-none w-full"
                                    value={description}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>

                            <div
                                id="drop_zone"
                                className="col-span-12 border-2 p-2 relative bg-slate-100 cursor-pointer h-32 flex flex-col place-content-center"
                                onClick={fileUploadAction}
                                onDrop={dropHandler}
                                onDragOver={(e) => {
                                    // let event = e as Event;
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                <input type="file" className="hidden" ref={inputReference} onChange={selectFile} />
                                <div className="flex justify-center">
                                    {fileName === "" ? <BiUpload className="h-7 w-7" /> : <></>}
                                    {fileName !== "" && checkFileName().upload === true ? <AiFillCheckCircle className="h-7 w-7 text-emerald-500" /> : <></>}
                                    {fileName !== "" && checkFileName().upload === false ? <HiOutlineEmojiSad className="h-7 w-7 text-red-500" /> : <></>}

                                    {/* <AiFillCheckCircle className="h-7 w-7" /> */}
                                </div>
                                <div className="flex justify-center">{checkFileName().msg}</div>
                            </div>

                            {requestAdditional ? (
                                <div className="col-span-12">
                                    <div className="flex justify-center text-accent active:bg-strong text-1xl font-bold p-6">
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
                                        Submit Application
                                    </button>
                                </div>
                            </div>
                        </div>
                    </OutlinedSurface>
                </div>
                <div className={gutter} />
            </div>
        </div>
    );
}

export default function Main(p) {
    return (
        <PublicHOC {...p}>
            <Careers />
        </PublicHOC>
    );
}
