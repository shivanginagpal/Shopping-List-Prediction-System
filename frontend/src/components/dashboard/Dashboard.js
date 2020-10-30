import React, { Component } from 'react';
import NotificationAlert from "react-notification-alert";
import "react-notification-alert/dist/animate.css";
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
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  dashboardEmailStatisticsChart,
} from "./charts.js";
import Top4Cards from "./Top4Cards";

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
              <Row>
                <Col xs="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <Row>
                        <Col className="text-left" sm="6">
                          {/* <h5 className="card-category">Total Shipments</h5> */}
                          <CardTitle tag="h2">Analytics</CardTitle>
                        </Col>
                        <Col sm="6">
                          <ButtonGroup
                            className="btn-group-toggle float-right"
                            data-toggle="buttons"
                          >
                            <Button
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.bigChartData === "data1",
                              })}
                              color="info"
                              id="0"
                              size="sm"
                              onClick={() => this.setBgChartData("data1")}
                            >
                              <input
                                defaultChecked
                                className="d-none"
                                name="options"
                                type="radio"
                              />
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                Costco
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-single-02" />
                              </span>
                            </Button>
                            <Button
                              color="info"
                              id="1"
                              size="sm"
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.bigChartData === "data2",
                              })}
                              onClick={() => this.setBgChartData("data2")}
                            >
                              <input
                                className="d-none"
                                name="options"
                                type="radio"
                              />
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                Walmart
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-gift-2" />
                              </span>
                            </Button>
                            <Button
                              color="info"
                              id="2"
                              size="sm"
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.bigChartData === "data3",
                              })}
                              onClick={() => this.setBgChartData("data3")}
                            >
                              <input
                                className="d-none"
                                name="options"
                                type="radio"
                              />
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                Wholesale
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-tap-02" />
                              </span>
                            </Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Line
                          data={chartExample1[this.state.bigChartData]}
                          options={chartExample1.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col lg="4">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Number of Visits</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-bell-55 text-info" /> 15
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Line
                          data={chartExample2.data}
                          options={chartExample2.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Week Days</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                        $1345
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={chartExample3.data}
                          options={chartExample3.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Monthly Expenditure</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-send text-success" /> 1345K
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Line
                          data={chartExample4.data}
                          options={chartExample4.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
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
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
