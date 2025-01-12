function decodeJWT(token: string) {
    try {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL decoding
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(
                    (c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
                )
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

export { decodeJWT };
