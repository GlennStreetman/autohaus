import Banner from "../components/banner";
import Why from "../components/why";
import React, { useContext } from "react";
import { PublicData } from "../components/publicData";

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4  text-white p-2 whitespace-pre-line"; //1x

export async function getStaticProps() {
    return {
        props: {},
    };
}

function Thankyou() {
    const publicData = useContext(PublicData);
    return (
        <>
            <Banner>
                <></>
            </Banner>
            <div className="grid grid-row grid-cols-12 p-1 bg-black">
                <div className={gutter}></div>
                <div className={body}>{publicData.thanksService}</div>
                <div className={gutter}></div>
            </div>
            <Why />
        </>
    );
}

export default Thankyou;
