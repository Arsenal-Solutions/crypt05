import styles from "./CodePage.module.css";
import {useState, useEffect} from "react";
import {QRCodeWriter, BarcodeFormat} from "@zxing/library";
import Jimp from "jimp";

function CodePage() {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const address = JSON.parse(window.localStorage.getItem('user') as string).address;
        const code = new QRCodeWriter().encode(address, BarcodeFormat.QR_CODE, 256, 256, new Map());

        const image = new Jimp(256, 256);

        for (let i = 0; i < code.getWidth(); i++) {
            for (let j = 0; j < code.getHeight(); j++) {
                image.setPixelColor(code.get(i, j) ? 0 : 0xffffffff, i, j);
            }
        }

        image.getBufferAsync('image/png').then(buff => {
            const blob = new Blob([buff], {type: 'image/png'});
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        })
    }, [])



    return <div className={styles.container}>
        <img src={imageUrl} className={styles.code}/>

        <div className={styles.whiteSpace}></div>

        <div className={styles.navBar}>
            <div>
                Balance
            </div>
            <div>
                Transfer
            </div>
            <div>
                Your Code
            </div>
        </div>
    </div>
}

export default CodePage;