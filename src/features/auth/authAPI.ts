import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseUrlGeneration} from "../../app/utils/baseUrlGeneration";
import {RootState} from "../../app/store";

export interface IRegisterResponse {
    addedUser: IUser
}

export interface IUser {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    __v: number;
}

export interface ILoginResponse {
    createdUserSession: IMainLoginResponse
}

export interface IMainLoginResponse {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
}

export interface IRegisterRequest {
    email: string
    password: string
}

export interface ILoginRequest {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrlGeneration(),
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("token", `${token}`);
            }
            return headers;
        }
    }),
    endpoints: (build) => ({
        register: build.mutation<IUser, IRegisterRequest>({
            query: (body) => ({
                url: `auth/register`,
                method: 'POST',
                body: body
            }),
            transformResponse: (response: IRegisterResponse) => response.addedUser
        }),
        logout: build.mutation({
            query: (token: string) => ({
                url: `auth/me`,
                method: 'DELETE'
            })
        }),
        login: build.mutation<IMainLoginResponse, ILoginRequest>({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body: body
            }),
        }),
        authMe: build.mutation({
            query: (token: string) => ({
                url: "auth/me",
                method: "POST",
                body: {token}
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLogoutMutation,
    useLoginMutation,
    useAuthMeMutation} = authAPI