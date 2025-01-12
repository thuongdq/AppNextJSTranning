import { NextPageContext } from 'next';
import * as cookie from 'cookie';
import Cookies from 'js-cookie';
import { decodeJWT } from './';
type userToken = {
    id: string;
    email: string;
};
export const getTokenSSRAndCSR = (
    ctx: NextPageContext
): [string, userToken | null] => {
    let token = '';
    let userToken = null;
    if (typeof window === 'undefined') {
        // SSR
        const coookieStr = ctx.req?.headers.cookie || '';
        token = cookie.parse(coookieStr).token || '';
        userToken = decodeJWT(token);
    } else {
        // CSR
        token = Cookies.get('token') || '';
    }
    return [token, userToken];
};
