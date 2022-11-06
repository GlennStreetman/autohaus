import React from "react";
import { useState, useEffect } from "react";
import AddNewTeamMember from "./about/addNewTeamMember";
import MapTeamMembers from "./about/mapTeamMembers";
import IconButton from "./../iconButton";
import { useSession } from "next-auth/react";
import NextLinkButton from "../nextLinkButton";

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}

interface props {
    show: boolean;
}

function Team(p: props) {
    const { data: session } = useSession();
    const [employees, setEmployees] = useState<employees[]>([]);
    const [addEmployee, setAddEmployee] = useState(false);
    const [showAdd, setShowAdd] = useState(true);

    useEffect(() => {
        //update service
        if (session) {
            getEmployees();
        } else {
            console.log("Session not found, aborting team fetch.");
        }
    }, []);

    function getEmployees() {
        fetch(`/api/employee/getEmployees`)
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data.employees);
            });
    }

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            <div className="flex justify-center pb-4">
                <NextLinkButton text="Formatting Help" link="/formattingHelp" icon={<></>} newtab={true} />
            </div>
            {addEmployee === true ? <AddNewTeamMember setAdd={setAddEmployee} setEmployees={setEmployees} getEmployees={getEmployees} /> : <></>}
            {addEmployee === false ? (
                <MapTeamMembers employees={employees} setEmployees={setEmployees} getEmployees={getEmployees} setShowAdd={setShowAdd} />
            ) : (
                <></>
            )}
            {addEmployee === false && showAdd === true ? (
                <div className="flex justify-left gap-2 my-3">
                    <IconButton text="Add Team Member" callback={() => setAddEmployee(!addEmployee)} icon={<></>} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Team;
