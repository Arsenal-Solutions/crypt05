import React, {Component, useState} from 'react';
import {Button, FormGroup, FormControl, Alert} from "react-bootstrap";
import styles from "./Signup.module.css";
import axios from "axios";
import {Redirect} from "react-router-dom";


function Signup(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    let [valid,setValid] = useState(false);

    function validateForm(){
        return email.length > 0 && password.length >= 8 && password === confirmPassword;
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const result = await axios.post('/api/users', {
                username: email,
                password: password
            });
            const user = result.data;
            setValid(true);
        }
        catch(err) {
            setError(err.response.data.message);
        }
    }

    if(valid){
        return <Redirect to="/Home"/>
    }
    return (
        <div className={styles.Register}>
            <div className={styles.Logo}>
                <img src="/CrisisCheck_Logo.svg"/>
            </div>
            {
                error ? <Alert variant="danger" className={styles.Login}>{error}</Alert> : <></>
            }
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <h4>Email</h4>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <h4>Password</h4>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <h4>ConfirmPassword</h4>
                    <FormControl
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>

                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    );

}

export default Signup;