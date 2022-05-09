import React from "react";
import { useState, useEffect } from "react";
import AddNewTeamMember from "./team/addNewTeamMember";
import EditTeamMember from "./team/editTeamMember";
import MapTeamMembers from "./team/mapTeamMembers";
import IconButton from "./../iconButton";
import { useSession } from "next-auth/react";

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

function team(p: props) {
    const { data: session } = useSession();
    const [employees, setEmployees] = useState<employees[]>([]);
    const [addEmployee, setAddEmployee] = useState(false);
    const [editEmployee, setEditEmployee] = useState(false);

    useEffect(() => {
        //update service
        if (session) {
            fetch(`/api/getEmployees`)
                .then((response) => response.json())
                .then((data) => {
                    setEmployees(data.employees);
                });
        } else {
            console.log("Session not found, aborting team fetch.");
        }
    }, []);

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            {addEmployee === true ? <AddNewTeamMember setAdd={setAddEmployee} setEmployees={setEmployees} /> : <></>}
            {editEmployee === true ? <EditTeamMember /> : <></>}
            {addEmployee === false ? <MapTeamMembers employees={employees} setEmployees={setEmployees} setEditEmployee={setEditEmployee} /> : <></>}
            {addEmployee === false ? (
                <div className="flex justify-left gap-2 my-3">
                    <IconButton text="Add Team Member" callback={() => setAddEmployee(!addEmployee)} icon={<></>} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default team;
