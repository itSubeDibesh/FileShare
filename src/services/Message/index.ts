import axios from "axios"
import {
    TAllMessagesResponse, TMessageUUIDs, TReceiveMessageResponse,
    TSendMessageBody, TSendMessageResponse
} from "../@types"

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMessages = async (uuid: string): Promise<TReceiveMessageResponse[]> => {
    return (await axios
        .post(
            `${BASE_URL}/receive/`,
            JSON.stringify({ uuid }),
            { headers: { 'Content-Type': 'application/json' } }
        )).data;
}

export const sendMessage = async (message: TSendMessageBody): Promise<TSendMessageResponse> => {
    const { attribute, url, text, shared_by, shared_to } = message
    return (await axios
        .post(
            `${BASE_URL}/data/`,
            JSON.stringify({ attribute, url, text, shared_by, shared_to }),
            { headers: { 'Content-Type': 'application/json' } }
        )).data;
}

export const allMessages = async (uuids: TMessageUUIDs): Promise<TAllMessagesResponse> => {
    const { shared_by, shared_to } = uuids;
    return (await axios.post(
        `${BASE_URL}/message/`,
        JSON.stringify({ shared_by, shared_to }),
        { headers: { 'Content-Type': 'application/json' } }
    )).data
}