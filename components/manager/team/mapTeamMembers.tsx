import React from "react";
import LabeledSelect from "./../../labeledSelect";
import EditTeamMember from "./editTeamMember";
import OutlinedSurface from "./../../outlinedSurface";
import { useState } from "react";

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}

interface props {
    employees: employees[];
    setEmployees: Function;
    getEmployees: Function;
    setShowAdd: Function;
}

function MapTeamMembers(p: props) {
    const [showDetail, setShowDetail] = useState("-1");
    const [edit, setEdit] = useState<false | employees>(false);

    function updateOrder(newPlacement, oldId) {
        let employeeOrder = p.employees.reduce((prev, curr) => {
            prev.push(curr.id);
            return prev;
        }, []);
        employeeOrder = employeeOrder.filter((n) => {
            return n != oldId;
        });
        employeeOrder.splice(newPlacement - 1, 0, oldId);

        fetch("/api/employee/employeeOrder", {
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
                p.getEmployees();
            });
    }

    // @ts-ignore
    const mapResultLimit = Object.keys(Array.from({ length: Object.keys(p.employees).length })).map((key) => {
        return (
            <option key={`${key}-limit`} value={parseInt(key) + 1}>
                {parseInt(key) + 1}
            </option>
        );
    });

    const mapTeamMembers = p.employees.map((el) => {
        const display = el.id.toString() === showDetail ? "" : "hidden";
        const clickDetail = () => {
            el.id.toString() === showDetail ? setShowDetail("-1") : setShowDetail(el.id.toString());
        };
        return (
            <React.Fragment key={`${el.id}-employee-team-empty`}>
                <tr key={`${el.id}-employee-team-edit`}>
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
                            value={el.ordernumber}
                            onClickCallback={(e) => {
                                console.log("LIMIT", e);
                                updateOrder(parseInt(e), el.id);
                            }}
                            id="newDay_ID"
                        >
                            {mapResultLimit}
                        </LabeledSelect>
                    </td>
                    <td onClick={clickDetail}>{el.name}</td>
                    <td onClick={clickDetail}>{el.title}</td>
                    <td>{el.filename}</td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={false}
                            onChange={async (e) => {
                                fetch(`/api/employee/deleteEmployee?id=${el.id}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        p.getEmployees();
                                });
                            }}
                        />
                    </td>
                </tr>
                <tr key={`${el.id}-employee-team-delete`}>
                    <td className={`${display}`} colSpan={6}>
                        <p>{el.description}</p>
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    const teamMembersContainer = (
        <OutlinedSurface label="Review Team">
            <div className={"col-span-12 overflow-auto"}>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Edit</td>
                            <td>Order</td>
                            <td>Name</td>
                            <td>Title</td>
                            <td>Picture</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>{mapTeamMembers}</tbody>
                </table>
            </div>
        </OutlinedSurface>
    );

    return (
        <div>
            {teamMembersContainer}
            {edit !== false ? (
                <EditTeamMember edit={edit} setEdit={setEdit} setEmployees={p.setEmployees} getEmployees={p.getEmployees} setShowAdd={p.setShowAdd} />
            ) : (
                <></>
            )}
        </div>
    );
}

export default MapTeamMembers;
