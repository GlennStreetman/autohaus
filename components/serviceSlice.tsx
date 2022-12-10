
import Image from "next/image";
import MapChecklist from './MapChecklist'
import { serviceDetailPayload } from "../strapiAPI/getServiceDetail"


interface props {
    slice: serviceDetailPayload
}

function ServiceSlice(p: props) {

    // const sliceImage =
    //     <div className='col-span-12 lg:col-span-6'>
    //         <div className='relative h-[150px] lg:h-[250px] xl:h-[300px]  w-[300px] lg:w-[500px] xl:w-[600px] mx-auto my-3 lg:my-0'>
    //             {p?.slice?.sectionImage?.url ?
    //                 <Image
    //                     src={p.slice.sectionImage.url}
    //                     alt={p.slice.sectionImage.alternativeText}
    //                     layout="fill"
    //                     objectFit="fill"
    //                 /> : <></>}
    //         </div>
    //     </div>

    const sliceText =
        <div>
            <div className="sectionHeading mb-5 lg:mx-0 text-left">
                {p?.slice?.sectionHeader || ''}
            </div>
            <div>
                {p.slice.sectionText}
            </div>
            <div className="font-body text-sm text-center mx-auto lg:mx-0">
                <MapChecklist checklist={p.slice.sectionChecklist} />
            </div>
        </div>

    return (
        <div className='pb-4'>
            {sliceText}
            {/* {p?.slice?.sectionImage?.url ? sliceImage : <></>} */}
        </div>
    );
}

export default ServiceSlice;


