import { useContext } from "react";
import Image from "next/image";
import Logo from "./logo";
import { PublicContext } from "../components/publicData";

interface props {
    children?: JSX.Element;
}

function Banner(p: props) {
    const publicData = useContext(PublicContext);
    const logoBox = "col-span-12"; //1x
    const textBox = "col-span-12 relative "; //1x
    const height = `w-full h-auto grid grid-cols-12 relative`;

    const myLoader = () => {
        return `${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.bannerImage}`;
    };

    const bannerImage = <Image loader={myLoader} src="banner" alt="site banner" layout="fill" objectFit="cover" priority />;

    return (
        <div className={height}>
            {bannerImage}
            <div className="flex flex-col col-span-12 p-2">
                <div className={logoBox}>
                    <Logo />
                </div>
                {p.children ? (
                    <div className={textBox}>
                        <div className="flex flex-row w-full gap-2">
                            <div className="flex grow" />
                            <div className="flex p-2 rounded-md gap-2 bg-slate-500/50 justify-end xl:mr-12 2xl:mr-24">{p.children}</div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Banner;
