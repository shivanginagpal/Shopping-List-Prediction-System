import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./sidebar.css";

class SideBar extends Component {
  render() {
    return (
      <div>
        <input type="checkbox" id="check" />
        <label for="check">
          <i className="fas fa-bars" id="sidenavbtn"></i>
          <i className="fas fa-times" id="sidenavcancel"></i>
        </label>
        <div className="sidebar">
          <header>
            <a href="/profile">Profile</a> 
          </header>
          <ul>
            <li>
              <a href="">
                {" "}
                <i className="fas fa-qrcode"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="">
                {" "}
                <i className="fas fa-qrcode"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="">
                {" "}
                <i className="fas fa-qrcode"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="">
                {" "}
                <i className="fas fa-qrcode"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="">
                {" "}
                <i className="fas fa-qrcode"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="">
                {" "}
                <i className="fas fa-qrcode"></i>Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default SideBar;
