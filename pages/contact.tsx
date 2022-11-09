import { useState, useEffect } from "react";
// import Banner from "../components/banner";
import LabeledInput from "../components/labeledInput";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import OutlinedSurface from "../components/outlinedSurface";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import LinkButton from "../components/linkButton";
import { vinLengthText, testVin, formatVin } from "../lib/vin";
import { addDashes, stripPhone, validPhone } from "../lib/formatPhone";
import validEmail from "../lib/validEmail";


import { getPublicFAQ, faqPayload } from "../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../strapiAPI/getPublicImages"
import { getTeam, teamMember } from "../strapiAPI/getTeam"
import { getContacts, contacts } from "../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../strapiAPI/getSiteText"
import { getServices, ServicePayload } from "../strapiAPI/getServices"
import { getGoogle, googleAPIPayload } from "../strapiAPI/getGoogleApi"

import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";



export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    const teamList = await getTeam()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const allServices: ServicePayload[] = await getServices()
    const mapAPI: googleAPIPayload = await getGoogle()


    return {
        props: {
            faq: faqData,
            team: teamList,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            allServices: allServices,
            mapAPI: mapAPI,
        },
    };
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    team: teamMember[];
    siteText: siteText;
    allServices: ServicePayload[];
    contacts: contacts;
    mapAPI: googleAPIPayload,
}

interface staticData {
    faq: faqPayload[];
    images: imagePayload;
    team: teamMember[];
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    allServices: ServicePayload[];
    mapAPI: googleAPIPayload,
}

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

const mapTimeOptions = timeOptions.map((el) => <option key={el} value={el} />);
const timeOptionsDatalist = <datalist id="timeOptions">{mapTimeOptions}</datalist>;

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 my-4"; //1x
const big = " col-span-12 lg:col-span-6";
const medium = "col-span-12 lg:col-span-4";
const small = "col-span-6 lg:col-span-3";

function formatCarYear(e) {
    let carYear = e.replace(/\D/g, "");
    carYear = carYear.slice(0, 4);
    return carYear;
}

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

