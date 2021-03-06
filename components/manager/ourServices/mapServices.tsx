import React, { useState } from "react";
import LabeledSelect from "./../../labeledSelect";
import { service } from "../ourServices";

interface props {
    ourServices: service[];
    setOurServices: Function;
    editService: false | service;
    setEditService: Function;
    getServices: Function;
}

function MapServices(p: props) {
    const [showDetail, setShowDetail] = useState("-1");

    const mapResultLimit = Object.keys(Array.from({ length: p.ourServices.length })).map((key) => {
        return (
            <option key={`${key}-limit`} value={parseInt(key) + 1}>
                {parseInt(key) + 1}
            </option>
        );
    });

    function updateOrder(newPlacement, oldId) {
        let employeeOrder = p.ourServices.reduce((prev, curr) => {
            prev.push(curr.id);
            return prev;
        }, []);
        employeeOrder = employeeOrder.filter((n) => {
            return n != oldId;
        });
        employeeOrder.splice(newPlacement - 1, 0, oldId);

        fetch("/api/services/serviceOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newOrder: employeeOrder,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                p.getServices();
            });
    }

    const mapServices = p.ourServices.map((el) => {
        const display = el.id.toString() === showDetail ? "" : "hidden";

        return (
            <React.Fragment key={`${el.id}-employee-team-empty`}>
                <tr key={`${el.id}-employee-team-edit`}>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={p.editService !== false && el.id === p.editService.id}
                            onChange={async (e) => {
                                p.setEditService(el);
                            }}
                        />
                    </td>
                    <td>
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
                    <td>{el.name}</td>
                    <td>{el.bannertext}</td>
                    <td>{el.bannerimage}</td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={false}
                            onChange={async (e) => {
                                fetch(`/api/services/deleteOurServices?id=${el.id}&name=${el.name}`).then(() => p.getServices());
                            }}
                        />
                    </td>
                </tr>
                <tr key={`${el.id}-employee-team-delete`}>
                    <td className={`${display}`} colSpan={6} />
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
                        <td>Service</td>
                        <td>BannerText</td>
                        <td>BannerImage</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>{mapServices}</tbody>
            </table>
        </div>
    );

    return servicesContainer;
}

export default MapServices;
