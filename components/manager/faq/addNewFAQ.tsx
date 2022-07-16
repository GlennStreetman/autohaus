import React, { useState, useContext } from "react";
import LabeledInput from "../../labeledInput";
import { ScreenWidth } from "../../screenWidth";
import OutlinedSurface from "../../outlinedSurface";
import IconButton from "../../iconButton";

interface props {
    setAdd: Function;
    setFAQ: Function;
    getFAQ: Function;
}

function AddNewFAQ(p: props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [serverMsg, setServerMsg] = useState("");
    const screenSize = useContext(ScreenWidth);

    function cancelRequest() {
        p.setAdd(false);
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
        }

        fetch(`/api/faq/addFAQ`, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                return res.json();
            })
            .then((data) => {
                if (data.msg === "success") {
                    p.getFAQ();
                    cancelRequest();
                } else {
                    setServerMsg(data.msg);
                }
            })
            .catch((err) => {
                console.log("error submitting FAQ:", err);
            });
    }

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2 mb-4" : "col-span-12 flex flex-row gap-2  mb-4";
    return (
        <OutlinedSurface label={`Add New FAQ`}>
            <div className={filtersFormat}>
                <LabeledInput id="faqQuestion_add" label="Question" value={question} onClickCallback={setQuestion} />
                <LabeledInput id="faqAnswer_add" label="Answer" value={answer} onClickCallback={setAnswer} />
            </div>

            

           
            <div className="col-span-12 flex justify-center gap-12">
                <IconButton text="Cancel" icon={<></>} callback={cancelRequest} />
                <IconButton text="Add FAQ" icon={<></>} callback={processRequest} />
            </div>
            <div className="col-span-12 text-red-500 font-bold text-center">{serverMsg}</div>
            <div className="col-span-12 flex justify-center">
                {requestAdditional ? (
                    <div className="col-span-12">
                        <div className="flex justify-center text-accent active:bg-strong text-1xl font-bold p-6">
                            <div> fill out all fields.</div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </OutlinedSurface>
    );
}

export default AddNewFAQ;
