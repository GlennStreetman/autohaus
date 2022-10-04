import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Lato&family=Righteous&family=Roboto&family=Roboto+Condensed&family=Saira+Stencil+One&display=swap" rel="stylesheet"></link>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                    `,
                    }}
                />
            </body>
        </Html>
    );
}


    /* 

<link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto:wght@100&family=Saira+Stencil+One&display=swap" rel="stylesheet" /> */
// }
// <link
// href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto&family=Roboto+Condensed&family=Saira+Stencil+One&display=swap"
// rel="stylesheet"
// />


