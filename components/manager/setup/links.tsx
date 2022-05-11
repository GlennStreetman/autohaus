import React, { useState, useEffect } from "react";
import OutlinedSurface from "./../../outlinedSurface";
import LabeledInput from "./../../../components/labeledInput";
import IconButton from "./../../iconButton";

interface savedContact {
    socialLink?: string;
    googleLink?: string;
    reviewLink?: string;
}

function contactInfo() {
    const [savedContact, setSavedContact] = useState<savedContact>({});
    const [socialLink, setSocialLink] = useState("");
    const [googleLink, setGoogleLink] = useState("");
    const [reviewLink, setReviewLink] = useState("");
    const [saveLinks, setSaveLinks] = useState(false);
    useEffect(() => {
        getSiteLinks();
    }, []);

    useEffect(() => {
        let setSaved = false;
        if (savedContact.socialLink !== socialLink) setSaved = true;
        if (savedContact.googleLink !== googleLink) setSaved = true;
        if (savedContact.reviewLink !== reviewLink) setSaved = true;

        setSaveLinks(setSaved);
    }, [savedContact, socialLink, googleLink, reviewLink]);

    function getSiteLinks() {
        fetch("/api/siteSetup/getSiteLinks")
            .then((res) => res.json())
            .then((data) => {
                if (data.socialLink) setSocialLink(data.socialLink);
                if (data.googleLink) setGoogleLink(data.googleLink);
                if (data.reviewLink) setReviewLink(data.reviewLink);

                setSavedContact(data);
            });
    }

    function saveContacts() {
        fetch("/api/siteSetup/postSiteContent", {
            method: "POST",
            body: JSON.stringify({
                socialLink: socialLink,
                googleLink: googleLink,
                reviewLink: reviewLink,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                getSiteLinks();
                setSaveLinks(false);
            });
    }

    return (
        <OutlinedSurface label="Media Links">
            <div className="flex flex-col gap-4">
                <LabeledInput
                    fieldType="text"
                    id="social_id"
                    label="Social Media Link"
                    value={socialLink}
                    onClickCallback={setSocialLink}
                    // helperText={emailHelp}
                />

                <LabeledInput
                    fieldType="text"
                    id="maps_id"
                    label="Google Maps Link"
                    value={googleLink}
                    onClickCallback={setGoogleLink}
                    // helperText={emailHelp}
                />

                <LabeledInput
                    fieldType="text"
                    id="google_id"
                    label="Google Reviews Link"
                    value={reviewLink}
                    onClickCallback={setReviewLink}
                    // helperText={emailHelp}
                />

                <div className="flex justify-center">{saveLinks ? <IconButton text="Save Updates" callback={() => saveContacts()} icon={<></>} /> : <></>}</div>
            </div>
        </OutlinedSurface>
    );
}

export default contactInfo;
