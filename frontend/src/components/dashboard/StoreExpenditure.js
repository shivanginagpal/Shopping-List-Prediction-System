import React, { Component } from 'react';
import axios from "axios";
import { Line } from "react-chartjs-2";
import classNames from "classnames";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class StoreExpenditure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1",
            costcomonth: [],
            costcoamount: [],
            walmartmonth: [],
            walmartamount: [],
            wholefoodsmonth:[],
            wholefoodsamount:[]
        }
    }

    setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };

    componentDidMount = async () => {
        await axios('/monthlyCostcoExp',{
            method: "get",
        }).then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.total)
                 });
                 this.setState({
                     costcomonth: monthsArr,
                     costcoamount: valArr
                 });
             })

       await axios('/monthlyWalmartExp',{
            method: "get",
        }).then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.total)
                 });
                 this.setState({
                     walmartmonth: monthsArr,
                     walmartamount: valArr
                 });
             })
        
       await axios('/monthlyWholefoodsExp',{
            method: "get",
        }).then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.total)
                 });
                 this.setState({
                     wholefoodsmonth: monthsArr,
                     wholefoodsamount: valArr
                 });
             })

    }

render() {
 let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};

let chartExample1 = {

  data1: canvas => {
      const monthnames =["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
        var temp=[]
        for(var i=0;i<this.state.costcomonth.length;i++){
            temp.push(monthnames[this.state.costcomonth[i]-1])
        }
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: temp,
      datasets: [
        {
          label: "Costco monthly expenditure($)",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.state.costcoamount
        }
      ]
    };
  },
  data2: canvas => {
      const monthnames =["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
        var temp=[]
        for(var i=0;i<this.state.walmartmonth.length;i++){
            temp.push(monthnames[this.state.walmartmonth[i]-1])
        }
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: temp,
      datasets: [
        {
          label: "Walmart monthly expenditure($)",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.state.walmartamount
        }
      ]
    };
  },
  data3: canvas => {
      const monthnames =["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
        var temp=[]
        for(var i=0;i<this.state.wholefoodsmonth.length;i++){
            temp.push(monthnames[this.state.wholefoodsmonth[i]-1])
        }
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: temp,
      datasets: [
        {
          label: "Wholefoods Monthly Expenditure($)",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.state.wholefoodsamount
        }
      ]
    };
  },
  options: chart1_2_options
};

        return (
            <div>
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
                                Wholefoods
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
                
            </div>
        )
    }
}

export default StoreExpenditure;
