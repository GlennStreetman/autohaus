import ParseMarkdown from "./../lib/parseMarkdown";
import { whyPayload} from "../strapiAPI/getWhyChecklist"
import {IoIosCheckmarkCircleOutline} from 'react-icons/io'
import Image from "next/image";

interface props {
    why: whyPayload
}

function Why(p: props) {

    let mapChecklist = p.why.checkList.map((el, indx)=>{
        return(<li className='mb-1 ml-4' key={`${indx}${el.whyItem.slice(0,10)}`}>
            <div className='flex gap-2'>
                <IoIosCheckmarkCircleOutline className="h-5 w-5 shrink" />
                <ParseMarkdown text={el.whyItem} />
            </div>
        </li>)
    })

    return (
        <div className='bg-white p-4'>
            <div className='grid grid-cols-12 mx-2 lg:mx-auto lg:w-3/5 text-center relative '>
                <div className='col-span-12 lg:col-span-6 '>
                    <div className="sectionHeading mb-5 lg:mx-0 text-left">
                        {p.why.heading}
                    </div>
                    <div className="font-body text-sm text-center mx-auto lg:mx-0">
                        <ul>{mapChecklist}</ul>
                    </div>
                </div>
                <div className='grow col-span-12 lg:col-span-6 '>
                    <div className='relative h-[300px] w-[600px] mx-auto my-3 lg:my-0'>
                        <Image
                            src={p.why.picture}
                            alt={`Our Services`}
                            layout="fill"
                            objectFit="fill"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Why;


