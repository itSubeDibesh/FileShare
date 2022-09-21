import axios from "axios";
import { errorHandler, TResponse } from "../../utils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type TCreateUser = {
    uuid: string,
    name: string,
    status: string,
    created_at: string,
    updated_at: string
}

type TCreateUserResponse = {
    success: boolean,
    data: TCreateUser
}

export type TCreateUserBody = { name: string }

export const createUser = async (body: TCreateUserBody): Promise<TResponse | TCreateUserResponse> => {
    try {
        const { status, data } = await axios.post(
            `${BASE_URL}/user/`,
            JSON.stringify({ ...body }),
            { headers: { 'Content-Type': 'application/json' } }
        )
        if (status === 201)
            return { success: data.success, data: data.data }
        else throw new Error("Problem creating user.")
    } catch (error) {
        return errorHandler(error)
    }
}