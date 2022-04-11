import Image from "next/image";

function BannerBody() {
    const smallTextStyling = `font-heading bold text-1xl sm:text-2xl lg:text-3xl`;
    const largeTextStyling = `font-heading bold text-3xl sm:text-4xl lg:text-6xl3`;

    return (
        // create banner-bold & banner font classes
        <div className="absolute bottom-2 right-2 flex p-2 rounded-md flex-col gap-2 bg-slate-500/50 justify-end">
            <div className={largeTextStyling}>Auto Haus is now open for business!</div>
            <div className={smallTextStyling}>Located just off the 10, close to the Santa Monica Airport.</div>
            <div className={smallTextStyling}>Santa Monica's Porsche repair and restoration specialists.</div>
            <div className={smallTextStyling}> New, vintage, exotic, racing, if it's a Porsche, we can fix it.</div>
            <div className={smallTextStyling}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
        </div>
    );
}

const left = "col-span-0   md:col-span-2 lg:col-span-2  xl:col-span-2  2xl:col-span-4"; //1x
const right = "col-span-12 md:col-span-10 lg:col-span-10 xl:col-span-10 2xl:col-span-8 relative"; //1x
const height = "h-128 w-full  grid grid-cols-12 relative";

function banner() {
    const bannerImage = <Image src="/shrink2.png" alt="orange porche" layout="fill" objectFit="cover" width="100vw" height="32rem" />;

    return (
        <div className={height}>
            {bannerImage}
            <div className={left}></div>
            <div className={right}>
                <BannerBody />
            </div>
        </div>
    );
}

export default banner;
