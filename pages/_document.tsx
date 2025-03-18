import { Head, Html, Main, NextScript } from 'next/document';
const roboto = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="application-name" content="SBN | Salaire brut en net" />
                <meta name="description" content="Une application servant à convertir les taux brut-net" />
                <link rel="stylesheet" href={roboto} />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/logo.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}