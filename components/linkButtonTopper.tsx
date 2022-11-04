import Link from "next/link";

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

function LinkButtonTopper(p: props) {
    return (

        <div className="my-auto">
            {p.newtab === true ? (
                <div className="flex z-20">
                    <Link href={p.link}>
                    <a target="_blank"  className={textRegular}>
                        {p.icon ? p.icon : <></>}
                        <div className="flex">
                            <div className="shrink m-auto tracking-wide">{p.text}</div>
                        </div>
                    </a>
                    </Link>
                    <div className="flex grow" />
                </div>
            ) : (
                <div className="flex z-20">
                    <Link href={p.link}>
                    <a href={p.link} className={textRegular}>
                        {p.icon ? p.icon : <></>}
                        <div className="flex">
                            <div className="shrink m-auto tracking-wide">{p.text}</div>
                        </div>
                    </a>
                    </Link>
                    <div className="flex grow" />
                </div>
            )}
        </div>
    );
}

export function NextLinkButtonTopper(p: props) {
    return (

        <div className="my-auto">
            {p.newtab === true ? (
                <div className="flex z-20">
                    <a target="_blank" href={p.link} className={textRegular}>
                        {p.icon ? p.icon : <></>}
                        <div className="flex">
                            <div className="shrink m-auto tracking-wide">{p.text}</div>
                        </div>
                    </a>
                    <div className="flex grow" />
                </div>
            ) : (
                <div className="flex z-20">
                    <a href={p.link} className={textRegular}>
                        {p.icon ? p.icon : <></>}
                        <div className="flex">
                            <div className="shrink m-auto tracking-wide">{p.text}</div>
                        </div>
                    </a>
                    <div className="flex grow" />
                </div>
            )}
        </div>
    );
}

export default LinkButtonTopper;
