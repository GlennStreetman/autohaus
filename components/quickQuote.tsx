import { useState } from "react";
import LinkButton from "./linkButton";
import QuickPhone from './quickPhone'
import QuickText from './quickText'
import QuickEmail from './quickEmail'
import { useContext } from "react";
import { PublicContext } from "./publicData";
import { addDashes } from "../lib/formatPhone";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";

const big = " col-span-12 lg:col-span-6";

interface props {
    description: string
}

export default function QuickQuote(p: props) {

    const publicData = useContext(PublicContext);

    const [showForm, setShowForm] = useState("");
    const [phoneBinary, setPhoneBinary] = useState(true);
    const [emailBinary, setEmailBinary] = useState(true);

    const telephoneText = phoneBinary ? 'Call Now' : addDashes(publicData.phone) 
    const email = emailBinary ? "Email The Werkstatt" : publicData.serviceEmail;

    return (
        <>
        {showForm === "" ? <div className="grid grid-row grid-cols-12 p-1 bg-transparent text-red-500">
            <div className={big}>
                <div className="flex flex-col justify-center gap-1 text-1xl">
                    <div className="flex justify-center gap-4 text-1xl">
                    <div onClick={()=>{setPhoneBinary(!phoneBinary)}}>
                        <LinkButton text={telephoneText} link={`tel:${publicData.phone}`} icon={<BsTelephoneInboundFill className="h-5 w-5 xs:h-7  xs:w-7" />} />
                    </div>
                        <div onClick={()=>{setEmailBinary(!emailBinary)}}>
                            <LinkButton text={email} link={`mailto: ${email}`} icon={<MdOutlineMailOutline className="h-5 w-5 xs:h-7  xs:w-7" />} />
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 text-1xl">
                        {/* <div className='my-auto'>Contact Service:</div> */}
                    
                        <button onClick={()=>{setShowForm('Call')}} className="p-2 hover:text-accent">
                            Receive Call
                        </button>
                        
                        <button onClick={()=>{setShowForm('Text')}} className="p-2 hover:text-accent">
                            Receive Text
                        </button>
                        
                        <button onClick={()=>{setShowForm('Email')}} className="p-2 hover:text-accent">
                            Receive Email
                        </button>
                    
                    </div>
                </div>
            </div>
        </div> : <></>}

        {showForm === "Call" ? <QuickPhone reset={setShowForm} description={`Service Lead: ${p.description} Please Call.`}></QuickPhone> : <></>}
        {showForm === "Text" ? <QuickText reset={setShowForm} description={`Service Lead: ${p.description} Please send Text.`}/> : <></>}
        {showForm === "Email" ? <QuickEmail reset={setShowForm} description={`Service Lead: ${p.description} Please send Email.`}/> : <></>}

    </>
    );
}