import React, { useEffect } from 'react';
import { decodeJWT } from '.';
import { useRouter } from 'next/router';
import { useGlobalState } from '../state';

// Login is Access
function useAuthen() {
    const [token] = useGlobalState('token');
    const router = useRouter();
    useEffect(() => {
        const userToken = decodeJWT(token!);
        if (!(userToken && userToken.id && userToken.email)) {
            router.push('/login');
        }
    }, [token]);
}

// Not login is Access
function useNotAuthen() {
    const [token] = useGlobalState('token');
    const router = useRouter();
    useEffect(() => {
        const userToken = decodeJWT(token!);
        if (userToken && userToken.id && userToken.email) {
            router.push('/');
        }
    }, [token]);
}

export { useAuthen, useNotAuthen };
