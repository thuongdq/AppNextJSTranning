// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    status?: number;
    name?: string;
    message?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method == 'POST') {
        res.status(200).json({ name: 'John Doe' });
    } else {
        res.statusCode = 200;
        res.json({ status: 500, name: 'hello', message: 'Method not allowed' });
    }
}
