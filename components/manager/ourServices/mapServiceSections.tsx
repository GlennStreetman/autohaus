import React, { useState } from "react";
import { service, section } from "../ourServices";
import AddNewServiceSection from "./addNewServiceSection";
import EditServiceSection from "./editServiceSection";
import LabeledSelect from "./../../labeledSelect";
import OutlinedSurface from "./../../outlinedSurface";

interface props {
    service: service;
    getServices: Function;
}

function mapServiceSections(p: props) {
    const [showDetail, setShowDetail] = useState(-1);
    const [editSection, setEditSection] = useState<false | section>(false);

    const mapResultLimit = Object.keys(Array.from({ length: p.service.sections.length })).map((key) => {
        return (
            <option key={`${key}-limit`} value={parseInt(key) + 1}>
                {parseInt(key) + 1}
            </option>
        );
    });

    function updateOrder(newPlacement, oldId) {
        let sectionOrder = p.service.sections.reduce((prev, curr) => {
            prev.push(curr.id);
            return prev;
        }, []);
        sectionOrder = sectionOrder.filter((n) => {
            return n != oldId;
        });
        sectionOrder.splice(newPlacement - 1, 0, oldId);

        fetch("/api/services/sectionOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newOrder: sectionOrder,
            }),
        }).then(() => p.getServices());
    }

    const mapSections = p.service.sections.map((el) => {
        const display = el.id === showDetail ? "" : "hidden";
        const clickDetail = () => {
            console.log("showdetail", showDetail, el.id);
            showDetail === el.id ? setShowDetail(-1) : setShowDetail(el.id);
        };

        return (
            <React.Fragment key={`${el.id}-employee-team-empty`}>
                <tr key={`mapSection${el.id}`}>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={editSection !== false && el.id === editSection.id}
                            onChange={async (e) => {
                                setEditSection(el);
                            }}
                        />
                    </td>
                    <td>
                        {" "}
                        <LabeledSelect
                            label=""
                            value={el.ordernumber.toString()}
                            onClickCallback={(e) => {
                                console.log("LIMIT", e);
                                updateOrder(parseInt(e), el.id);
                            }}
                            id="newDay_ID"
                        >
                            {mapResultLimit}
                        </LabeledSelect>
                    </td>
                    <td onClick={clickDetail}>{el.sectionheader}</td>
                    <td onClick={clickDetail}>{el.sectionimage}</td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={false}
                            onChange={async (e) => {
                                fetch(`/api/services/deleteServiceSection?id=${el.id}&name=${p.service.name}`).then(() => p.getServices());
                            }}
                        />
                    </td>
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
    );

    return (
        <div className="flex flex-col">
            <OutlinedSurface label={`Page Sections: ${p.service.name} `}>{servicesContainer}</OutlinedSurface>

            {editSection !== false ? (
                <OutlinedSurface label={`Edit: ${editSection.sectionheader}`}>
                    <EditServiceSection section={editSection} setEditSection={setEditSection} getServices={p.getServices} service={p.service} />
                </OutlinedSurface>
            ) : (
                <AddNewServiceSection service={p.service} getServices={p.getServices} />
            )}
        </div>
    );
}

export default mapServiceSections;

{
}
