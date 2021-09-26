// @ts-ignore
import styles from './SendPage.module.css';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {RouteComponentProps} from "react-router-dom";

interface RouteParams {
    amount: string,
    address: string
}

interface MyComponent extends RouteComponentProps<RouteParams> {
}

const TransferPage: React.FC<MyComponent> = (props) => {

    const [sentUser, setSentUser] = useState(null);
    const [transactionDone, setTransasctionDone] = useState(false);

    useEffect(() => {
        axios.post('/api/users/transfer', {
            address: props.match.params.address,
            amount: Math.floor(parseFloat(props.match.params.amount) * 1000000)
        }).then(res => {
            setSentUser(res.data.username || '');
            setTransasctionDone(true);
        });
    }, []);

    return <div className={styles.container}>
        <img className={styles.logo} src="/LogowBack.png"/>
        {
            transactionDone && (
                <>
                    <div className={styles.top}>
                        <div className={styles.toptop}>
                            <img className={styles.miamicoin} src="/Miamicoin.png"/>
                            <div>
                                {props.match.params.amount} Sent
                            </div>
                        </div>
                        <div className={styles.success}>
                            Successfully
                        </div>
                    </div>
                    <div className={styles.checkmark}>
                        ✓
                    </div>
                    {
                        sentUser ? <div className={styles.userArea}>
                            To {sentUser}
                        </div> : <div className={styles.userArea}>
                            To a user without a crypt305 account
                        </div>
                    }
                    <div className={styles.doneButtonContainer}>
                        <button className={styles.doneButton}>Ok</button>
                    </div>
                </>
            )

        }

    </div>
}

export default TransferPage;