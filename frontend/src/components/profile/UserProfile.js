import React, { Component } from "react";
import axios from "axios";
import CustomerNavbar from "../customer/CustomerNavbar";
import SideBar from "../layout/SideBar";
import productimg from "../../images/grocery.jpg";
import shivangi from "../../images/shivangi-Nagpal.jpg"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import './userProfile.css';


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetails:""
    };
  }
  componentDidMount = () => {

    axios("/getUser",{
      method: "get",
    }).then((res) => {
      this.setState({
        userDetails: res.data
      })
      console.log("these are items ", this.state.userDetails);
    })
  }

  render() {
    return (
      <div>
        <CustomerNavbar />
        <div className="row">

          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-3"></div>
          <div className="col-7">
            

            <Row>
              <div className="content">
              <Col md="6">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={productimg}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={shivangi}
                      />
                      <h5 className="title">{this.state.userDetails.name}</h5>
                    <p className="description">{this.state.userDetails.email}</p>
                  </div>
                  <p className="description text-center">
                    Profile Description <br />
                    <br />
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Lists</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          20 <br />
                          <small>Items</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
        
            </Col>
            </div>
            </Row>
            
          </div>
        </div>

      </div>
    )

    
  }
}



export default UserProfile;
