import React, { Component } from "react";
import CustomerNavbar from "./CustomerNavbar";
import SideBar from "../layout/SideBar";


 class CustomerHome extends Component {
  render() {
    
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

export default CustomerHome;
