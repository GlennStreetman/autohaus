import DOMPurify from "isomorphic-dompurify";

interface props {
    text: string;
}

function parseMarkdown(p: props) {
    const text = p.text
        .replace(/^### (.*$)/gim, "<h3>$1</h3>") //three hashes
        .replace(/^## (.*$)/gim, "<h2>$1</h2>") //two hashes
        .replace(/^# (.*$)/gim, "<h1>$1</h1>") //1 hash
        .replace(/^###--- (.*$)/gim, "<h3>&#x2022 $1</h3>") //three hashes Bullet point
        .replace(/^##--- (.*$)/gim, "<h2>&#x2022 $1</h2>") //two hashes Bullet point
        .replace(/^#--- (.*$)/gim, "<h1>&#x2022 $1</h1>") //1 hash Bullet point
        .replace(/^--- (.*$)/gim, "&#x2022 $1") //--- sets bullet point at start of line
        .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>") // >
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // between two **
        .replace(/\*(.*)\*/gim, "<i>$1</i>") //between one *
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />") // ![text](link)
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>"); // [text](link)
    // .replace(/\n$/gim, "<br />"); // \n is newline

    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(text),
    });
    //@ts-ignore
    const cleanHTML = <div dangerouslySetInnerHTML={sanitizedData()} />;
    return cleanHTML;
}

export default parseMarkdown;
