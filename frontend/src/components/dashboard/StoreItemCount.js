import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter
} from "reactstrap";

class StoreItemCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store:[],
            count:[]
        }
    }

    componentDidMount = async () => {
       await axios('/storeItemsCount',{
            method: "get",
        }).then((response) => {
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.count)
                 });
                 this.setState({
                     store: monthsArr,
                     count: valArr
                 });
             })
    }
    render() {
        const data = {
            labels: ["Costco", "Walmart", "Wholefoods"],
            datasets: [
              {
                label: 'Number of Items Bought',
                data: this.state.count,
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]
              }
            ]
          };
        const options = {
            title: {
              display: true,
              text: 'Number of Items Bought'
            }
            
          };
        return (
            <div>
                <Card className="card-chart">
                    <CardHeader>
                        <h5 className="card-category">Items</h5>
                      <CardTitle tag="h3">
                          <i className="tim-icons icon-bell-55 text-info" /> Bought</CardTitle>
                      {/* <p className="card-category">Money spent</p> */}
                    </CardHeader>
                    <CardBody>
                      <Doughnut ref="chart" data={data} options={options} />
                    </CardBody>
                    <CardFooter>
                      <div className="stats">
                        <i className="fas fa-bars" /> No.Of Items Bought in store
                      </div>
                    </CardFooter>
                  </Card>
                
            </div>
        )
    }
}

export default StoreItemCount;
