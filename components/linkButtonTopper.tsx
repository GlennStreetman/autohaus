import Link from "next/link";
import { useRouter } from "next/router";

interface props {
    text: string | Element | JSX.Element;
    link: string;
    icon?: JSX.Element; //svg icon?
    newtab?: boolean;
}


const textRegular =
    `flex flex-row shrink p-2 bg-transparent gap-1  
    text-base text-white hover:text-gray-300 font-heading  subpixel-antialiased 
    shrink m-auto
    `;

const textAtLocation =
    `flex flex-row shrink p-2 bg-transparent gap-1  
    text-base text-white font-heading  subpixel-antialiased 
    shrink m-auto
    underline underline-offset-1
    `;

export function NextLinkButtonTopper(p: props) {

    const router = useRouter();
    const path = router.pathname;
    
    if (path !== p.link) {
    return (
        <div className="my-auto">
            <div className="flex z-20">
                <Link href={p.link}>
                <a target={p.newtab === true ? "_blank" : '_self'}  className={textRegular}>
                    {p.icon ? p.icon : <></>}
                    <div className="flex">
                        <div className="shrink m-auto tracking-wide">{p.text}</div>
                    </div>
                </a>
                </Link>
                <div className="flex grow" />
            </div>
        </div>
    )} else {
        return (
            <div className="my-auto text-white">
            <div className="flex z-20">
                    {p.icon ? p.icon : <></>}
                    <div className={`flex ${textAtLocation}`} >
                        <div className="shrink m-auto tracking-wide">{p.text}</div>
                    </div>
                <div className="flex grow" />
            </div>
        </div>
        );
}
}

function LinkButtonTopper(p: props) {

    return (

        <div className="my-auto">
            <div className="flex z-20">
                <a target={p.newtab === true ? "_blank" : '_self'} href={p.link} className={textRegular}>
                    {p.icon ? p.icon : <></>}
                    <div className="flex">
                        <div className="shrink m-auto tracking-wide">{p.text}</div>
                    </div>
                </a>
                <div className="flex grow" />
            </div>
        </div>
    );
}

export default LinkButtonTopper;
