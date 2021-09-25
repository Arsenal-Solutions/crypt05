import React, {Component} from 'react';
import styles from './Home.module.css';
import NumPad from 'react-numpad';

class Home extends Component{



    render() {
        return (
            <div>
                
                
                <div className={styles.center}>
                <img src='Cryp3t05.png' className={styles.Header}/>
                </div>
                    
                    <div className={styles.Home}>
                        <NumPad.Number 
                        onChange={(value) => { console.log('value', value)}}
                        label={'MiamiCoin'}
                        placeholder={'my placeholder'}
                        /*theme={this.hemp}*/
                        value={0}
                        decimal={2}
                        inline={true}
                        postion={'flex-start'}
                    />
                <div className={styles.button}>
                    <button className={styles.button1}>Send</button>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <button className={styles.button1}>request</button>
                </div>
                    
                    
            </div>
        </div>
            
        );
    }



}

export default Home;