import Image from "next/image";
import { imagePayload} from "../strapiAPI/getPublicImages"

interface props {
    images: imagePayload,
    children?: JSX.Element;
}

function Banner(p: props) {

    const bannerImage = p?.images?.banner ? 
        <Image src={p.images.banner} alt="site banner" layout="fill" objectFit="cover" priority /> : <></>

    return (
        <div className='flex w-full min-h-[400px] relative'>
            {bannerImage}
            {p.children ? (
                <div className="flex  w-full z-10">
                    {p.children}
                </div>
            ) : (
                <></>
            )}

        </div>
    );
}

export default Banner;
