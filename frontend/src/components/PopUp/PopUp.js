import React, {Component} from 'react';
import styles from './PopUp.module.css';
import { Button} from "react-bootstrap";
import axios from "axios";

class PopUp extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        resources: []
    }

    handleChange(e) {
        const resourceName = e.target.name;
        const value = e.target.value;
        this.setState(state => {
            const index = state.resources.findIndex(x => {
                return x.ResourceName === resourceName;
            });
            return {
                resources: [
                    ...state.resources.slice(0, index),
                    {
                        ...state.resources[index],
                        value
                    },
                    ...state.resources.slice(index + 1)
                ]
            }
        })
        console.log(resourceName);
    }


    async componentDidMount() {
        axios.get('/api/resources').then((response) => {
            this.setState({
                resources: response.data
            })
        });
    }

    async handleSubmit(e){
        e.preventDefault();
        const promises = this.state.resources.map(resource => {
            if(resource.value) {
                return axios.post('/api/reviews', {
                    StoreID: this.props.store.StoreID,
                    ResourceID: resource.ResourceID,
                    Availability: resource.value
                });
            }
            else {
                return Promise.resolve();
            }
        });
        await Promise.all(promises);
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        return (
            <div className={styles.popup}>
                <div className={styles.popup_inner}>
                    <form onSubmit={this.handleSubmit}>
                        <h3 className={styles.question}>Please rate the availability of the following items at this location.</h3>
                        <h4 className={styles.question}>(0 being completely out of the item, 5 being plentiful.)</h4>
                        <h5 className={styles.question}>Please select do not know, if you do not know</h5>
                        {
                            this.state.resources.map(resource => {
                                return <div className={styles.resources}>
                                    <div className={styles.name}>{resource.ResourceName}</div>
                                    <select name={resource.ResourceName} value={resource.value} onChange={this.handleChange}>
                                        <option value={'null'}>Don't Know</option>
                                        <option value={'5'}>5</option>
                                        <option value={'4'}>4</option>
                                        <option value={'3'}>3</option>
                                        <option value={'2'}>2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'0'}>0</option>
                                    </select>
                                </div>
                            })
                        }
                    </form>
                    <Button className={styles.buttonSubmit} onClick={this.handleSubmit}>Submit</Button>

                    <Button className={styles.buttonCancel} onClick={this.props.closePopup}>Close</Button>
                </div>
            </div>
        );
    }
}

export default PopUp;