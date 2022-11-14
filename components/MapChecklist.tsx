import React from 'react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import ParseMarkdown from "./../lib/parseMarkdown";

interface props {
    checklist: string[]
}

function MapChecklist(p: props) {

    let mapChecklist = p.checklist.map((el, indx) => {
        return (<li className='mb-1 ml-4' key={`${indx}${el ? el.slice(0, 10) : ''} `}>
            <div className='flex gap-2'>
                <IoIosCheckmarkCircleOutline className="h-5 w-5 shrink" />
                <ParseMarkdown text={el} />
            </div>
        </li>)
    })

    return (
        <ul>{mapChecklist}</ul>
    )
}

export default MapChecklist