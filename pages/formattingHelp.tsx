import ParseMarkdown from "./../lib/parseMarkdown";
import React, { useState } from "react";
import LabeledtextArea from "../components/labeledTextArea";
import { PublicHOC } from "../components/publicData";
import Banner from "../components/banner";
import prisma from "../lib/prismaPool";
import Link from "next/link";
import OutlinedSurface from "../components/outlinedSurface";

const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

export async function getStaticProps() {
    const data = await prisma.sitesetup.findMany({});
    return {
        props: {
            data: data,
        },
        // revalidate: 10,
    };
}

function FormattingHelp() {
    const [text, setText] = useState(rawtext);

    return (
        <div className="p-6 flex flex-col gap-4">
            <LabeledtextArea id="fpBanner" label="Enter Test Text Here" value={text} callback={setText} />

            <OutlinedSurface label="Light Section">
                {" "}
                <ParseMarkdown text={text} />{" "}
            </OutlinedSurface>

            <OutlinedSurface dark={true} label="Dark Section">
                {" "}
                <ParseMarkdown dark={true} text={text} />{" "}
            </OutlinedSurface>

            <Link href="/">Return Home</Link>
        </div>
    );
}

export default function Main(p) {
    return (
        <PublicHOC {...p}>
            <Banner>
                <div className={largeTextStyling}>Text Formating: Guide by example</div>
            </Banner>

            <FormattingHelp {...p} />
        </PublicHOC>
    );
}

const rawtext = `### hi
## hi
# hi
*b Lorem Ipsum *b *i is simply  dummy text of the printing *i and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

--- Point one
--- point two
#--- Important point
##--- A different point
###--- Again

*Q Quote from a very important person!*Q
![text](911s_logo.png)
[Link to external site](https://gstreet.dev)
[Link to home page](/)
[Link to Quote page](/quote)
 `;
