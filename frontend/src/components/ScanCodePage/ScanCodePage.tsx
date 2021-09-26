import styles from "./ScanCodePage.module.css";
import {useState, useEffect} from "react";
import Scanner from "../Scanner/Scanner";
import { RouteComponentProps } from "react-router-dom";

interface RouteParams {
    amount: string
}

interface MyComponent extends RouteComponentProps<RouteParams> {
}

const ScanCodePage: React.FC<MyComponent> = (props) => {

    return <div className={styles.container}>
        <Scanner onScan={(val) => {alert(val)}}/>
    </div>
}

export default ScanCodePage;