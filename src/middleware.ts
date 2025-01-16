import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
        return new NextResponse('Authentication required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Restricted Area"',
            },
        });
    }

    const [username, password] = atob(authHeader.split(' ')[1] || '').split(
        ':'
    );

    // Thay đổi thông tin xác thực bên dưới
    const validUsername = process.env.BASIC_AUTH_USER;
    const validPassword = process.env.BASIC_AUTH_PASS;

    if (username !== validUsername || password !== validPassword) {
        return new NextResponse('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Restricted Area"',
            },
        });
    }

    return NextResponse.next();
}
