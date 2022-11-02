import ParseMarkdown from "./../lib/parseMarkdown";
import {siteText} from "../strapiAPI/getSiteText"


//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const dataLeft = "col-span-12 md:col-span-12 lg:col-span-10"; //2x

interface props {
    siteText: siteText
}

function Why(p: props) {

    return (
        <div className="flex flex-col bg-primary pt-3">
            <div className="grid justify-items-center w-screen">
                {p?.siteText?.aboutHeading && p.siteText.aboutHeading !== '' ? <div className="text-3xl font-bold text-center">
                    <ParseMarkdown text={p.siteText.aboutHeading} />
                </div> : <></>}
            </div>
            <div className="grid grid-cols-12">
                <div className={gutter} />
                <div className={dataLeft}>
                    <div >
                        {p?.siteText?.aboutBody ? <ParseMarkdown text={p.siteText.aboutBody} /> : <></>}
                    </div>
                    <br />
                </div>
                <div className={gutter} />
            </div>
        </div>
    );
}

export default Why;
