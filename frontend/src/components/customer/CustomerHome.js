import React, { Component } from "react";
import CustomerNavbar from "./CustomerNavbar";
import SideBar from "../layout/SideBar";
import Carousel from "./Carousel";
import Recommendation from "../recommendations/Recommendation"
import RecentlyBought from "./RecentlyBought";


class CustomerHome extends Component {

  render() {
    return (
      <div>
        <div>
          <CustomerNavbar />
        </div>
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <div className="row" >
              <Carousel />
            </div>
            <div className="row" lg="4" md="6" xs="6">
              <Recommendation />
            </div>
            <div className="row">
              <RecentlyBought />
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
