import React from "react";
import Image from "next/image";

function why() {
    return (
        <div className="flex flex-col">
            <div className="grid justify-items-center w-screen p-3">
                <div>Santa Monica's Porsche Experts</div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-2" />
                <div className="col-span-4">
                    <Image src="/stockPhoto.jpg" height="200" width="200" />
                </div>
                <div className="col-span-4">
                    <div>Why go with us?</div>
                    <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galle
                    </div>
                    <div>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point
                        of using Lorem Ipsum is that it has a more-or-less normal distribution
                    </div>
                </div>
                <div className="col-span-2" />
            </div>
        </div>
    );
}

export default why;
