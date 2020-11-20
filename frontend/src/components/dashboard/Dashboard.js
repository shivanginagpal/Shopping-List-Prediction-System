import React, { Component } from 'react';
import { Line, Bar, Pie } from "react-chartjs-2";
import classNames from "classnames";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import CustomerNavbar from "../customer/CustomerNavbar";
import SideBar from "../layout/SideBar";
import {
  dashboardEmailStatisticsChart,
} from "./charts.js";
import Top4Cards from "./Top4Cards";
import StoreExpenditure from "./StoreExpenditure";
import DayofweekExp from "./DayofWeekExp";
import MonthlyExpenditure from "./MonthlyExpenditure";
import ItemsBoughtPerMonth from "./ItemsBoughtPerMonth";
import WeekDayExpenditure from "./WeekDayExpenditure";
import StoreExpPie from "./StoreExpPie";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
    };
  }

  setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };

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
                  <Card className="card-chart">
                    <CardHeader>
                      <CardTitle tag="h5">Expenditure</CardTitle>
                      {/* <p className="card-category">Money spent</p> */}
                    </CardHeader>
                    <CardBody>
                      <Pie
                        data={dashboardEmailStatisticsChart.data}
                        options={dashboardEmailStatisticsChart.options}
                      />
                    </CardBody>
                    <CardFooter>
                      <div className="legend">
                        <i className="fa fa-circle text-primary" /> Category1{" "}
                        <i className="fa fa-circle text-warning" /> Category2{" "}
                        <i className="fa fa-circle text-danger" /> Category3{" "}
                        <i className="fa fa-circle text-gray" /> Category4
                      </div>
                      <hr />
                      <div className="stats">
                        <i className="fa fa-calendar" /> Category wise
                        Expenditure
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <ItemsBoughtPerMonth/>
                </Col>
                <Col md="4">
                  <StoreExpPie />
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
