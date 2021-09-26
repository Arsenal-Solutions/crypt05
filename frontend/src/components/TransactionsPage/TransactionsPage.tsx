// @ts-ignore
import styles from './TransactionsPage.module.css';
import React, {useEffect, useState} from "react";
import {Redirect, Link} from "react-router-dom";
import axios from "axios";

type Transaction = {
    anchor_mode: string
    fee_rate: string
    nonce: number
    post_condition_mode: string
    post_conditions: any[]
    receipt_time: number
    receipt_time_iso: string
    sender_address: string
    sponsored: boolean
    token_transfer: {
        recipient_address: string,
        amount: string,
        memo: string
    }
    tx_id: string
    tx_status: string,
    burn_block_time: number
}

type FormattedTransaction = Transaction & {
    sender_username: string,
    receiver_username: string
}

function TransferPage(){

    const [transactionList, setTransactionList] = useState<FormattedTransaction[]>([]);
    const [pendingList, setPendingList] = useState<FormattedTransaction[]>([]);

    useEffect(() => {
        const currentUser = JSON.parse(window.localStorage.getItem('user') as string);
        axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${JSON.parse(window.localStorage.getItem('user') as string).address}/transactions?unanchored=true&limit=50&offset=0`)
            .then(res => {
                return res.data.results as Transaction[];
            })
            .then(transfers => {
                return Promise.all(transfers.map(t => new Promise(async (resolve, reject) => {
                    resolve({
                        ...t,
                        sender_username: t.sender_address === currentUser.address ? currentUser.username : await axios.get(`/api/users/${t.sender_address}`).then(r => r.data.username).catch(() => ''),
                        receiver_username: t.token_transfer.recipient_address === currentUser.address ? currentUser.username : await axios.get(`/api/users/${t.token_transfer.recipient_address}`).then(r => r.data.username).catch(() => '')
                    })
                }))) as Promise<FormattedTransaction[]>
            })
            .then((a: FormattedTransaction[]) => {
                setTransactionList(a)
            })
            .then(() => {
                return axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${JSON.parse(window.localStorage.getItem('user') as string).address}/mempool?unanchored=true`)
            }).then(res => {
            return res.data.results as Transaction[];
        })
            .then(transfers => {
                return Promise.all(transfers.map(t => new Promise(async (resolve, reject) => {
                    resolve({
                        ...t,
                        sender_username: t.sender_address === currentUser.address ? currentUser.username : await axios.get(`/api/users/${t.sender_address}`).then(r => r.data.username).catch(() => ''),
                        receiver_username: t.token_transfer.recipient_address === currentUser.address ? currentUser.username : await axios.get(`/api/users/${t.token_transfer.recipient_address}`).then(r => r.data.username).catch(() => '')
                    })
                }))) as Promise<FormattedTransaction[]>
            })
            .then((a: FormattedTransaction[]) => {
                setPendingList(a)
            });
    }, []);

    useEffect(() => {
        window.localStorage.setItem('nonce', (transactionList.length + pendingList.length).toString());
    }, [transactionList, pendingList]);

    const currentUser = JSON.parse(window.localStorage.getItem('user') as string);

    return <div className={styles.container}>
        <img className={styles.logo} src="/LogowBack.png"/>
        <div className={styles.title}>
            Pending
        </div>

        <div className={styles.list}>
            {
                pendingList.map(tr => <div className={styles.transaction}>
                    <div style={{marginRight: '5px'}}>
                        {
                            tr.sender_username === currentUser.username ? 'You ' : `${tr.sender_username || 'Unknown'} `
                        }
                    </div>
                    <div style={{marginRight: '5px'}}>
                        sent
                    </div>
                    <div style={{marginRight: '5px'}}>
                        {
                            tr.receiver_username === currentUser.username ? ' you ' : ` ${tr.receiver_username || 'Unknown'} `
                        }
                    </div>
                    <div style={{marginRight: '5px'}}>
                        <img className={styles.miamicoin} src="/Miamicoin.png"/>
                        {
                            (parseInt(tr.token_transfer.amount) / 1000000).toFixed(2) + ' '
                        }
                    </div>
                </div>)
            }
        </div>

        <div className={styles.title}>
            Transactions
        </div>

        <div className={styles.list}>
            {
                transactionList.map(tr => <div className={styles.transaction}>
                    <div style={{marginRight: '5px'}}>
                        {
                            tr.sender_username === currentUser.username ? 'You ' : `${tr.sender_username || 'Unknown'} `
                        }
                    </div>
                    <div style={{marginRight: '5px'}}>
                        sent
                    </div>
                    <div style={{marginRight: '5px'}}>
                        {
                            tr.receiver_username === currentUser.username ? ' you ' : ` ${tr.receiver_username || 'Unknown'} `
                        }
                    </div>
                    <div style={{marginRight: '5px'}}>
                        <img className={styles.miamicoin} src="/Miamicoin.png"/>
                        {
                            (parseInt(tr.token_transfer.amount) / 1000000).toFixed(2) + ' '
                        }
                    </div>
                    <div style={{marginRight: '5px'}}>
                        on
                    </div>
                    <div style={{marginRight: '5px'}}>
                        {
                            ' ' + (new Date(tr.burn_block_time * 1000).getMonth() + 1) + '/' + (new Date(tr.burn_block_time * 1000).getDate() + 1) + '/' + new Date(tr.burn_block_time * 1000).getFullYear() + ' '
                        }
                    </div>
                    <div style={{marginRight: '5px'}}>
                        at
                    </div>
                    <div>
                        {
                            ' ' + (new Date(tr.burn_block_time * 1000).getHours() % 12) + ':' + new Date(tr.burn_block_time * 1000).getMinutes() + ' ' + (new Date(tr.burn_block_time * 1000).getHours() >= 12 ? 'PM' : 'AM')
                        }
                    </div>
                </div>)
            }
        </div>

        <div className={styles.fill}></div>

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

export default TransferPage;