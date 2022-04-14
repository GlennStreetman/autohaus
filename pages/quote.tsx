import { useState } from "react";
import LabeledInput from "../components/labeledInput";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

const timeOptions = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
];

const mapTimeOptions = timeOptions.map((el) => <option value={el} />);
const timeOptionsDatalist = <datalist id="timeOptions">{mapTimeOptions}</datalist>;

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4"; //1x
const big = " col-span-12 lg:col-span-6";
const medium = "col-span-12 lg:col-span-4";
const small = "col-span-6 lg:col-span-3";

function emailIsValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
}

function phoneIsValid(phone: string): boolean {
    //https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phone);
}

function stringLength(testString: string, testLength: number): boolean {
    if (testString.length > testLength) {
        return true;
    } else {
        return false;
    }
}

function Quote() {
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
    const [date1, setDate1] = useState("");
    const [date1Help, setDate1Help] = useState("");
    const [time1, setTime1] = useState("");
    const [time1Help, setTime1Help] = useState("");
    const [date2, setDate2] = useState("");
    const [date2Help, setDate2Help] = useState("");
    const [time2, setTime2] = useState("");
    const [time2Help, setTime2Help] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carYearHelp, setCarYearHelp] = useState("");
    const [carMake, setCarMake] = useState("Porsche");
    const [carMakeHelp, setCarMakeHelp] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carModelHelp, setCarModelHelp] = useState("");
    const [description, setDescription] = useState("");

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
        //test email
        if (!emailIsValid(email)) {
            processRequest = false;
            setEmailHelp("Please enter a valid email address");
        } else {
            setEmailHelp("");
        }
        //test phone
        if (!phoneIsValid(phone)) {
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
        //test capcha has been clicked
        if (!enableSubmit) {
            processRequest = false;
        }

        if (processRequest) {
            //all tests passed.
            console.log("requests passed.");
            setRequestAdditional(false);
            postQuote();
            router.push("/thankyou");
        } else {
            setRequestAdditional(true);
            console.log("problem processing request");
        }
    }

    function postQuote() {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            prefDate: date1,
            prefTime: time1,
            altDate: date2,
            altTime: time2,
            make: carMake,
            model: carModel,
            year: carYear,
            reason: description,
        };
        fetch(`/api/requestQuote`, {
            method: "POST", // or 'PUT'
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
            <div className="h-32"></div>
            <div className="grid grid-row grid-cols-12 p-1">
                <div className={gutter} />
                <div className={body}>
                    <div className="flex justify-center text-accent active:bg-strong text-3xl font-bold p-6">Request Service Quote</div>
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
                                value={phone}
                                onClickCallback={setPhone}
                                helperText={phoneHelp}
                            />
                        </div>
                        <div className={small}>
                            <LabeledInput
                                fieldType="date"
                                id="date1_id"
                                label="Preferred Date"
                                value={date1}
                                onClickCallback={setDate1}
                                helperText={date1Help}
                            />
                        </div>
                        <div className={small}>
                            <LabeledInput
                                fieldType="list"
                                id="time1_id"
                                label="Preffered Time"
                                value={time1}
                                onClickCallback={setTime1}
                                helperText={time1Help}
                                dataList={timeOptionsDatalist}
                                datalistID="timeOptions"
                                onFocusCallback={(e) => {
                                    e.preventDefault();
                                    setTime1("");
                                }}
                            />
                        </div>
                        <div className={small}>
                            <LabeledInput
                                fieldType="date"
                                id="date2_id"
                                label="Alternative Date"
                                value={date2}
                                onClickCallback={setDate2}
                                helperText={date2Help}
                            />
                        </div>
                        <div className={small}>
                            <LabeledInput
                                fieldType="list"
                                id="time2_id"
                                label="Alternative Time"
                                value={time2}
                                onClickCallback={setTime2}
                                helperText={time2Help}
                                dataList={timeOptionsDatalist}
                                datalistID="timeOptions"
                                onFocusCallback={(e) => {
                                    e.preventDefault();
                                    setTime2("");
                                }}
                            />
                        </div>
                        <div className={medium}>
                            <LabeledInput
                                fieldType="text"
                                id="make_id"
                                label="Verhicle Make"
                                value={carMake}
                                onClickCallback={setCarMake}
                                helperText={carMakeHelp}
                            />
                        </div>

                        <div className={medium}>
                            <LabeledInput
                                fieldType="text"
                                id="model_id"
                                label="Vehicle Model"
                                value={carModel}
                                onClickCallback={setCarModel}
                                helperText={carModelHelp}
                            />
                        </div>
                        <div className={medium}>
                            <LabeledInput
                                fieldType="text"
                                id="year_id"
                                label="Vehicle Year"
                                value={carYear}
                                onClickCallback={setCarYear}
                                helperText={carYearHelp}
                            />
                        </div>
                        <div className="col-span-12 border-2 p-2 relative">
                            <label className="absolute -top-4 left-4 z-2  text-accent bg-primary">Reason for Visit</label>
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
                                    Request Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={gutter} />
            </div>
        </>
    );
}

export default Quote;