function Quote(p: props) {
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
    const [time1, setTime1] = useState("");
    const [date2, setDate2] = useState("");
    const [time2, setTime2] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carYearHelp, setCarYearHelp] = useState("");
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");
    const [vinNumber, setVinNumber] = useState("");
    const [vinNumberHelp, setVinNumberHelp] = useState("");
    const [description, setDescription] = useState("");
    const [showOptional, setShowOptional] = useState(false)
    const router = useRouter();

    useEffect(() => {

        const text = router?.query?.text || ''
        const textString = `${text}!`.replaceAll('%', ' ')
        setDescription(textString)

    }, [])

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
        if (!validEmail(email)) {
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
        //four digit year
        // if (carYear && carYear.length !== 4) {
        //     processRequest = false;
        //     setCarYearHelp("Please enter four digit year");
        //     setShowOptional(true)
        // } else {
        //     setCarYearHelp("");
        // }
        //test vin number
        if (carMake == 'porsche' && carYear && carYear.length === 4 && vinNumber && vinNumber.length !== testVin(vinNumber)) {
            processRequest = false;
            setVinNumberHelp(`Vin number must be ${vinLengthText(carYear)}  for ${carYear}`);
            setShowOptional(true)
        }
        // test capcha has been clicked
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
            vinNumber: vinNumber,
            reason: description,
        };
        fetch(`/api/requestQuote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    return (
        <>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Contact Us: `}</title>
            </Head>
            <div className='h-[0px] lg:h-[125px] bg-white' />

            <div className="grid grid-row grid-cols-12 p-1 bg-white">
                <div className={gutter} />

                <div className={body}>
                    <div >
                        <div className="grid grid-cols-12 col-span-12 relative mb-4 gap-6">
                            <div className='col-span-12 lg:col-span-6'>
                                <div className='outline outline-1 outline-slate-300 flex flex-inline gap-2'>
                                    <div className='p-4 outline-inherit' ><BsTelephoneInboundFill className="h-4 w-4 xs:h-7 xs:w-7" /></div>
                                    <div className='flex flex-col'>
                                        <div>Have a question, Call now</div>
                                        <div>{addDashes(p.contacts.phone)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-12 lg:col-span-6'>
                                <div className='outline outline-1 outline-slate-300  flex flex-inline gap-2'>
                                    <div className='p-4 outline-inherit'><HiOutlineLocationMarker className="h-4 w-4 xs:h-7 xs:w-7" /></div>
                                    <div className='flex flex-col'>
                                        <div>Our Address</div>
                                        <div>{p.contacts.addressLong}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OutlinedSurface>
                        <div className="sectionHeading my-8 text-4xl text-center">Contact Us:</div>
                        <div className="grid grid-row grid-cols-12 gap-x-2 gap-y-4">
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
                                    autocomplete="family-name"
                                    id="last_id"
                                    label="Last Name"
                                    value={lastName}
                                    onClickCallback={(e) => {
                                        setLastName(formatName(e));
                                    }}
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
                        </div>
                        <div className='flex'>
                            <div className='grow' />
                            <div className="my-8 text-center 
                                        border-2 p-1 rounded-md bg-secondary shadow-sm 
                                        shadow-slate-600 hover:bg-weak hover:border-black 
                                        hover:text-accent active:bg-strong"
                                onClick={() => setShowOptional(!showOptional)}>{showOptional ? 'Hide Appointment Options' : 'Show Optional Appointment Options'} </div>
                            <div className='grow' />
                        </div>
                        <div className="grid grid-row grid-cols-12 gap-x-2 gap-y-4">
                            {showOptional ? <>
                                <div className={small}>
                                    <LabeledInput fieldType="date" id="date1_id" label="Preferred Date" value={date1} onClickCallback={setDate1} />
                                </div>
                                <div className={small}>
                                    <LabeledInput
                                        fieldType="list"
                                        id="time1_id"
                                        label="Preffered Time"
                                        value={time1}
                                        onClickCallback={setTime1}
                                        dataList={timeOptionsDatalist}
                                        datalistID="timeOptions"
                                        onFocusCallback={(e) => {
                                            e.preventDefault();
                                            setTime1("");
                                        }}
                                    />
                                </div>
                                <div className={small}>
                                    <LabeledInput fieldType="date" id="date2_id" label="Alternative Date" value={date2} onClickCallback={setDate2} />
                                </div>
                                <div className={small}>
                                    <LabeledInput
                                        fieldType="list"
                                        id="time2_id"
                                        label="Alternative Time"
                                        value={time2}
                                        onClickCallback={setTime2}
                                        dataList={timeOptionsDatalist}
                                        datalistID="timeOptions"
                                        onFocusCallback={(e) => {
                                            e.preventDefault();
                                            setTime2("");
                                        }}
                                    />
                                </div>
                                <div className={medium}>
                                    <LabeledInput fieldType="text" id="make_id" label="Verhicle Make" value={carMake} onClickCallback={setCarMake} />
                                </div>

                                <div className={medium}>
                                    <LabeledInput fieldType="text" id="model_id" label="Vehicle Model" value={carModel} onClickCallback={setCarModel} />
                                </div>
                                <div className={medium}>
                                    <LabeledInput
                                        fieldType="text"
                                        id="year_id"
                                        label="Vehicle Year"
                                        value={carYear}
                                        onClickCallback={(e) => {
                                            setCarYear(formatCarYear(e));
                                        }}
                                        helperText={carYearHelp}
                                    />
                                </div>
                                <div className="grid grid-cols-12 col-span-12 relative">
                                    <div className={big}>
                                        <LabeledInput
                                            fieldType="text"
                                            id="vin_id"
                                            label={`${vinLengthText(carYear)} Vin Number`}
                                            value={vinNumber}
                                            onClickCallback={(e) => {
                                                setVinNumber(formatVin(e, carYear, carMake));
                                            }}
                                            helperText={vinNumberHelp}
                                        />
                                    </div>
                                    <div className={big}>
                                        <div className="flex justify-center p-1">
                                            <LinkButton newtab={true} text="Help Finding Your VIN Number" link="https://www.stuttcars.com/porsche-data/porsche-vin-decoder/" />
                                        </div>
                                    </div>
                                </div>
                            </> : <></>}
                            <div className="col-span-12 border-2 p-2 relative">
                                <label className="absolute -top-4 left-4 z-2  text-accentBlue bg-primary">Reason for Visit</label>
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
                                        Submit Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </OutlinedSurface>
                    <div className='flex'>
                        <iframe
                            width="1800"
                            height="450"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${p?.mapAPI?.secretAPIKey || ''}
                                    &q=${p?.mapAPI?.searchString || ''}`}>
                        </iframe>
                    </div>
                </div>
                <div className={gutter} />
            </div>
        </>
    );
}

export default function Main(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} >
            <Quote faq={p.faq} team={p.team} images={p.images} siteText={p.siteText} allServices={p.allServices} contacts={p.contacts} mapAPI={p.mapAPI} />
        </PublicHOC>
    );
}
