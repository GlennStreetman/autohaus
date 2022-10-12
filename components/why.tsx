import React, { useContext } from "react";
import Image from "next/image";
import LineLinkButton from "./lineLinkButton";
import { SiPorsche } from "react-icons/si";
import { PublicContext } from "../components/publicData";
import ParseMarkdown from "./../lib/parseMarkdown";

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const dataLeft = "p-2  col-span-12 md:col-span-12 lg:col-span-10"; //2x

function Why() {
    const publicData = useContext(PublicContext);

    return (
        <div className="flex flex-col bg-primary">
            <div className="grid justify-items-center w-screen p-3">
                {publicData.aboutHeading && publicData.aboutHeading !== '' ? <div className="text-3xl font-bold text-center">
                    <ParseMarkdown text={publicData.aboutHeading} />
                </div> : <></>}
            </div>
            <div className="grid grid-cols-12">
                <div className={gutter} />
                <div className={dataLeft}>
                    {/* <div className={imgBox}>
                        <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.aboutImage}`} layout="fill" objectFit="fill" />
                    </div> */}
                    <div className="p-2">
                        <ParseMarkdown text={publicData.aboutBody} />
                    </div>
                    <br />
                </div>
                <div className={gutter} />
            </div>
        </div>
    );
}

export default Why;
