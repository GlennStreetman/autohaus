import React, { useState, useEffect } from "react";
import OutlinedSurface from "./../../outlinedSurface";
import LabeledInput from "./../../../components/labeledInput";
import { addDashes, stripPhone } from "./../../../lib/formatPhone";
import IconButton from "./../../iconButton";

interface savedContact {
    phone?: string;
    serviceEmail?: string;
    address?: string;
    addressLong?: string;
    openShort?: string;
    openLong?: string;
}

function ContactInfo() {
    const [savedContact, setSavedContact] = useState<savedContact>({});
    const [phone, setPhone] = useState("");
    const [serviceEmail, setServiceEmail] = useState("");
    const [address, setAddress] = useState("");
    const [addressLong, setAddressLong] = useState("");
    const [openShort, setOpenShort] = useState("");
    const [openLong, setOpenLong] = useState("");
    const [saveContact, setSaveContact] = useState(false);

    useEffect(() => {
        getSiteContacts();
    }, []);

    useEffect(() => {
        let setSaved = false;
        if (savedContact.phone !== phone) setSaved = true;
        if (savedContact.serviceEmail !== serviceEmail) setSaved = true;
        if (savedContact.address !== address) setSaved = true;
        if (savedContact.addressLong !== addressLong) setSaved = true;
        if (savedContact.openShort !== openShort) setSaved = true;
        if (savedContact.openLong !== openLong) setSaved = true;
        setSaveContact(setSaved);
    }, [savedContact, phone, serviceEmail, address, openShort, openLong, saveContact]);

    function getSiteContacts() {
        fetch("/api/siteSetup/getSiteContact")
            .then((res) => res.json())
            .then((data) => {
                if (data.phone) setPhone(data.phone);
                if (data.serviceEmail) setServiceEmail(data.serviceEmail);
                if (data.address) setAddress(data.address);
                if (data.addressLong) setAddressLong(data.addressLong);
                if (data.openShort) setOpenShort(data.openShort);
                if (data.openLong) setOpenLong(data.openLong);
                setSavedContact(data);
            });
    }

    function saveContacts() {
        fetch("/api/siteSetup/postSiteContent", {
            method: "POST",
            body: JSON.stringify({
                phone: phone,
                serviceEmail: serviceEmail,
                address: address,
                addressLong: addressLong,
                openShort: openShort,
                openLong: openLong,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                getSiteContacts();
                setSaveContact(false);
            });
    }

    return (
        <OutlinedSurface label="Contact Info">
            <div className="flex flex-col gap-4">
                <LabeledInput
                    autocomplete="tel"
                    fieldType="tel"
                    id="phone_id"
                    label="Public Phone"
                    value={addDashes(phone)}
                    onClickCallback={(e) => {
                        setPhone(stripPhone(e));
                    }}
                    // helperText={}
                />
                <LabeledInput
                    autocomplete="email"
                    fieldType="email"
                    id="email_id"
                    label="Service Email"
                    value={serviceEmail}
                    onClickCallback={setServiceEmail}
                    // helperText={emailHelp}
                />
                <LabeledInput
                    autocomplete="address"
                    fieldType="text"
                    id="address_id"
                    label="Address"
                    value={address}
                    onClickCallback={setAddress}
                    // helperText={emailHelp}
                />
                <LabeledInput
                    autocomplete="address"
                    fieldType="text"
                    id="address_id_Long"
                    label="Address Long"
                    value={addressLong}
                    onClickCallback={setAddressLong}
                    // helperText={emailHelp}
                />
                <LabeledInput
                    fieldType="text"
                    id="openLong"
                    label="Open Top (short)"
                    value={openShort}
                    onClickCallback={setOpenShort}
                    // helperText={emailHelp}
                />
                <LabeledInput
                    fieldType="text"
                    id="openLong"
                    label="Open Bottom (long)"
                    value={openLong}
                    onClickCallback={setOpenLong}
                    // helperText={emailHelp}
                />

                <a target="_blank" className="text-center font-bold text-xl text-red-600 py-4 underline hover:text-red-700" href="https://business.google.com">
                    Remember to update your Google Business Dashboard with your changes!
                </a>

                <div className="flex justify-center">
                    {saveContact ? <IconButton text="Save Updates" callback={() => saveContacts()} icon={<></>} /> : <></>}
                </div>
            </div>
        </OutlinedSurface>
    );
}

export default ContactInfo;
