import React, { Component } from 'react';
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter
} from "reactstrap";


class CategoryExp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:[],
            amount:[]
        }
    }

    componentDidMount = () => {
        axios('/categoryExpenditure',{
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
                     category: monthsArr,
                     amount: valArr
                 });
             })
    }
    render() {
        let chartExample3 = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: this.state.category,
      datasets: [
        {
          label: "Money Spent($)",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: this.state.amount
        }
      ]
    };
  },
  options: {
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
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 10,
            suggestedMax: 100,
            padding: 20,
            fontColor: "#9e9e9e",
            beginAtZero: true,
            stepSize: 5
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};
        return (
            <div>
                <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Category</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                        Expenditure
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
                    <CardFooter>
                      <div className="stats">
                        <i className="fas fa-bars" /> Category wise
                        Expenditure
                      </div>
                    </CardFooter>
                  </Card>
            </div>
        )
    }
}

export default CategoryExp;
