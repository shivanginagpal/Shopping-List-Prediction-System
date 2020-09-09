import React, { Component } from "react";
import CustomerNavbar from "./CustomerNavbar";
import SideBar from "../layout/SideBar";


export default class CustomerHome extends Component {
  render() {
    let size = "";
    return (
      <div>
        <div>
          <CustomerNavbar />
        </div>

        <div>
          <SideBar />
        </div>

        {/* <div>welcome to my website</div> */}
      </div>
    );
  }
}
