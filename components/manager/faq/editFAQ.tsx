import React, { useState, useEffect, useContext, useRef } from "react";
import LabeledInput from "../../labeledInput";
import { ScreenWidth } from "../../screenWidth";
import OutlinedSurface from "../../outlinedSurface";
import IconButton from "../../iconButton";
import {faqObj} from '../../../pages/api/getFAQ'


interface props {
    faq: faqObj;
    setEdit: Function;
    setFAQ: Function;
    getFAQ: Function;
    setShowAdd: Function;
}

function EditFAQ(p: props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [requestAdditional, setRequestAdditional] = useState(false);
    const [serverMsg, setServerMsg] = useState("");
    const screenSize = useContext(ScreenWidth);

    useEffect(() => {
        setQuestion(p.faq.question);
        setAnswer(p.faq.answer);
    }, [p.faq.id]);

    function cancelRequest() {
        p.setShowAdd(true);
        p.setEdit(false);
    }

    function processRequest() {
        let processRequest = true;
        if (question === "") processRequest = false;
        if (answer === "") processRequest = false;

        if (processRequest) {
            setRequestAdditional(false);
            postFAQ();
        } else {
            setRequestAdditional(true);
            console.log("problem processing request");
        }
    }

    function postFAQ() {
        const data = {
            question: question,
            answer: answer,
            id: p.faq.id,
        };
        fetch("/api/faq/editFAQ", {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((res) => {
            console.log("status", res.status);
            return res.json();
        })
        .then((data) => {
            if (data.msg === "success") {
                p.getFAQ();
                p.setEdit(false);
                cancelRequest();
            } else {
                setServerMsg(data.msg);
            }
        })
        .catch((err) => {
            console.log("error getting update", err);
        });
    }

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2 mb-4" : "col-span-12 flex flex-row gap-2  mb-4";
    return (
        <OutlinedSurface label={`Edit FAQ`}>
            <div className={filtersFormat}>
                <LabeledInput id="faqQuestion_add" label="Question" value={question} onClickCallback={setQuestion} />
                </div>
                {/* <div className={filtersFormat}>
                <LabeledInput id="faqANswer_Add" label={`Answer`} value={answer} onClickCallback={setAnswer} />
                </div> */}
                <div className="col-span-12 border-2 p-2 relative mb-4">
                <label className="absolute -top-4 left-4 z-2  text-accent bg-primary">Answer:</label>
                <textarea
                    rows={6}
                    className="bg-primary outline-none w-full"
                    value={answer}
                    onChange={(e) => {
                        e.preventDefault();
                        setAnswer(e.target.value);
                    }}
                />
            </div>

           

            <div className="col-span-12 flex justify-center gap-12">

                <IconButton text="Cancel" icon={<></>} callback={cancelRequest} />
                <IconButton text="Save" icon={<></>} callback={processRequest} />
            </div>
            <div className="col-span-12 text-red-500 font-bold text-center">{serverMsg}</div>
            <div className="col-span-12 flex justify-center">
                {requestAdditional ? (
                    <div className="col-span-12">
                        <div className="flex justify-center text-accent active:bg-strong text-1xl font-bold p-6">
                            <div> Fill out all fields.</div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </OutlinedSurface>
    );
}

export default EditFAQ;
