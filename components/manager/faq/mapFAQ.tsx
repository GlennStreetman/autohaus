import React from "react";
import LabeledSelect from "../../labeledSelect";
import EditFAQ from "./editFAQ";
import OutlinedSurface from "../../outlinedSurface";
import { useState } from "react";
import {faqObj} from '../../../pages/api/getFAQ'

interface props {
    faq: faqObj[];
    setFAQ: Function;
    getFAQ: Function;
    setShowAdd: Function;
}

function MapFAQ(p: props) {
    const [showDetail, setShowDetail] = useState("-1");
    const [edit, setEdit] = useState<false | faqObj>(false);

    function updateOrder(newPlacement, oldId) {
        let faqOrder = p.faq.reduce((prev, curr) => {
            prev.push(curr.id);
            return prev;
        }, []);
        faqOrder = faqOrder.filter((n) => {
            return n != oldId;
        });
        faqOrder.splice(newPlacement - 1, 0, oldId);

        fetch("/api/faq/faqOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newOrder: faqOrder,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                p.getFAQ();
            });
    }

    // @ts-ignore
    const mapResultLimit = Object.keys(Array.from({ length: Object.keys(p.faq).length })).map((key) => {
        return (
            <option key={`${key}-limit`} value={parseInt(key) + 1}>
                {parseInt(key) + 1}
            </option>
        );
    });

    const mapFAQ = p.faq.map((el) => {
        const display = el.id.toString() === showDetail ? "" : "hidden";
        const clickDetail = () => {
            el.id.toString() === showDetail ? setShowDetail("-1") : setShowDetail(el.id.toString());
        };
        return (
            <React.Fragment key={`${el.id}-FAQ-empty`}>
                <tr key={`${el.id}-FAQ-edit`}>
                    <td className="text-center">
                        {" "}
                        <input
                            className=""
                            type="checkbox"
                            checked={edit !== false && el.id === edit.id}
                            onChange={async () => {
                                setEdit(el);
                                p.setShowAdd();
                            }}
                        />
                    </td>
                    <td>
                        <LabeledSelect
                            label=""
                            value={`${el.ordernumber}`}
                            onClickCallback={(e) => {
                                console.log("LIMIT", e);
                                updateOrder(parseInt(e), el.id);
                            }}
                            id="newDay_ID"
                        >
                            {mapResultLimit}
                        </LabeledSelect>
                    </td>
                    {/* <td onClick={clickDetail}>{el.name}</td> */}
                    <td onClick={clickDetail}>{el.question}</td>
                    {/* <td>{el.filename}</td> */}
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={false}
                            onChange={async (e) => {
                                e.preventDefault();
                                // console.log('click', el.id)
                                fetch(`/api/faq/deleteFAQ?id=${el.id}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        p.getFAQ();
                                    });  
                            }}
                        />
                    </td>
                </tr>
                {/* <tr key={`${el.id}-FAQ-delete`}>
                    <td className={`${display}`} colSpan={6}>
                        <p>{el.answer}</p>
                    </td>
                </tr> */}
            </React.Fragment>
        );
    });

    const FAQContainer = (
        <OutlinedSurface label="Review Team">
            <div className={"col-span-12 overflow-auto"}>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Edit</td>
                            <td>Order</td>
                            <td>Question</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>{mapFAQ}</tbody>
                </table>
            </div>
        </OutlinedSurface>
    );

    return (
        <div>
            {FAQContainer}
            {edit !== false ? (
                <EditFAQ faq={edit} setEdit={setEdit} setFAQ={p.setFAQ} getFAQ={p.getFAQ} setShowAdd={p.setShowAdd} />
            ) : (
                <></>
            )}
        </div>
    );
}

export default MapFAQ;
