import styles from "./HomePage.module.css";
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";


function HomePage() {

    const [currentBalance, setCurrentBalance] = useState('0');
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(window.localStorage.getItem('user') as string);

        axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${currentUser.address}/balances`)
            .then(res => {
                setCurrentBalance((res.data.stx.balance / 1000000).toFixed(2))
            })
    }, [])

    if(exit) {
        return <Redirect to="/login"/>
    }

    return <div className={styles.container}>
        <img className={styles.logo} src="/LogoHome.png"/>
        <img className={styles.logo} src="/Stock.png"/>

        <div className={styles.currentAmount}>
            <img className={styles.miamicoin} src="/Miamicoin.png"/>
            <div className={styles.currentAmountText}>
                <div className={styles.currentAmountMiami}>
                    {
                        currentBalance
                    }
                </div>
                <div className={styles.currentAmountDollars}>
                    = $
                    {
                        1.24 * parseFloat(currentBalance)
                    }
                </div>
            </div>

        </div>


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
            <div className={[styles.navBarIcon, 'material-icons'].join(' ')} onClick={() => {
                deleteAllCookies();
                setExit(true);
            }}>
                exit_to_app
            </div>
        </div>
    </div>
}


function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export default HomePage;