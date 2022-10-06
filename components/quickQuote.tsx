import { useState } from "react";

import QuickPhone from './quickPhone'
import QuickText from './quickText'
import QuickEmail from './quickEmail'

const big = " col-span-12 lg:col-span-6";

interface props {
    description: string
}

export default function QuickQuote(p: props) {

    const [showForm, setShowForm] = useState("");

    return (
        <>
        {showForm === "" ? <div className="grid grid-row grid-cols-12 p-1 bg-transparent text-red-500">
        <div className={big}>
            <div className="flex justify-center gap-4 text-1xl">
                <div className='my-auto'>Schedule Service:</div>
                
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
        </div> : <></>}

        {showForm === "Call" ? <QuickPhone reset={setShowForm} description={`Service Lead: ${p.description} Please Call.`}></QuickPhone> : <></>}
        {showForm === "Text" ? <QuickText reset={setShowForm} description={`Service Lead: ${p.description} Please send Text.`}/> : <></>}
        {showForm === "Email" ? <QuickEmail reset={setShowForm} description={`Service Lead: ${p.description} Please send Email.`}/> : <></>}

    </>
    );
}