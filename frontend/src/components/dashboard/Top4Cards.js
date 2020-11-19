import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import axios from 'axios';

 class Top4Cards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists:[],
            itemsBought:[],
            itemstoBuy:[],
            totalexp:[]
        }
    }

    componentDidMount = () => {
    axios("/noOfLists", {
      method: "get",
    }).then((res) => {
       this.setState({
        lists: this.state.lists.concat(res.data),
      });
      // console.log("In componentdidmount ", this.state.lists[0].lists);
    });
    axios("/noOfItemsBought", {
      method: "get",
    }).then((res) => {
       this.setState({
        itemsBought: this.state.itemsBought.concat(res.data),
      });
      //console.log("In componentdidmount ", this.state.itemsBought[0].items);
    });
    axios("/noOfItemstoBuy", {
      method: "get",
    }).then((res) => {
       this.setState({
        itemstoBuy: this.state.itemstoBuy.concat(res.data),
      });
      //console.log("In componentdidmount ", this.state.itemsBought[0].items);
    });
    axios("/totalexpenditure", {
      method: "get",
    }).then((res) => {
       this.setState({
        totalexp: this.state.totalexp.concat(res.data),
      });
      console.log("In componentdidmount ", this.state.totalexp[0].total);
    });
    }

    render() {
        const {lists} = this.state
        let num;
        if(lists[0] != undefined) {      
            num = lists[0].lists
        }

        const {itemsBought} = this.state
        let numBought;
        if(itemsBought[0] != undefined) {      
            numBought = itemsBought[0].items
        }

        const {itemstoBuy} = this.state
        let numtoBuy;
        if(itemstoBuy[0] != undefined) {      
            numtoBuy = itemstoBuy[0].items
        }

        const {totalexp} = this.state
        let totexp;
        if(totalexp[0] != undefined) {      
            totexp = totalexp[0].total
        }
        
        
        return (
            <div>
                <Row>
                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className="fa fa-walking" />
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <p className="card-category">Total Lists</p>
                            <CardTitle tag="p">{num}</CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i className="fas fa-calendar" /> Update Now
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i class="fas fa-hand-holding-usd"></i>
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <p className="card-category">Expenditure</p>
        <CardTitle tag="p">${totexp}</CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i className="fas fa-dollar-sign" /> Total Money Spent
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className="fas fa-shopping-cart" />
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <p className="card-category">Items</p>
        <CardTitle tag="p">{numBought}</CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i class="fas fa-shopping-cart"></i>  Total Items Bought
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className="fas fa-receipt" />
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <p className="card-category">Buy Items</p>
        <CardTitle tag="p">+{numtoBuy}</CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i class="fas fa-receipt"></i> Number of Items to Buy
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                </Row>
            </div>
        )
    }
}

export default Top4Cards;
