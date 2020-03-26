import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Landing from './layout/Landing';

import Login from './auth/Login';
import Register from './auth/Register';
import CustomerHome from './customer/CustomerHome';

export default class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/customerHome" component={CustomerHome}/>
                  
            </div>
        )
    }
}
