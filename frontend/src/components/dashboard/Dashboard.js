import React, { Component } from 'react';
import {
  Row,
  Col,
} from "reactstrap";
import CustomerNavbar from "../customer/CustomerNavbar";
import SideBar from "../layout/SideBar";
import Top4Cards from "./Top4Cards";
import StoreExpenditure from "./StoreExpenditure";
import DayofweekExp from "./DayofWeekExp";
import MonthlyExpenditure from "./MonthlyExpenditure";
import ItemsBoughtPerMonth from "./ItemsBoughtPerMonth";
import WeekDayExpenditure from "./WeekDayExpenditure";
import StoreExpPie from "./StoreExpPie";
import StoreItemCount from "./StoreItemCount";
import CategoryExp from "./CategoryExp";
import CategoryCount from "./CategoryCount";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <CustomerNavbar />
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <div className="content">
                <Top4Cards/>
                <StoreExpenditure/>
              
              <Row>
                <Col lg="4">
                  <WeekDayExpenditure/>
                </Col>
                <Col lg="4">
                  <DayofweekExp />
                </Col>
                <Col lg="4">
                  <MonthlyExpenditure />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <StoreItemCount/>
                </Col>
                <Col md="4">
                  <ItemsBoughtPerMonth/>
                </Col>
                <Col md="4">
                  <StoreExpPie />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <CategoryExp/>
                </Col>
                <Col md="6">
                  <CategoryCount/>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
