import React, { Component } from 'react';
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

class WeekDayExpenditure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayofweek:[],
            amount:[]
        }
    }

    componentDidMount = () => {
        axios('/weekdaysExpenditure',{
            method: "get",
        }).then((response) => {
                 
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.total)
                 });
                 this.setState({
                     dayofweek: monthsArr,
                     amount: valArr
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

        let chartExample2 = {
  data: canvas => {
      const monthnames =["SUN", "MON", "TUES", "WED", "THURS", "Fri", "Sat"]
        var temp=[]
        for(var i=0;i<this.state.dayofweek.length;i++){
            temp.push(monthnames[this.state.dayofweek[i]-1])
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
          label: "Money Spent($)",
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
          // data: [80, 100, 70, 80, 120, 80]
          data: this.state.amount
        }
      ]
    };
  },
  options: chart1_2_options
};
        return (
            <div>
                <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Week Days</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-bell-55 text-info" /> Expenditure
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
                
            </div>
        )
    }
}

export default WeekDayExpenditure;