import Image from "next/image";
import Logo from "./logo";
import { imagePayload} from "../strapiAPI/getPublicImages"

interface props {
    images: imagePayload,
    children?: JSX.Element;
}

function Banner(p: props) {
    const height = `w-full h-auto grid grid-cols-12 relative`;

    const bannerImage = p?.images?.banner ? 
        <Image src={p.images.banner} alt="site banner" layout="fill" objectFit="cover" priority /> : <></>

    return (
        <div className={height}>
            {bannerImage}
            <div className="flex flex-col col-span-12 p-2">
                <Logo logo={p?.images?.logoImage ? p.images.logoImage : ''}/>
                <div className="h-14" />
                {p.children ? (
                    <div className="flex flex-row w-full absolute bottom-1">
                        <div className="grow" />
                        <div className="text-2xl lg:text-2xl  tracking-wider p-2  rounded-md gap-2">{p.children}</div>
                        <div className="grow" />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Banner;
