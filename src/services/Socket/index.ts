import axios from "axios";
import Centrifuge from "centrifuge";

const getSocketToken = async (uuid: string): Promise<string> =>
    await (await axios.post(`${process.env.REACT_APP_BASE_URL}/get-token/`, { channel: uuid })).data.token;

export const setupCentrifuge = async (uuid: string): Promise<Centrifuge> => {
    const token = await getSocketToken(uuid);
    const centrifuge = new Centrifuge(`${process.env.REACT_APP_SOCKET_URL}`);
    centrifuge.setToken(token)
    centrifuge.connect();
    return centrifuge;
}
