
import { whyPayload } from "../strapiAPI/getWhyChecklist"
import Image from "next/image";
import MapChecklist from './MapChecklist'
import ParseMarkdown from "../lib/parseMarkdown";
import { serviceDetailPayload } from "../strapiAPI/getServiceDetail"


interface props {
    slice: serviceDetailPayload
}

function ServiceSlice(p: props) {

    const columnLookup = {
        top: 'col-span-12',
        LeftTop: 'col-span-12 lg:col-span-6',
        RightTop: 'col-span-12 lg:col-span-6',
        bottom: 'col-span-12 lg:col-span-6',
        LeftBottom: 'col-span-12 lg:col-span-6',
        RightBottom: 'col-span-12 lg:col-span-6',
        Bottom: 'col-span-12'
    }



    const sliceImage =
        <div className={columnLookup[p.slice.imageLocation]}>
            <div className='relative h-[150px] lg:h-[250px] xl:h-[300px]  w-[300px] lg:w-[500px] xl:w-[600px] mx-auto my-3 lg:my-0'>
                {p?.slice?.sectionImage?.url ?
                    <Image
                        src={p.slice.sectionImage.url}
                        alt={p.slice.sectionImage.alternativeText}
                        layout="fill"
                        objectFit="fill"
                    /> : <></>}
            </div>
        </div>

    const sliceText =
        <div className={columnLookup[p.slice.imageLocation]}>
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
        <div className='grid grid-cols-12'>
            {sliceImage}
            {sliceText}
        </div>
    );
}

export default ServiceSlice;


