import { useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { BiUpload } from "react-icons/bi";

interface props {
    fileName: string;
    fileTypes: string[];
    fileNameCallback: Function;
    refCallback: Function;
    readyCallback: Function;
}

function fileUploadDragBox(p: props) {
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
            return { upload: false, msg: `<-- Drop picture here or Click-->` };
        }
    }

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
            <input type="file" className="hidden" ref={inputReference} onChange={selectFile} />
            <div className="flex justify-center">
                {p.fileName === "" ? <BiUpload className="h-7 w-7" /> : <></>}
                {p.fileName !== "" && checkFileName().upload === true ? <AiFillCheckCircle className="h-7 w-7 text-emerald-500" /> : <></>}
                {p.fileName !== "" && checkFileName().upload === false ? <HiOutlineEmojiSad className="h-7 w-7 text-red-500" /> : <></>}
            </div>
            <div className="flex justify-center">{checkFileName().msg}</div>
        </div>
    );
}

export default fileUploadDragBox;
