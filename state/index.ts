import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

export type TypeUser = {
    USERID: string;
    email: string;
    gender: string;
    fullname: string;
    description?: string;
    profilepicture: string;
    permission: string;
    status: string;
};
export type TypeCategory = {
    text: string;
    id: number;
};

type TypeInitState = {
    currentUser: TypeUser | null;
    categories: TypeCategory[] | [];
    token?: string;
};

const initialState: TypeInitState = {
    currentUser: null,
    categories: [],
    token: '',
};
const { useGlobalState } = createGlobalState(initialState);
export { useGlobalState };
