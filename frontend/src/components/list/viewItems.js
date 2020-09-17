import React, { Component } from 'react';
import CustomerNavbar from "../customer/CustomerNavbar";
import SideBar from "../layout/SideBar";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getID, isFieldEmpty } from "../auth/HelperApis";
import product_image from "../../images/grocery.jpg";


class viewItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemName: "",
      Quantity: "",
      Price: "",
      BrandName: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  showModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount = () => {
      const listid = this.props.match.params.listid;
      const id = getID();
      const data = {
        id: id,
        listid: listid,
      };

    axios("/getitemsfromList", {
        method: "put",
        data: data,
      }).then((res) => {
        this.setState({
          items: this.state.items.concat(res.data),
        });
        console.log("This is p", this.state.items);
      });
  }

  additem = (e) => {
    const listid = this.props.match.params.listid;
    const data = {
        listid:listid,
      itemName: this.state.itemName,
      Quantity: this.state.Quantity,
      Price:this.state.Price,
      brandName:this.state.BrandName,
      id: getID(),
    };
    axios("/addItemToList", {
      method: "post",
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.showModal();
          swal({
            title: "Success",
            text: "Item added successfully",
            icon: "success",
            button: "OK",
          })
            .then(() => {
              window.location.reload();
            })
            .catch((error) => console.log(error.response.data));
        } else if (response.status === 201) {
          swal({
            title: "Sorry",
            text: "List already exists",
            icon: "error",
            button: "OK",
          })
            .then(() => {
              window.location.reload();
            })
            .catch((error) => console.log(error.response.data));
        }
      })
      .catch((error) => {
        console.log("add project not 2xx response");
      });
  };
  render() {
      
      const closeBtn = (
        <button className="close" onClick={() => this.showModal()}>
          &times;
        </button>
      );
        let products;
        console.log("ITEMS ===",this.state.items);
      if (this.state.items) {
        products = this.state.items.map((product) => {
        //   let productimg = isFieldEmpty(product.products.productImage[0])
        //     ? product_image
        //     : product.products.productImage[0];
        let productimg = product_image;
          return (
            <div>
              <div id="itemAdminRight">
                <div className="col">
                  <div className="card" id="cardadminclass">
                    {/* {unknown} */}
                    <img
                      src={productimg}
                      className="card-img-top"
                      id="cardadmin-img-top"
                      alt="..."
                    />
                    <div className="card-block" id="cardadmin-title-text">
                      <h6 className="card-title lead" id="cardadmin-title">
                        {product.items.itemName}
                      </h6>
                      <p className="card-text lead" id="cardadmin-text">
                        {product.items.quantity}
                      </p>
                      <p className="card-text lead" id="cardadmin-text">
                        {product.items.brandName}
                      </p>

                      <span>
                        <p className="card-text lead" id="cardadmin-text">
                          ${product.items.price}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
       });
      }
    return (
      <div>
        <CustomerNavbar />
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <div className="row">
              <button
                type="button"
                class="btn btn-success"
                id="addListbtn"
                onClick={() => this.showModal()}
              >
                Add Item
              </button>
            </div>

            <div className="row justify-content-center align-items-center">
              <div className="col">
                <div className="dash-one">
                  <h4 className="font-weight-bold">Your items</h4>
                  {this.state.items.length > 0 ? (
                    <div className="row ">
                      <div className="col">
                        {/* <br /> */}
                        <div className="row" >{products}</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 style={{ margin: "3em" }}>No items to display!</h4>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={() => this.showModal()}
          className="modal-popup"
          scrollable
        >
          <ModalHeader toggle={() => this.showModal()} close={closeBtn}>
            Add Item
          </ModalHeader>
          <ModalBody className="modal-body">
            {/* <form > */}
            <div className="form-group">
              <label className="font-weight-bold">Item Name:</label>
              <input
                onChange={this.handleChange}
                name="itemName"
                className="form-control"
                type="text"
              ></input>
              <label className="font-weight-bold">Quantity:</label>
              <input
                onChange={this.handleChange}
                name="Quantity"
                className="form-control"
                type="text"
              ></input>
              <label className="font-weight-bold">Price:</label>
              <input
                onChange={this.handleChange}
                name="Price"
                className="form-control"
                type="text"
              ></input>
              <label className="font-weight-bold">Brand Name:</label>
              <input
                onChange={this.handleChange}
                name="BrandName"
                className="form-control"
                type="text"
              ></input>
              <br />
            </div>

            <button className="btn btn-primary" onClick={() => this.additem()}>
              Submit
            </button>
            {/* </form> */}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.showModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default viewItems;