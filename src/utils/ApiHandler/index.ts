type TError = {
    success: boolean,
    data: string
}

export type TResponse = {
    success: boolean;
    data: any | string | null;
}

export const errorHandler = (error: any): TError => {
    // The client was given an error response (5xx, 4xx)
    if (error.response) {
        if (error.response.status === 400) return { success: false, data: error.response.data.message };
        else if (error.response.status === 401) return { success: false, data: error.response.data.message };
        else if (error.response.status === 500) return { success: false, data: "500 error, Something went wrong." };
        else return { success: false, data: error.message };
    }
    // The client never received a response, and the request was never left
    else if (error.request) return { success: false, data: "Server took too log to respond." };
    // Anything else
    else return { success: false, data: "Something Went wrong." };
};

