import ParseMarkdown from "../lib/parseMarkdown";
import {introPayload} from "../strapiAPI/getIntro"


interface props {
    intro: introPayload
}

function Intro(p: props) {

    return (
        <div className='bg-white p-4'>
            <div className='mx-2 lg:mx-auto lg:w-3/5 text-center '>
                <div className="font-body text-2xl font-bold">
                    <ParseMarkdown text={p.intro.heading}/>
                </div>
                <div className="font-body text-sm text-center mx-auto">
                    <ParseMarkdown text= {p.intro.textBody}/>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Intro;

