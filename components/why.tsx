import React, { useContext } from "react";
import Image from "next/image";
import LineLinkButton from "./lineLinkButton";
import { SiPorsche } from "react-icons/si";
import { PublicContext } from "../components/publicData";

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const dataLeft = "p-2  col-span-12 md:col-span-12 lg:col-span-10"; //2x
const imgBox = "relative rounded-md bg-black overflow-hidden h-40 w-40 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-left m-2 ";

function why() {
    const publicData = useContext(PublicContext);

    const myLoader = () => {
        return `${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.bannerImage}`;
    };

    return (
        <div className="flex flex-col">
            <div className="grid justify-items-center w-screen p-3">
                <div className="text-3xl font-bold">{publicData.aboutHeading}</div>
            </div>
            <div className="grid grid-cols-12">
                <div className={gutter} />
                <div className={dataLeft}>
                    <div className={imgBox}>
                        <Image loader={myLoader} src="decorationImage" layout="fill" objectFit="fill" />
                    </div>
                    <div className="whitespace-pre-line">{publicData.aboutBody}</div>
                    <br />

                    <LineLinkButton text={"Meet the team"} icon={<SiPorsche className="h-7 w-7" />} link="/team" />
                </div>
                <div className={gutter} />
            </div>
        </div>
    );
}

export default why;
