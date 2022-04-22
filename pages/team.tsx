import React from "react";
import Image from "next/image";

import Banner from "../components/banner";

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const gutterBlack = " hidden lg:block lg:col-span-1 bg-black"; //2x
const employees = "p-2 col-span-12 md:col-span-12 lg:col-span-10"; //1x
const employeesBlack = "p-2 col-span-12 md:col-span-12 lg:col-span-10 bg-black text-white"; //1x
const imgBoxLeft = "relative rounded-md bg-black overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-left m-2 ";
const imgBoxRight = "relative rounded-md bg-black overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-right m-2 ";
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

interface props {
    children: JSX.Element;
    image: string;
    black: boolean;
    name: string;
    title: string;
}

function EmployeeBlock(p: props) {
    return (
        <section>
            <div className="grid grid-cols-12">
                <div className={!p.black ? gutter : gutterBlack} />
                <div className={!p.black ? employees : employeesBlack}>
                    <div className={!p.black ? imgBoxLeft : imgBoxRight}>
                        <Image src={p.image} layout="fill" objectFit="fill" priority />
                    </div>
                    <div className="text-3xl font-bold">{`${p.name}: ${p.title}`}</div>
                    {p.children}
                </div>
                <div className={!p.black ? gutter : gutterBlack} />
            </div>
        </section>
    );
}

function why() {
    return (
        <>
            <Banner>
                <div className={largeTextStyling}>Meet the Auto Haus Team</div>
            </Banner>
            <div className="flex flex-col">
                {/* <div className="grid justify-items-center w-screen p-3 bg-black text-white">
                    <div className="text-3xl font-bold">Meet the Auto Haus Team</div>
                </div> */}
                {/* <div className="grid grid-cols-12"> */}
                <EmployeeBlock image="/gulfOil.jpg" black={false} name="Jim Kresky" title="Master Mechanic">
                    {jim}
                </EmployeeBlock>
                <EmployeeBlock image="/gulfOil.jpg" black={true} name="Lana Cain" title="Spy">
                    {lana}
                </EmployeeBlock>
                {/* </div> */}
            </div>
        </>
    );
}

export default why;

const jim = (
    <>
        <p>
            20 years experience working with all makes and models is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galle
        </p>
        <br />
        <p>
            What a totaly G. rvice dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galle
        </p>
        <br />
        <p>
            this guy fixes thingsext of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galle
        </p>
        <br />
        <p>
            this guy fixes thingsext of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galle
        </p>
        <br />
        <p>
            this guy fixes thingsext of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galle
        </p>
        <br />
    </>
);

const lana = (
    <>
        {" "}
        <p>
            She makes the deal h all makes and models is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galle
        </p>
        <br />
        <p>
            Killer for hire rvice dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galle
        </p>
        <br />
        <p>
            She gets it done of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galle
        </p>
        <br />
        <p>
            Much wow thingsext of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galle
        </p>
        <br />
        <p>
            Laurum ipsum thingsext of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galle
        </p>
        <br />
    </>
);
