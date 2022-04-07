import Head from "next/head";
import Image from "next/image";
import Topper from "../components/topper";

{
    /* <Image src="/mockLogo.png" layout="responsive" width="200" height="200" /> */
}

export default function Home() {
    return (
        <div className="min-h-screen ">
            <Topper />
            {/* BANNER */}
            <div className="-z-2 w-full   relative">
                {/* <div className="relative"> */}
                <img
                    src="/orangeCar.jpg"
                    alt="orange porche"
                    className="-z-2 w-full h-96"

                    // width="3253"
                    // height="2440"
                    // layout="fill"
                    // objectFit="cover"
                    // quality={100}
                />
                {/* </div> */}
            </div>
            {/* /BANNER */}
            <main></main>

            <footer></footer>
        </div>
    );
}
