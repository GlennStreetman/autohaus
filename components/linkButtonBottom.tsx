import Link from "next/link";
import { useRouter } from "next/router";

interface props {
    text: string;
    link: string;
    icon?: JSX.Element; //svg icon?
    newtab?: boolean;
}


const textRegular =
    `flex flex-row shrink p-2 bg-transparent gap-1  
    text-base text-white hover:text-primary font-heading  subpixel-antialiased tracking-wider
    relative
    inline-block
    transition-all
    duration-500
    before:content-[''] 
    before:absolute 
    before:-bottom-2
    before:left-1/2
    before:-translate-x-1/2
    before:w-0 
    before:left-0 
    before:h-1 
    before:rounded-full 
    before:opacity-0 
    before:transition-all 
    before:duration-500 
    before:bg-gradient-to-r
    before:from-red-500
    before:via-red-200
    before:to-red-500
    hover:before:w-full
    hover:before:opacity-100
    hover:before:bottom-0
    shrink m-auto
    `;

const textAtLocation =
    `flex flex-row shrink p-2 bg-transparent gap-1  
    text-base text-white  font-heading  subpixel-antialiased tracking-wider
    relative
    inline-block
    shrink m-auto
    underline
    decoration-white
    decoration-2
    underline-offset-2
    `;

export function NextLinkButtonBottom(p: props) {

    const router = useRouter();
    const path = router.pathname;

    if (path !== p.link) {
        return (

            <div className="my-auto">
                <div className="flex z-20">
                    <Link href={p.link}>
                        <a target={p.newtab === true ? "_blank" : '_self'} className={textRegular}>
                            {p.icon ? p.icon : <></>}
                            <div className="flex">
                                <div className="shrink m-auto">{p.text}</div>
                            </div>
                        </a>
                    </Link>
                    <div className="flex grow" />
                </div>
            </div>
        );
    } else {
        return (
            <div className="my-auto text-white">
                <div className="flex z-20">
                    {p.icon ? p.icon : <></>}
                    <div className={`flex ${textAtLocation}`}>
                        <div className="shrink m-auto">{p.text}</div>
                    </div>
                    <div className="flex grow" />
                </div>
            </div>
        )
    }
}

function LinkButtonBottom(p: props) {
    return (

        <div className="my-auto">
            <div className="flex z-20">
                <a target={p.newtab === true ? "_blank" : '_self'} href={p.link} className={textRegular}>
                    {p.icon ? p.icon : <></>}
                    <div className="flex">
                        <div className="shrink m-auto">{p.text}</div>
                    </div>
                </a>
                <div className="flex grow" />
            </div>
        </div>
    );
}

export default LinkButtonBottom;
