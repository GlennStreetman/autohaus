import { useState, useEffect, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
// import { ScreenWidth } from "../screenWidth";
import AddNewService from "./ourServices/addNewService";
import EditService from "./ourServices/editService";

import MapServices from "./ourServices/mapServices";

export interface section {
    id: number;
    serviceid: number;
    sectionimage: string;
    sectiontext: string;
    sectionheader: string;
    ordernumber: number;
}

export interface service {
    id: number;
    name: string;
    bannerimage: string;
    bannertext: string;
    ordernumber: number;
    sections: section[];
}

import React from "react";

interface props {
    show: boolean;
}

function OurServices(p: props) {
    const { data: session } = useSession();
    const [ourServices, setOurServices] = useState<service[]>([]);
    const [editService, setEditService] = useState<false | service>(false);

    function getServices() {
        fetch(`/api/getOurServices`)
            .then((response) => response.json())
            .then((data) => {
                console.log("services data", data);
                setOurServices(data.ourServices);
                if (editService) {
                    const oldid = editService.id;
                    const findService = data.ourServices.find((el) => el.id === oldid);
                    setEditService(findService);
                }
            });
    }

    useEffect(() => {
        if (session) {
            getServices();
        } else {
            // console.log("Session not found, aborting fetch.");
        }
    }, []);

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            {!editService ? (
                <MapServices ourServices={ourServices} setOurServices={setOurServices} editService={editService} setEditService={setEditService} />
            ) : (
                <EditService service={editService} getServices={getServices} setEditService={setEditService} />
            )}
            {!editService ? <AddNewService getServices={getServices} /> : <></>}
        </div>
    );
}

export default OurServices;
