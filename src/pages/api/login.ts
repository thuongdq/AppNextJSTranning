// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../servies/api';

type Data = {
    status?: number;
    name?: string;
    message?: string;
    error?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const method = req.method;
    const data = req.body;

    if (method !== 'POST') {
        res.statusCode = 200;
        res.json({ status: 500, name: 'Login', message: 'Method not allow' });
    }
    // console.log('1. API LOGIN  RUN. DATA = ', data); // server

    try {
        const resAPI = await api.callJson('/member/login.php', {
            data,
            method,
        });
        // console.log('2. Response from API:', resAPI);

        const currentTime = new Date();
        const nextYear = new Date(
            currentTime.getFullYear() + 1,
            currentTime.getMonth(),
            currentTime.getDate()
        );
        if (resAPI.status === 200) {
            res.statusCode = 200;
            res.statusCode = 302;
            res.setHeader('location', '/');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Token', 'value aaaaaaa');
            res.setHeader(
                'Set-Cookie',
                `token=${
                    resAPI.token
                }; expires=${nextYear.toUTCString()}; Path=/`
            );
            res.json(resAPI);
        } else {
            res.statusCode = 302;
            res.setHeader('location', '/login?error=failded');
            res.json({
                error: 'Dang nhap khong thanh cong',
            });
        }
        // console.log(
        //     '3. Send location for Client after login and redirect from browser'
        // );
    } catch (e: any) {
        res.statusCode = 200;
        res.json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
};
