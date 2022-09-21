import axios from "axios"
import { errorHandler, TResponse } from "../../utils"

type TSendMessageBody = {
    attribute: string,
    url?: string,
    text?: string,
    shared_by: string,
    shared_to: string
}

type TMessageUUIDs = {
    shared_by: string,
    shared_to: string
}

type TSendMessageResponse = {
    success: boolean,
    data: TMessageResponse
}

export type TMessageResponse = {
    id: number,
    attribute: string,
    shared_by_name: string
    url?: string,
    text: string,
    status: string,
    created_at: string,
    updated_at: string,
    shared_by: string,
    shared_to: string
}

export type TUser = {
    uuid: string | null,
    name: string | null
}

export type TAllMessagesResponse = {
    success: boolean,
    data: TMessageResponse[]
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMessages = async (uuid: string): Promise<TResponse | TAllMessagesResponse> => {
    try {
        const { status, data } = await axios.post(
            `${BASE_URL}/receive/`,
            JSON.stringify({ uuid }),
            { headers: { 'Content-Type': 'application/json' } }
        )
        if (status === 200)
            return { success: data.success, data: data.data }
        else throw new Error("Problem creating user.")
    } catch (error) {
        return errorHandler(error)
    }
}

/**
 * @deprecated Function Not Used
 */
export const sendMessage = async (message: TSendMessageBody): Promise<TResponse | TSendMessageResponse> => {
    try {
        const { attribute, url, text, shared_by, shared_to } = message
        const { status, data } = await axios.post(
            `${BASE_URL}/data/`,
            JSON.stringify({ attribute, url, text, shared_by, shared_to }),
            { headers: { 'Content-Type': 'application/json' } });
        if (status === 201)
            return { success: data.success, data: data.data }
        else throw new Error("Problem creating user.")
    }
    catch (error) {
        return errorHandler(error)
    }
}

/**
 * @deprecated Function Not Used
 */
export const allMessages = async (uuids: TMessageUUIDs): Promise<TResponse | TAllMessagesResponse> => {
    try {
        const { shared_by, shared_to } = uuids;
        const { status, data } = await axios.post(
            `${BASE_URL}/message/`,
            JSON.stringify({ shared_by, shared_to }),
            { headers: { 'Content-Type': 'application/json' } }
        )
        if (status === 200)
            return { success: data.success, data: data }
        else throw new Error("Problem creating user.")
    } catch (error) {
        return errorHandler(error)
    }
}
