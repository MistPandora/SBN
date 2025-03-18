// filepath: c:\Users\killy\Desktop\Programmation\Mes Projets\SBN\src\app\_document.tsx
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/icons/logo.png" />
                    <meta name="theme-color" content="#0e152d" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;