import React, {Component} from 'react';
import PopUp from "../PopUp/PopUp";
import styles from './Home.module.css';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {showPop:false}
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div className={styles.Home}>
                <button onClick={this.togglePopup.bind(this)}>Form</button>

                {this.state.showPop ? <PopUp
                    text="click here to close"
                    closePopup={this.togglePopup.bind(this)}/>:null}

            </div>
        );
    }



}

export default Home;