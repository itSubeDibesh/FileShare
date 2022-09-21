import axios from "axios";
import Centrifuge from "centrifuge";

const getSocketToken = async (): Promise<string> => {
    const { data } = await axios.get(`${process.env.REACT_APP_CENTRIFUGE_TOKEN_URL}/auth/get-socket-token`);
    return data.token;
};

export const setupCentrifuge = async (): Promise<Centrifuge> => {
    const token = await getSocketToken();
    const centrifuge = new Centrifuge(`${process.env.REACT_APP_SOCKET_URL}`);
    centrifuge.setToken(token)
    centrifuge.connect();
    return centrifuge;
}
