import React, { useState, useEffect } from "react";
import OutlinedSurface from "../../outlinedSurface";
import LabeledtextArea from "./../../labeledTextArea";
import IconButton from "../../iconButton";

interface savedContact {
    FPBannerText?: string;
    aboutHeading?: string;
    aboutBody?: string;
    thanksResume?: string;
    thanksService?: string;
}

function contactInfo() {
    const [savedContact, setSavedContact] = useState<savedContact>({});
    const [FPBannerText, setFPBannerText] = useState("");
    const [aboutHeading, setAboutHeading] = useState("");
    const [aboutBody, setAboutBody] = useState("");
    const [thanksResume, setThanksResume] = useState("");
    const [thanksService, setThanksService] = useState("");
    const [saveLinks, setSaveLinks] = useState(false);

    useEffect(() => {
        getSiteLinks();
    }, []);

    useEffect(() => {
        let setSaved = false;
        if (savedContact.FPBannerText !== FPBannerText) setSaved = true;
        if (savedContact.aboutHeading !== aboutHeading) setSaved = true;
        if (savedContact.aboutBody !== aboutBody) setSaved = true;
        if (savedContact.thanksResume !== thanksResume) setSaved = true;
        if (savedContact.thanksService !== thanksService) setSaved = true;

        setSaveLinks(setSaved);
    }, [savedContact, FPBannerText, aboutHeading, aboutBody, thanksResume, thanksService]);

    function getSiteLinks() {
        fetch("/api/siteSetup/getSiteLiterature")
            .then((res) => res.json())
            .then((data) => {
                if (data.FPBannerText) setFPBannerText(data.FPBannerText);
                if (data.aboutHeading) setAboutHeading(data.aboutHeading);
                if (data.aboutBody) setAboutBody(data.aboutBody);
                if (data.thanksResume) setThanksResume(data.thanksResume);
                if (data.thanksService) setThanksService(data.thanksService);
                setSavedContact(data);
            });
    }

    function saveContacts() {
        fetch("/api/siteSetup/postSiteContent", {
            method: "POST",
            body: JSON.stringify({
                FPBannerText: FPBannerText,
                aboutHeading: aboutHeading,
                aboutBody: aboutBody,
                thanksResume: thanksResume,
                thanksService: thanksService,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                getSiteLinks();
                setSaveLinks(false);
            });
    }

    return (
        <OutlinedSurface label="Site Literature">
            <div className="flex flex-col gap-4">
                <LabeledtextArea id="fpBanner" label="Front Page Banner Text" value={FPBannerText} callback={setFPBannerText} />
                <LabeledtextArea id="fpBanner" label="Front Page About Heading" value={aboutHeading} callback={setAboutHeading} />
                <LabeledtextArea id="fpBanner" label="Front Page About Body" value={aboutBody} callback={setAboutBody} />
                <LabeledtextArea id="fpBanner" label="Thanks your Resume Message" value={thanksResume} callback={setThanksResume} />
                <LabeledtextArea id="fpBanner" label="Thanks you Service Message" value={thanksService} callback={setThanksService} />

                <div className="flex justify-center">{saveLinks ? <IconButton text="Save Updates" callback={() => saveContacts()} icon={<></>} /> : <></>}</div>
            </div>
        </OutlinedSurface>
    );
}

export default contactInfo;
