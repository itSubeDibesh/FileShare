export type TMessageResponse = {
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

export type TSendMessageBody = {
    attribute: string,
    url?: string,
    text?: string,
    shared_by: string,
    shared_to: string
}

export type TMessageUUIDs = {
    shared_by: string,
    shared_to: string
}

export type TUser = {
    uuid: string | null,
    name: string | null
}

export type TAllMessagesResponse = {
    messages: TMessageResponse[],
    users: {
        shared_by: TUser,
        shared_to: TUser
    }
}

export type TSendMessageResponse = TMessageResponse
export type TReceiveMessageResponse = TMessageResponse;
