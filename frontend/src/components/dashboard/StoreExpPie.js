import React, { Component } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter
} from "reactstrap";

class StoreExpPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store:[],
            amount:[]
        }
    }

    componentDidMount = () => {
        axios('/storeExpenditure',{
            method: "get",
        }).then((response) => {
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.total)
                 });
                 this.setState({
                     store: monthsArr,
                     amount: valArr
                 });
             })
    }
    render() {
        const data = {
            labels: ["Costco", "Walmart", "Wholefoods"],
            datasets: [
              {
                label: 'Total Money Spent($)',
                data: this.state.amount,
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"] 
              }
            ]
          };
        const options = {
            title: {
              display: true,
              text: 'Total Money Spent($)'
            }
            
          };
        return (
            <div>
                <Card className="card-chart">
                    <CardHeader>
                        <h5 className="card-category">Store</h5>
                      <CardTitle tag="h3">
                          <i className="tim-icons icon-bell-55 text-info" /> Expenditure</CardTitle>
                      {/* <p className="card-category">Money spent</p> */}
                    </CardHeader>
                    <CardBody>
                      <Pie ref="chart" data={data} options={options}/>
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

export default StoreExpPie;
