import Topper from "../components/topper";
import Logo from "../components/logo";

{
    /* <Image src="/mockLogo.png" layout="responsive" width="200" height="200" /> */
}

export default function Home() {
    return (
        <div className="min-h-screen relative">
            <Logo />
            <Topper />
            {/* BANNER */}
            <div className="-z-2 w-full h-128 relative">
                {/* <div className="relative"> */}
                <img
                    src="/shrink2.png"
                    alt="orange porche"
                    className="-z-2 w-full h-128 opacity-60"

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
