interface props {
    text: string;
    link: string;
    icon?: JSX.Element; //svg icon?
    highlight?: boolean;
    newtab?: boolean;
}

const textHighlight =
    "flex flex-row shrink border-2 hover:border-black p-2 rounded-md bg-slate-200 shadow-lg shadow-slate-600 hover:bg-strong active:bg-strong text-sm  gap-1 hover:text-accent text-red-600";
const textRegular =
    "flex flex-row shrink border-2 hover:border-black p-2 rounded-md bg-slate-200 shadow-sm shadow-slate-600 hover:bg-weak active:bg-strong text-sm gap-1 hover:text-accent";

function LinkButton(p: props) {
    return (
        <>
            {p.newtab === true ? (
                <div className="flex z-20">
                    <a target="_blank" href={p.link} className={p.highlight === true ? textHighlight : textRegular}>
                        {p.icon ? p.icon : <></>}
                        <div className="flex">
                            <div className="shrink m-auto">{p.text}</div>
                        </div>
                    </a>
                    <div className="flex grow" />
                </div>
            ) : (
                <div className="flex z-20">
                    <a href={p.link} className={p.highlight === true ? textHighlight : textRegular}>
                        {p.icon ? p.icon : <></>}
                        <div className="flex">
                            <div className="shrink m-auto">{p.text}</div>
                        </div>
                    </a>
                    <div className="flex grow" />
                </div>
            )}
        </>
    );
}

export default LinkButton;
