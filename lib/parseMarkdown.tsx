import DOMPurify from "isomorphic-dompurify";
import styles from "./parseMarkdown.module.css";

interface props {
    text: string;
    dark?: boolean;
}

function parseMarkdown(p: props) {
    const text = p.text
        ? p.text
              .replace(/^### (.*$)/gim, "<h3>$1</h3>") //three hashes
              .replace(/^## (.*$)/gim, "<h2>$1</h2>") //two hashes
              .replace(/^# (.*$)/gim, "<h1>$1</h1>") //1 hash
              .replace(/^###--- (.*$)/gim, "<h3>&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp $1</h3>") //three hashes Bullet point
              .replace(/^##--- (.*$)/gim, "<h2>&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp $1</h2>") //two hashes Bullet point
              .replace(/^#--- (.*$)/gim, "<h1>&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp $1</h1>") //1 hash Bullet point
              .replace(/^--- (.*$)/gim, "&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp $1") //--- sets bullet point at start of line
              .replace(/\*Q(.*)\*Q/gim, "<blockquote>$1</blockquote>") // between *Q
              .replace(/\*B(.*)\*B/gim, "<b>$1</b>") // between *B
              .replace(/\*I(.*)\*I/gim, "<i>$1</i>") //between  *I
              .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />") // ![text](link)
              .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") // [text](link)
        : p.text;
    // .replace(/\n$/gim, "<br />"); // \n is newline

    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(text),
    });

    const cleanHTML = (
        <div className={p.dark === true ? "dark" : ""}>
            <article className={styles.article} dangerouslySetInnerHTML={sanitizedData()} />
        </div>
    );
    return cleanHTML;
}

export default parseMarkdown;
