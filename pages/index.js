import Head from "next/head";
import Image from "next/image";
import Topper from "../components/topper";

{
    /* <Image src="/mockLogo.png" layout="responsive" width="200" height="200" /> */
}

export default function Home() {
    return (
        <div>
            <Topper />
            <main></main>

            <footer></footer>
        </div>
    );
}
