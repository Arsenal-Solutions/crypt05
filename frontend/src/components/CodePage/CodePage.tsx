import styles from "./CodePage.module.css";
import {useState, useEffect} from "react";
import {QRCodeWriter, BarcodeFormat} from "@zxing/library";
import Jimp from "jimp";
import {Link} from "react-router-dom";

function CodePage() {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if(!window.localStorage.getItem('user')) {
            return;
        }
        const address = JSON.parse(window.localStorage.getItem('user') as string).address;
        if(!address) {
            return;
        }
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
            <Link to="/transactions" className={[styles.navBarIcon, 'material-icons'].join(' ')}>
                receipt_long
            </Link>
            <Link to="/transfer" className={[styles.navBarIcon, 'material-icons'].join(' ')}>
                sync_alt
            </Link>
            <Link to="/code" className={[styles.navBarIcon, 'material-icons'].join(' ')}>
                qr_code_2
            </Link>
            <Link to="/home" className={[styles.navBarIcon, 'material-icons'].join(' ')}>
                home
            </Link>
        </div>
    </div>
}

export default CodePage;