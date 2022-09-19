import { QRCode as QrCode } from 'react-qrcode-logo';

export enum ECLevel {
    Low = "L",
    Medium = "M",
    Quartile = "Q",
    High = "H"
}

export enum QrStyle {
    Dot = "dots",
    Square = "squares"
}

type QRLogo = {
    Source?: string,
    Width?: number,
    Height?: number,
    Opacity?: number,
    HideBackground?: boolean,
}

export type TQRCode = {
    QRText?: string
    ErrorCorrection?: ECLevel,
    QRStyle?: QrStyle,
    Size?: number
    QRQuiteZone?: number
    Logo?: QRLogo
}

/**
 * @description 
 * For more information visit
 * https://www.npmjs.com/package/react-qrcode-logo
 * 
 */
export const QRCode: React.FC<TQRCode> = ({
    QRText, // Text to embed
    ErrorCorrection = ECLevel.High, // Correction Level
    QRStyle = QrStyle.Square, // QR Style
    Size = 150, // Size of QR
    QRQuiteZone = 10, // Padding Outside the QR
    Logo // Logo To Add in-front of QR
}) => {
    return Logo ?
        <QrCode
            value={QRText}
            ecLevel={ErrorCorrection}
            qrStyle={QRStyle}
            size={Size}
            quietZone={QRQuiteZone}
            logoImage={Logo.Source}
            logoHeight={Logo.Height}
            logoWidth={Logo.Width}
            logoOpacity={Logo.Opacity}
            removeQrCodeBehindLogo={Logo.HideBackground}
        /> : <QrCode
            value={QRText}
            ecLevel={ErrorCorrection}
            qrStyle={QRStyle}
            size={Size}
            quietZone={QRQuiteZone}
        />
}
