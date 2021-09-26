import styles from "./ScanCodePage.module.css";
import {useState, useEffect} from "react";
import Scanner from "../Scanner/Scanner";
import {Redirect, RouteComponentProps} from "react-router-dom";

interface RouteParams {
    amount: string
}

interface MyComponent extends RouteComponentProps<RouteParams> {
}

const ScanCodePage: React.FC<MyComponent> = (props) => {

    const [address, setAddress] = useState('');
    const [back, setBack] = useState(false);

    if(back) {
        return <Redirect to="/transfer"/>
    }
    if(address) {
        return <Redirect to={`/send/${address}/${props.match.params.amount}`}/>
    }

    return <div className={styles.container}>
        <Scanner onScan={(val) => {
            console.log(val);
            setAddress(val)
        }}/>

        <div className={[styles.backButton, 'material-icons'].join(' ')} onClick={() => {setBack(true)}}>
            arrow_back
        </div>
    </div>
}

export default ScanCodePage;