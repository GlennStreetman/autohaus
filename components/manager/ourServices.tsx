import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddNewService from "./ourServices/addNewService";
import EditService from "./ourServices/editService";
import MapServices from "./ourServices/mapServices";
import OutlinedSurface from "./../outlinedSurface";
import NextLinkButton from "../nextLinkButton";

export interface section {
    id: number;
    serviceid: number;
    sectionimage: string;
    sectiontext: string | any;
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
        fetch(`/api/services/getOurServices`)
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
            <div className="flex justify-center pb-4">
                <NextLinkButton text="Formatting Help" link="/formattingHelp" icon={<></>} newtab={true} />
            </div>
            {!editService ? (
                <OutlinedSurface label="Review Services">
                    <MapServices
                        ourServices={ourServices}
                        setOurServices={setOurServices}
                        editService={editService}
                        setEditService={setEditService}
                        getServices={getServices}
                    />
                </OutlinedSurface>
            ) : (
                <EditService service={editService} getServices={getServices} setEditService={setEditService} />
            )}
            {!editService ? <AddNewService getServices={getServices} /> : <></>}
        </div>
    );
}

export default OurServices;
