import React, { Component } from 'react'
import axios from 'axios';
export default class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            all_Product : []
        }
        console.log('Menu')
    }
    get_Category_Product = () => {
        return axios.get('http://localhost:3001/api/productCategory').then( data => {
            console.log(data)
            this.setState({
                all_Product : data.data
            })
        }) 
    }

    componentDidMount = ()  => {
        console.log('Menu Mount')
        this.get_Category_Product()
    }
    
    render() { 
        const nameProducte = (this.state.all_Product !== undefined) ? this.state.all_Product.map((item,index)=>{
            return <li key={index}><a>{item.name}</a></li>
        }) : <div></div>
        return (
            <div>
                <ul>
                   {nameProducte}
                </ul>
            </div>
        )
    }
}
