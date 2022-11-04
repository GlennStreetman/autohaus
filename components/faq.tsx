import { useState, useEffect } from "react";
import ParseMarkdown from "./../lib/parseMarkdown";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import {faqPayload} from '../strapiAPI/getPublicFAQ'

function FAQ(p: { faq: faqPayload[] }) {
    const [show, setShow] = useState(-1);
    const [faq, setFaq] = useState([]);

    function updateShowState(changeShow) {
        changeShow !== show ? setShow(changeShow) : setShow(-1);
    }

    useEffect(() => {
        const formattedData = p.faq.map((el) => (
            <div key={`${el.id}-faqkey`} className="col-span-12" >
                {show === el.id ? (
                    <div className="flex py-2 cursor-pointer" onClick={() => updateShowState(el.id)}>
                        <div className="shrink font-semibold underline underline-offset-2">{el.attributes.question}</div>
                        <div className="content-end grow flex">
                            <div className="grow" />
                            <FiChevronDown className="h-5 w-5 shrink" />
                        </div>
                    </div>
                ) : (
                    <div className="flex cursor-pointer border-b-2 border-black  py-2" onClick={() => updateShowState(el.id)} >
                        <div className="shrink font-semibold">{el.attributes.question}</div>
                        <div className="content-end grow flex ">
                            <div className="grow" />
                            <FiChevronUp className="h-5 w-5 shrink" />
                        </div>
                    </div>
                )}
                {show === el.id ? (
                    <div className="border-b-2 border-black pb-2 text-sm" onClick={() => updateShowState(el.id)}>
                        <ParseMarkdown text={el.attributes.answer} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        ));
        setFaq(formattedData);
    }, [show]);

    return (
        <div className='bg-white mb-4'>
        <div className="mx-2 lg:mx-auto lg:w-3/5 flex flex-col pb-4 ">
            <div className="sectionHeading mb-4">Frequenty Asked Questions</div>
            <div className="border-b-2 border-black" />
            {faq}
        </div>
        </div>
    );
}

export default FAQ;
