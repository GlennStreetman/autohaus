import Image from "next/image";
import Logo from "./logo";

//     // example styling
//     // const smallTextStyling = `font-heading bold text-1xl sm:text-2xl lg:text-3xl`;
//     // const largeTextStyling = `font-heading bold text-3xl sm:text-4xl lg:text-6xl3`;

interface props {
    children?: JSX.Element;
}

function banner(p: props) {
    const logoBox = "col-span-12"; //1x
    const textBox = "col-span-12 relative "; //1x
    const height = `w-full h-auto grid grid-cols-12 relative`;

    const bannerImage = <Image src="/shrink2.png" alt="orange porche" layout="fill" objectFit="cover" priority />;

    return (
        <div className={height}>
            {bannerImage}
            <div className="flex flex-col col-span-12 p-2">
                <div className={logoBox}>
                    <Logo />
                </div>
                <div className={textBox}>
                    <div className="flex flex-row w-full gap-2">
                        <div className="flex grow" />
                        <div className="flex p-2 rounded-md gap-2 bg-slate-500/50 justify-end">{p.children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default banner;
