import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./sidebar.css";

class SideBar extends Component {
  render() {
    return (
      <div class="sidebar-container">
        <div class="sidebar-logo">Project Name</div>
        <ul class="sidebar-navigation">
          <li class="header">Navigation</li>
          <li>
            <a href="#">
              <i class="fa fa-home" aria-hidden="true"></i> Homepage
            </a>
          </li>
          <li>
            <a href="/addList">
              <i class="fa fa-plus" aria-hidden="true"></i> Add List
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-users" aria-hidden="true"></i> Friends
            </a>
          </li>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <li>
            <a href="/userProfile">
              <i class="fa fa-cog" aria-hidden="true"></i> Settings
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-info-circle" aria-hidden="true"></i> Information
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default SideBar;
