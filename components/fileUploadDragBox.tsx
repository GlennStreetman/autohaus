import { useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { BiUpload } from "react-icons/bi";
import Image from "next/image";

interface props {
    fileName: string;
    fileTypes: string[];
    fileNameCallback: Function;
    refCallback: Function;
    readyCallback: Function;
    backgroundImage?: String;
}

function FileUploadDragBox(p: props) {
    const inputReference = useRef<HTMLInputElement>(null);

    function selectFile(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", e.target.files[0]);
        p.refCallback(data);
        p.fileNameCallback(e.target.files[0].name);
    }

    function fileUploadAction() {
        if (inputReference.current !== null) inputReference.current.click();
    }

    function dropHandler(ev) {
        console.log("File(s) dropped");
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            if (ev.dataTransfer.items[0].kind === "file") {
                var file = ev.dataTransfer.items[0].getAsFile();
                const data = new FormData();
                data.append("file", file);
                p.refCallback(data);
                p.fileNameCallback(file.name);
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            const data = new FormData();
            data.append("file", ev.dataTransfer.files[0]);
            p.refCallback(data);
            p.fileNameCallback(ev.dataTransfer.files[0].name);
            console.log("... file[" + 0 + "].name = " + ev.dataTransfer.files[0].name);
        }
    }

    function checkFileName() {
        if (p.fileName !== "" && p.fileTypes.includes(p.fileName.split(".").pop())) {
            p.readyCallback(true);
            return { upload: true, msg: `Ready to submit: ${p.fileName}` };
        } else if (p.fileName !== "" && !p.fileTypes.includes(p.fileName.split(".").pop())) {
            return { upload: false, msg: `Please submit a file type ending in ${p.fileTypes.join(", ")}` };
        } else {
            return { upload: false, msg: `<-- Drop file here or Click-->` };
        }
    }

    const formatText = p.backgroundImage
        ? "flex justify-center text-white font-heading bold text-1xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased z-10"
        : "flex justify-center z-10";

    return (
        <div
            id="drop_zone"
            className="col-span-12 border-2 p-2 relative bg-slate-100 cursor-pointer h-32 flex flex-col place-content-center mb-4"
            onClick={fileUploadAction}
            onDrop={dropHandler}
            onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            {p.backgroundImage ? (
                <div>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${p.backgroundImage}`}
                        alt="bannerImage"
                        layout="fill"
                        objectFit="fill"
                        priority
                    />
                </div>
            ) : (
                <></>
            )}
            <input type="file" className="hidden" ref={inputReference} onChange={selectFile} />
            <div className="flex justify-center ">
                {p.fileName === "" ? <BiUpload className={p.backgroundImage ? "h-7 w-7 z-10 text-red-500" : "h-7 w-7 z-10"} /> : <></>}
                {p.fileName !== "" && checkFileName().upload === true ? <AiFillCheckCircle className="z-10 h-7 w-7 text-emerald-500" /> : <></>}
                {p.fileName !== "" && checkFileName().upload === false ? <HiOutlineEmojiSad className="z-10 h-7 w-7 text-red-500" /> : <></>}
            </div>
            <div className={formatText}>{checkFileName().msg}</div>
        </div>
    );
}

export default FileUploadDragBox;
