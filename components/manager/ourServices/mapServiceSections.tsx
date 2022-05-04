import React, { useState } from "react";
import { service, section } from "../ourServices";
import AddNewServiceSection from "./addNewServiceSection";

interface props {
    service: service;
}

function mapServiceSections(p: props) {
    const [showDetail, setShowDetail] = useState(-1);
    const [editSection, setEditSection] = useState<false | section>(false);

    const mapSections = p.service.sections.map((el) => {
        const display = el.id === showDetail ? "" : "hidden";
        const clickDetail = () => {
            console.log("showdetail", showDetail, el.id);
            showDetail === el.id ? setShowDetail(-1) : setShowDetail(el.id);
        };

        return (
            <React.Fragment key={`${el.id}-employee-team-empty`}>
                <tr key={`mapSection${el.id}`}>
                    <td></td>
                    <td></td>
                    <td onClick={clickDetail}>{el.sectionheader}</td>
                    <td onClick={clickDetail}>{el.sectionimage}</td>
                    <td></td>
                </tr>
                <tr key={`mapSection2${el.id}`}>
                    <td className={`${display}`} colSpan={12}>
                        <div className="whitespace-pre-line">{el.sectiontext}</div>
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    const servicesContainer = (
        <>
            <div className={"col-span-12 overflow-auto"}>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Edit</td>
                            <td>Order</td>
                            <td>Section Heading</td>
                            <td>Image</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>{mapSections}</tbody>
                </table>
            </div>
        </>
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center font-bold text-xl text-accent">{p.service.name} Page Sections</div>
            {servicesContainer}
            <AddNewServiceSection service={p.service} />
        </div>
    );
}

export default mapServiceSections;
