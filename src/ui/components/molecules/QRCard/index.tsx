import { ECLevel, QRCode, QrStyle } from "../..";
import { TUser } from "../../../../services";

export type QRCodeText = string | undefined;

type TQRCard = {
    Details: TUser,
    Logo?: string
}

export const QRCard: React.FC<TQRCard> = ({
    Details,
    Logo = "/favicon.ico"
}) => {
    return (
        Details.uuid ? <div className="text-center">
            <h2 className="mb-2 text-lg font-bold">Scan to Connect</h2>
            <div className="flex justify-center">
                <div className="grid">
                    <div className="justify-self-center border-4 w-[180px]">
                        <QRCode
                            QRText={Details.uuid}
                            ErrorCorrection={ECLevel.High}
                            QRStyle={QrStyle.Square}
                            QRForeGroundColor="#222222"
                            Logo={{
                                Source: Logo,
                                HideBackground: true
                            }} />
                    </div>
                    <div className="mt-2">
                        <p className="text-xs text-center"> 👤 Name: {Details.name}</p>
                        <p className="text-xs text-center">ℹ Address: {Details.uuid}</p>
                    </div>
                </div>
            </div>
        </div> : null
    );
}