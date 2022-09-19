import axios from "axios"
const BASE_URL = process.env.REACT_APP_BASE_URL;

export type TGetMessage = {
    id: number,
    attribute: string,
    url?: string,
    text: string,
    status: string,
    created_at: string,
    updated_at: string,
    shared_by: string,
    shared_to: string
}

export const getMessages = async (uuid: string): Promise<TGetMessage[]> => {
    return await (await axios.get(`${BASE_URL}/receive`)).data;
}