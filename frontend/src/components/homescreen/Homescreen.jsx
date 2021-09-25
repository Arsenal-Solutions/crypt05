import React from 'react';
import styles from './Homescreen.module.css';
import axios from "axios";
//import Checklist from './checklist/Checklist';

export default class Homescreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.handleCheckList = this.handleCheckList.bind(this);
        this.handlePopUp = this.handlePopUp.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.state = {
                checklistIsVisible: false,
                itemList: [],
                showPopUp: false
            };
    }


    async componentDidMount() {
        axios.get('/api/resources').then((response) => {
            this.setState({
                resources: response.data,
                itemList: response.data.map(resource => {
                    return {
                        name: resource.ResourceName,
                        isChecked: window.localStorage.getItem(resource.ResourceName) === 'true',
                        resourceID: resource.ResourceID
                    }
                })
            })
        });
    }

    handleCheckList()
    {
        this.setState(state => ({checklistIsVisible: !state.checklistIsVisible}));
    }

    handleClickItem(checkingItem, index)
    {
        this.setState(state => {
            return {
                itemList: [
                    ...state.itemList.slice(0, index),
                    {
                        name: state.itemList[index].name,
                        isChecked: !state.itemList[index].isChecked
                    },
                    ...state.itemList.slice(index + 1)
                ]
            }
        });
        window.localStorage.setItem(checkingItem.name, (!checkingItem.isChecked).toString())
    }

    handlePopUp()
    {
        this.setState(state => ({showPopUp: !state.showPopUp}));
    }

    handleClickResource(item) {
        this.setState({
            focusedResourceId: item.resourceID
        })
    }

    render() {
        const displayCheckList = this.state.checklistIsVisible;
        
        let checklist = <div className={styles.items} id="checklist" style={{ display: displayCheckList ? "block" : "none" }}>
            {this.state.itemList.map((item, index) => (
                <div className={[styles.item, this.state.focusedResourceId === item.resourceID ? styles.itemFocused : ''].join(' ')} onClick={()=>{this.handleClickResource(item)}}>
                    <input key={item.name} checked={item.isChecked} type="checkbox" name="item" onClick={()=>{this.handleClickItem(item, index)}}/>
                    <label htmlFor="item">{item.name}</label>
                </div>
            ))}
        </div>
    
        return <div>
            <i className={['material-icons', styles.checklistButton].join(' ')} onClick={this.handleCheckList}>playlist_add_check</i>
            {this.state.checklistIsVisible ? checklist : <></>}
        </div>
    }
}
