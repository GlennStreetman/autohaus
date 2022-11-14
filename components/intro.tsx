import ParseMarkdown from "../lib/parseMarkdown";
import NextLinkButton from '../components/nextLinkButton'
import { introPayload } from "../strapiAPI/getIntro"
import { serviceHomePayload } from "../strapiAPI/getServiceHome"

interface props {
    heading: string;
    body: string;
    link?: string;
    linkText?: string;
    override?: string;
}

function Intro(p: props) {

    return (
        <div className='bg-white p-4 pt-4'>
            <div className='lg:mx-auto lg:w-3/5'>
                <div className="font-body text-3xl font-bold mb-4">
                    <div className={p.override ? p.override : ''}>
                        {p?.heading || ''}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="font-body text-sm mx-auto mb-4">
                        <ParseMarkdown text={p?.body || ''} />
                    </div>
                    <div>
                        {p?.link ? <NextLinkButton text={p?.linkText || 'More'} link={p.link} icon={<></>} /> : <></>}
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;

