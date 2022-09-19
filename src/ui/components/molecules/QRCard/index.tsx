import { useEffect, useState } from "react";
import { ECLevel, QRCode, QrStyle } from "../..";
import { generateUUID, Logger, Store } from "../../../../utils";

export const QRCard = () => {
    const log = new Logger("QRCard").log
    const [QRText, setQRText] = useState("")
    const { save, get } = Store;
    const currentDevice = get("DEVICE_UUID")

    useEffect(() => {
        log("DEVICE_UUID:", currentDevice)
        if (currentDevice)
            setQRText(currentDevice);
        else {
            const newDevice = generateUUID();
            save("DEVICE_UUID", newDevice);
            setQRText(newDevice)
        }
    }, [currentDevice, log, save])

    return (
        <div className="text-center">
            <h2 className="mb-2 text-lg font-bold">Scan to Connect</h2>
            <div className="flex justify-center">
                <div className="grid">
                    <div className="justify-self-center border-4 w-[180px]">
                        <QRCode
                            QRText={QRText}
                            ErrorCorrection={ECLevel.High}
                            QRStyle={QrStyle.Square}
                            QRForeGroundColor="#222222"
                            Logo={{
                                Source: "/favicon.ico",
                                HideBackground: true
                            }} />
                    </div>
                    <div className="mt-2">
                        <p className="text-xs text-center">{QRText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}