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
        <div>
            <QRCode
                QRText={QRText}
                ErrorCorrection={ECLevel.High}
                QRStyle={QrStyle.Square}
                Logo={{
                    Source: "/favicon.ico",
                    HideBackground: true
                }} />
        </div>
    );
}