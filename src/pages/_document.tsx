import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="/fonts/font-awesome/css/font-awesome.css"
                />
                <link rel="stylesheet" href="/fonts/emotion/style.css" />
                <link
                    rel="stylesheet"
                    href="/lib/bootstrap/bootstrap.min.css"
                />
                <link href="/css/style.css" rel="stylesheet" />

                {/* JAVA SCRIPT */}
                {/* require */}
                {/*  */}
                {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
                {/*[if lt IE 9]>
	
                <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js" />
	            <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"/>
	            <![endif]*/}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
