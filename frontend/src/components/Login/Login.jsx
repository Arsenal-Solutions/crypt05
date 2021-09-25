import React, {useState} from 'react';
import GoogleLogin from "react-google-login";
import { Button, FormGroup, FormControl, Alert} from "react-bootstrap";
import styles from './Login.module.css';
import {Link, Redirect, Route} from "react-router-dom";
import axios from 'axios';

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    let [valid, setValid] = useState(false);


    function validateForm(){
        return email.length > 0 && password.length >= 8;
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const result = await axios.post('/api/clients/login', {
                email: email,
                password: password
            });
            const user = result.data;
            setValid(true);
        }
        catch(err) {
            setError(err.response.data.message);
        }
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    if(valid){
        return <Redirect to="/Home"/>
    }
        return (
            <div>
                <div className={styles.Logo}>
                    <img src="/CrisisCheck_Logo.svg"/>
                </div>
                {
                    error ? <Alert variant="danger" className={styles.Login}>{error}</Alert> : <></>
                }
                <div className={styles.Login}>
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

                            <Button block bsSize="large" disabled={!validateForm()} type="submit">
                                Login
                            </Button>


                        <div className={styles.signUp}>
                            <Link to ="/signUp">
                                <Button block bsSize="large" type="submit">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>

        );

}

export default Login;