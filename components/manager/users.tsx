import React from "react";
import { useState, useEffect } from "react";
import OutlinedSurface from "./../outlinedSurface";
import { useSession } from "next-auth/react";
import LabeledSelect from "./../labeledSelect";

interface user {
    id: number;
    email: string;
    role: string;
}

interface props {
    show: boolean;
}

const userTypes = {
    ["guest"]: "guest",
    ["admin"]: "admin",
};

const mapFilterOptions = Object.entries(userTypes).map(([key, val]) => {
    return (
        <option key={`${key}-key`} value={val}>
            {val}
        </option>
    );
});

function Users(p: props) {
    const { data: session } = useSession();
    const [users, setUsers] = useState<user[]>([]);

    useEffect(() => {
        //update service
        if (session) {
            getUsers();
        } else {
            console.log("Session not found, aborting team fetch.");
        }
    }, []);

    function getUsers() {
        fetch(`/api/siteSetup/getUsers`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.users);
            });
    }

    async function setUser(role, email) {
        await fetch(`/api/siteSetup/setUser?email=${email}&role=${role}`);
        getUsers();
    }

    const mapUsers = users.map((el: user) => (
        <tr key={`keyUser-${el.email}`} id={`${el.email}-${el.role}`}>
            <td>{el.email}</td>
            <td>
                <LabeledSelect
                    label=""
                    value={userTypes[el.role ? el.role : "guest"]}
                    onClickCallback={(e) => {
                        setUser(e, el.email);
                    }}
                    id={`${el.email}-role`}
                >
                    {mapFilterOptions}
                </LabeledSelect>
            </td>
        </tr>
    ));

    const userContainer = (
        <OutlinedSurface label="Review Site Managers">
            <div className={"col-span-12 overflow-auto"}>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>email</td>
                            <td>type</td>
                        </tr>
                    </thead>
                    <tbody> {mapUsers}</tbody>
                </table>
            </div>
        </OutlinedSurface>
    );

    return <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>{userContainer}</div>;
}

export default Users;
