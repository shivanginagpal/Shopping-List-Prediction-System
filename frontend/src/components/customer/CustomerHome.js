import React, { Component } from 'react'
import CustomerNavbar from './CustomerNavbar';

export default class CustomerHome extends Component {
    render() {
        return (
            <div>
                <CustomerNavbar />
                "Welcome to your Home Page"
            </div>
        )
    }
}
