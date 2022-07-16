import React from "react";
import { useState, useEffect } from "react";
import AddNewFAQ from "./faq/addNewFAQ";
import MapFAQ from "./faq/mapFAQ";
import IconButton from "../iconButton";
import { useSession } from "next-auth/react";
import NextLinkButton from "../nextLinkButton";
import {faqObj} from '../../pages/api/getFAQ'

interface props {
    show: boolean;
}


function FAQ(p: props) {
    const { data: session } = useSession();
    const [faq, setFAQ] = useState<faqObj[]>([]);
    const [addFAQ, setAddFAQ] = useState(false);
    const [showAdd, setShowAdd] = useState(true);

    useEffect(() => {
        //update service
        if (session) {
            getFAQ();
        } else {
            console.log("Session not found, aborting faq fetch.");
        }
    }, []);

    function getFAQ() {
        fetch(`/api/getFAQ/`)
            .then((response) => response.json())
            .then((data) => {
                setFAQ(data.faq);
            });
    }

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            <div className="flex justify-center pb-4">
                <NextLinkButton text="Formatting Help" link="/formattingHelp" icon={<></>} newtab={true} />
            </div>
            {addFAQ === true ? <AddNewFAQ setAdd={setAddFAQ} setFAQ={setFAQ} getFAQ={getFAQ} /> : <></>}
            {addFAQ === false ? (
                <MapFAQ faq={faq} setFAQ={setFAQ} getFAQ={getFAQ} setShowAdd={setShowAdd} />
            ) : (
                <></>
            )}
            {addFAQ === false && showAdd === true ? (
                <div className="flex justify-left gap-2 my-3">
                    <IconButton text="Add FAQ" callback={() => setAddFAQ(!addFAQ)} icon={<></>} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default FAQ;
