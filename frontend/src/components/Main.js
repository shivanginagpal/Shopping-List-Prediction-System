import React, { Component } from "react";
import { Route } from "react-router-dom";

import Landing from "./layout/Landing";

import Login from "./auth/Login";
import Register from "./auth/Register";
import CustomerHome from "./customer/CustomerHome";
import CreateListHome from "./list/CreateListHome";
import addList from "./list/addList";
import viewItems from "./list/viewItems";
import UserProfile from "./profile/UserProfile";
import Dashboard from "./dashboard/Dashboard";
import ItemsList from "./items/ItemsList";
import Map from "./dashboard/Map";
import Recommendation from "./recommendations/Recommendation";

export default class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/addList" component={addList} />
        <Route exact path="/customerHome" component={CustomerHome} />
        <Route exact path="/viewItems/:listid" component={viewItems} />
        <Route exact path="/createListHome" component={CreateListHome} />
        <Route exact path="/ItemsList" component={ItemsList} />
        <Route exact path="/userProfile" component={UserProfile} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/Map" component={Map} />
        <Route exact path="/recommendations" component={Recommendation} />
      </div>
    );
  }
}
