import '@/styles/globals.scss';
import App, { AppProps, AppContext } from 'next/app';
import Header from './components/Header';
import Head from 'next/head';
import Footer from './components/Footer';
import { useEffect, useMemo, useState } from 'react';
import es6Promise from 'es6-promise';
// import NProgress from '@types/nprogress';
// import 'nprogress/nprogress.css';

import { decodeJWT, getTokenSSRAndCSR } from '../../helpers';
import userService from '../../servies/userService';
import { useGlobalState } from '../../state';
import postServices from '../../servies/postService';

es6Promise.polyfill();
export default function MyApp({ Component, pageProps, router }: AppProps) {
    const pathname = router.pathname;
    const [currentUser, setCurrentUser] = useGlobalState('currentUser');
    const [, setToken] = useGlobalState('token');
    const [, setCategories] = useGlobalState('categories');
    const [loading, setLoading] = useState(false);
    // console.log('My App run: CurrentUser', currentUser);

    useMemo(() => {
        setCurrentUser(pageProps.userInfo);
        setToken(pageProps.token);
        setCategories(pageProps.categories);
        // console.log('Run only 1 step in Server. pageProps: ', pageProps);
    }, []);

    useEffect(() => {
        router.events.on('routeChangeStart', (url) => {
            console.log('routeChangeStart', url);
            // setLoading(true);
            // NProgress.start();
        });

        router.events.on('routeChangeComplete', (url) => {
            console.log('routeChangeComplete', url);
            // setLoading(false);
            // NProgress.done();
        });

        router.events.on('routeChangeError', (err, url) => {
            console.log('routeChangeError', url);
        });
        return () => {};
    }, []);

    const hiddenFooter = useMemo(() => {
        const exclude = ['/'];
        const currentRoute = pathname;
        return exclude.indexOf(currentRoute) !== -1;
    }, [pathname]);

    const hiddenHeader = useMemo(() => {
        const exclude = ['/login', '/register'];
        const currentRoute = pathname;
        return exclude.indexOf(currentRoute) !== -1;
    }, [pathname]);

    return (
        <div id="root">
            <Head>
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=UTF-8"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1, maximum-scale=1"
                />
                <meta name="keywords" content="HTML5 Template" />
                <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
                <meta name="author" content="etheme.com" />
                <title>Title Default</title>
            </Head>
            {!hiddenHeader && <Header />}
            <main>
                <Component {...pageProps} />
            </main>
            {!hiddenFooter && <Footer />}
            {/* {loading && (
                <div className="loading-page">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="200px"
                        height="200px"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                    >
                        <g transform="translate(50 50)">
                            <g transform="rotate(13.1508)">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    values="0;45"
                                    keyTimes="0;1"
                                    dur="0.2s"
                                    repeatCount="indefinite"
                                />
                                <path
                                    d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20"
                                    fill="#e15b64"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
            )} */}
        </div>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    let userPos = null,
        categoriesPos = null;
    const [token, userToken] = getTokenSSRAndCSR(appContext.ctx);

    // console.log('Run all Client and Server');
    if (typeof window === 'undefined' && userToken) {
        // SSR
        // console.log('Run only Server');
        if (userToken?.id && userToken?.email) {
            userPos = userService.getUserById(userToken.id);
        }
        categoriesPos = postServices.getCategories();
        // console.log(userRes);
    }
    const [userRes, categoriesRes]: any = await Promise.all([
        userPos,
        categoriesPos,
    ]);
    // console.log('token: ', token);
    // console.log('userToken: ', userToken);
    return {
        pageProps: {
            ...appProps.pageProps,
            token,
            userInfo: userRes?.user || null,
            categories: categoriesRes?.categories || [],
        },
    };
};
