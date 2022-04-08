import React from "react";
import Image from "next/image";

function BannerBody() {
    // const porsche = <SiPorsche className="h-7 w-7 text-primary hover:text-accent " />;

    return (
        // create banner-bold & banner font classes
        <div className="absolute bottom-2 right-2 flex p-2 rounded-md flex-col gap-2 bg-slate-500/50 justify-end">
            <div className="font-heading bold text-6xl ">Auto Haus is now open for business!</div>
            <div className="font-heading text-primary bold text-3xl">Located just off the 10, close to the Santa Monica Airport.</div>
            <div className="font-heading bold text-3xl">Santa Monica's Porsche repair and restoration specialists.</div>
            <div className="font-heading bold flex text-3xl"> New, vintage, exotic, racing, if it's a Porsche, we can fix it.</div>
            <div className="font-heading bold text-3xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
        </div>
    );
}

function banner() {
    // const bannerImage = <img src="./../shrink2.png" alt="orange porche" className="-z-20 w-full h-128 opacity-75 fixed" />;
    const bannerImage = <Image src="/shrink2.png" alt="orange porche" layout="fill" objectFit="cover" width="100vw" height="32rem" />;

    return (
        <div className="w-full h-128 relative">
            {bannerImage}
            <div className="grid grid-cols-12 h-128">
                <div className="col-span-5"></div>
                <div className="col-span-7 relative ">
                    <BannerBody />
                </div>
            </div>
        </div>
    );
}

export default banner;
