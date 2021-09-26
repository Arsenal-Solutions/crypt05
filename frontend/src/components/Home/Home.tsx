// @ts-ignore
import styles from './Home.module.css';
import {useState} from "react";

type Key = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | '.' | '<';

function Home(){

    const [currentValue, setCurrentValue] = useState(0.00);
    const [hasDecimal, setHasDecimal] = useState(false);
    const [decimalIndex, setDecimalIndex] = useState(0);

    function handleKey(key: Key) {
        if(typeof(key) === 'number') {
            let integer = Math.floor(currentValue);
            let decimal = (currentValue - integer) * 100;

            if(hasDecimal) {
                if(decimalIndex < 2) {
                    if(decimalIndex == 0) {
                        decimal = key * 10;
                        setDecimalIndex(1);
                    }
                    else {
                        decimal += key
                        setDecimalIndex(2)
                    }
                }
            }
            else {
                integer = parseInt(integer.toString() + key);
            }
            setCurrentValue(integer + (decimal / 100));
        }
        else if(key === '.') {
            setHasDecimal(true);
        }
        else if(key === '<') {
            let integer = Math.floor(currentValue);
            let decimal = (currentValue - integer) * 100;

            if(hasDecimal) {
                if(decimalIndex === 0) {
                    setHasDecimal(false);
                }
                else {
                    if(decimalIndex == 2) {
                        decimal = Math.floor(decimal / 10) * 10;
                    }
                    else if(decimalIndex == 1) {
                        decimal = 0;
                    }
                    setDecimalIndex(decimalIndex - 1);
                }
            }
            else {
                integer = Math.floor(integer / 10);
            }
            setCurrentValue(integer + (decimal / 100));
        }
    }

    return <div className={styles.container}>
        <div className={styles.currentValue}>
            <img className={styles.miamicoin} src="/Miamicoin.png"/>
            <div className={styles.currentValueText}>
                {
                    currentValue.toFixed(hasDecimal ? 2 : 0)
                }
            </div>
        </div>

        <div className={styles.keypad}>
            <div className={styles.keyRow}>
                {
                    [1,2,3].map(v => <div className={styles.key} onClick={() => {handleKey(v as Key)}}>{v}</div>)
                }
            </div>
            <div className={styles.keyRow}>
                {
                    [4,5,6].map(v => <div className={styles.key} onClick={() => {handleKey(v as Key)}}>{v}</div>)
                }
            </div>
            <div className={styles.keyRow}>
                {
                    [7,8,9].map(v => <div className={styles.key} onClick={() => {handleKey(v as Key)}}>{v}</div>)
                }
            </div>
            <div className={styles.keyRow}>
                {
                    ['.',0,'<'].map(v => <div className={styles.key} onClick={() => {handleKey(v as Key)}}>{v}</div>)
                }
            </div>
        </div>

        <div className={styles.bottomBar}>
            <div>
                Send
            </div>
            <div>
                Request
            </div>
        </div>

        <div className={styles.navBar}>
            <div>
                Balance
            </div>
            <div>
                Transfer
            </div>
            <div>
                MiamiCoin Value
            </div>
        </div>
    </div>
}

export default Home;