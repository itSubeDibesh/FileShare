import axios from "axios";

const TOKEN_URL = process.env.REACT_APP_CENTRIFUGE_TOKEN_URL;

export const getSocketToken = async () => {
    const { data } = await axios.get(`${TOKEN_URL}/auth/get-socket-token`);
    return data.token;
};
