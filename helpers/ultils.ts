export const validateEmail = (email: string): boolean => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const handleError = (
    key: string,
    value: string,
    password?: string
): string => {
    let error = '';
    if (value.trim().length === 0) {
        return 'This field is required';
    }

    switch (key) {
        case 'email':
            if (!validateEmail(value)) {
                error = 'Invalid email';
            } else error == '';
            break;
        case 'password':
            if (value.length < 6) {
                error = 'password must be at least 6 characters';
            } else error == '';
            break;
        case 'repassword':
            if (value !== password) {
                error = 'no matching password';
            } else error == '';
            break;
    }
    return error;
};

export const hightlightText = (originStr: string, query: string) => {
    const indexStart = originStr.toLowerCase().indexOf(query.toLowerCase());
    if (indexStart === -1 && query.length > 0) {
        return originStr;
    }
    const beforeStr = originStr.substring(0, indexStart);
    const middleStr = originStr.substring(
        indexStart,
        indexStart + query.length
    );
    const afterStr = originStr.substring(
        indexStart + query.length,
        originStr.length
    );
    return beforeStr + '<mark>' + middleStr + '</mark>' + afterStr;
};

// Change input update
// const handleChange =
//     (name: keyof FormStateType) =>
//     (evt: React.ChangeEvent<HTMLInputElement>) => {
//         setFormState((prev) => ({ ...prev, [name]: evt.target.value }));
//     };
