import ParseMarkdown from "../lib/parseMarkdown";
import {introPayload} from "../strapiAPI/getIntro"


interface props {
    heading: string;
    body: string;
    override?: string;
}

function Intro(p: props) {

    return (
        <div className='bg-white p-4'>
            <div className='lg:mx-auto lg:w-3/5'>
                <div className="font-body text-3xl font-bold">
                    <div className={p.override ? p.override : ''}>
                        {p.heading}
                    </div>
                </div>
                <div className="font-body text-sm mx-auto">
                    <ParseMarkdown text= {p.body}/>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Intro;

