import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Landing from './layout/Landing';

import Login from './auth/Login';
import Register from './auth/Register';
import CustomerHome from './customer/CustomerHome';
import CreateListHome from './list/CreateListHome';
import addList from './list/addList';
import viewItems from './list/viewItems';

export default class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/addList" component={addList} />
            <Route exact path="/customerHome" component={CustomerHome} />
            <Route exact path="/viewItems/:listid" component={viewItems} />
            <Route exact path="/createListHome" component={CreateListHome} />
          </div>
        );
    }
}
