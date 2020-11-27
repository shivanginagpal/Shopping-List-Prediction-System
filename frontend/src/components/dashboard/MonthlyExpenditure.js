import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from "axios";

class MonthlyExpenditure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            month:[],
            amount:[]
        }
    }

    componentDidMount = () => {
        axios('/monthlyExpenditure',{
            method: "get",
        }).then((response) => {
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.total)
                 });
                 this.setState({
                     month: monthsArr,
                     amount: valArr
                 });
             })
    }

    render() {

    const chartExample4 = {

  data: canvas => {
      const monthnames =["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
        var temp=[]
        for(var i=0;i<this.state.month.length;i++){
            temp.push(monthnames[this.state.month[i]-1])
        }
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    return {
      labels: temp,
      datasets: [
        {
          label: "Monthly Expenditure($)",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
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
                      <h5 className="card-category">Monthly</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-send text-success" /> Expenditure
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
                
            </div>
        )
    }
}

export default MonthlyExpenditure;