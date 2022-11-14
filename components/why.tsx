
import { whyPayload } from "../strapiAPI/getWhyChecklist"
import Image from "next/image";
import MapChecklist from '../components/MapChecklist'

interface props {
    why: whyPayload
}

function Why(p: props) {

    return (
        <div className='bg-white p-4'>
            <div className='grid grid-cols-12 mx-2 lg:mx-auto lg:w-3/5 text-center relative '>
                <div className='col-span-12 lg:col-span-6 p-2'>
                    <div className="sectionHeading mb-5 lg:mx-0 text-left">
                        {p.why.heading}
                    </div>
                    <div className="font-body text-sm text-center mx-auto lg:mx-0">
                        <MapChecklist checklist={p?.why?.checkList || []} />
                    </div>
                </div>
                <div className='grow col-span-12 lg:col-span-6 '>
                    <div className='relative h-[150px] lg:h-[250px] xl:h-[300px]  w-[300px] lg:w-[500px] xl:w-[600px] mx-auto my-3 lg:my-0'>
                        {p?.why?.picture ?
                            <Image
                                src={p?.why?.picture || ''}
                                alt={`Our Services`}
                                layout="fill"
                                objectFit="fill"
                            /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Why;


