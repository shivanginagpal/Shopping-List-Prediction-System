import React, { Component } from 'react';
import CustomerNavbar from "../customer/CustomerNavbar";
import SideBar from "../layout/SideBar";
import DisplayAddItems from "./DisplayAddItems";
import axios from "axios";
import swal from "sweetalert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import product_image from "../../images/grocery.jpg";
import {isFieldEmpty} from "../auth/HelperApis";
import NotificationAlert from "react-notification-alert";
import "react-notification-alert/dist/animate.css";



class viewItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      // itemName: "",
      // Quantity: "",
      // Price: "",
      // BrandName: "",
      // store: "",
      product_id:"",
      item_image:"",
      category:"",
      editmodal: false,
      edititemName: null,
      editQuantity: null,
      editPrice: null,
      editBrandName: null,
      editStoreName: null,
      text: "Buy",
      tog: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

 showModal = () => {
    this.setState({
      editmodal: !this.state.editmodal,
    });
  };

  editModalData = (product) => {
    console.log("product", product);
    if (this.state.editmodal) {
      this.setState({
        edititemName: null,
        editQuantity: null,
        editPrice: null,
        editBrandName: null,
        product_id: product.product_id,
        category: product.category,
        item_image: product.item_image,
        editStoreName: null,
        editmodal: !this.state.editmodal,
      });
    } else {
      this.setState({
        editproduct: product,
        editmodal: !this.state.editmodal,
        product_id: product.product_id,
        category: product.category,
        edititemName: product.itemName,
        editQuantity: product.quantity,
        editPrice: product.price,
        editBrandName: product.brandName,
        editStoreName: product.store,
        item_image: product.item_image,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = () => {
    const listid = this.props.match.params.listid;
    const data = {
      list_id: listid,
    };

    axios("/getitemsfromList", {
      method: "put",
      data: data,
    }).then((res) => {
      console.log("THIS IS RESPONSE ", res);
      this.setState({
        items: this.state.items.concat(res.data),
      });
      console.log("This is p", this.state.items[0].item);
    });
  };

  edititem = async (itemid) => {
    console.log("IN EDIT ITEM");
    const listid = this.props.match.params.listid;

    const data = {
      list_id: listid,
      itemName: this.state.edititemName,
      quantity: this.state.editQuantity,
      price: this.state.editPrice,
      brandName: this.state.editBrandName,
      store: this.state.editStoreName,
      product_id: this.state.product_id,
      category: this.state.category,
      item_image: this.state.item_image,
      item_id: itemid,
    };
   await axios("/updateItemToList", {
      method: "post",
      data: data,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.showModal();
        swal({
          title: "Success",
          text: "Item updated successfully",
          icon: "success",
          button: "OK",
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => console.log(error.response.data));
      }
    });
  };

  buyitem = (itemid) => {
    const listid = this.props.match.params.listid;
    const data = {
      list_id: listid,
      item_id: itemid,
    };
    console.log("BUYITEM", data);
    axios("/buyItemFromList", {
      method: "Post",
      data: data,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        swal({
          title: "Success",
          text: "Bought successfully",
          icon: "success",
          button: "OK",
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => console.log(error.response.data));
      }
    });
  };

  removeitem = (itemid) => {
    const listid = this.props.match.params.listid;
    const data = {
      list_id: listid,
      item_id: itemid,
    };
    axios("/deleteItemFromList", {
      method: "delete",
      data: data,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        swal({
          title: "Success",
          text: "Item removed successfully",
          icon: "success",
          button: "OK",
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => console.log(error.response.data));
      }
    });
  }

  render() {
    const closeeditmodalBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    let products;

    console.log("ITEMS ===", this.state.items[0]);

    if (this.state.items[0] != undefined) {
      let items = this.state.items[0];
      console.log("ITEMS ARRAY ", items.item);
      products = items.item.map((product) => {
        console.log("PRODUCT Image", isFieldEmpty(product.item_image));
          let productimg = isFieldEmpty(product.item_image)
            ? product_image
            : product.item_image;
        //let productimg = product_image;

        return (
          <div>
            <div id="itemAdminRight">
              <div className="col">
                <div className="card" id="cardadminclass" >

                  <img
                    src={productimg}
                    className="card-img-top"
                    id="cardadmin-img-top"
                    alt="..."
                  />
                  <div className="card-block" id="cardadmin-title-text" style={{"height":"20em"}}>
                    <h6 className="card-title lead" id="cardadmin-title">
                      <span>{product.itemName}</span>
                      <span>
                        <button
                          disabled={product.bought}
                          className="btn btn-primary"
                          id="buybutton"
                          onClick={() =>
                            this.buyitem(product._id)
                          }
                        >
                          {product.bought ? "Bought" : "Buy"}
                        </button>
                      </span>
                    </h6>
                    <p className="card-text lead" id="cardadmin-text">
                      Quantity : {product.quantity}
                    </p>
                    <p className="card-text lead" id="cardadmin-text">
                      Brand : {product.brandName}
                    </p>
                    <p className="card-text lead" id="cardadmin-text">
                      Store : {product.store}
                    </p>

                    <span>
                      <p className="card-text lead" id="cardadmin-text">
                        Price : ${product.price}
                      </p>
                    </span>
                    <button
                      className="btn btn-primary"
                      id="rmbutton"
                      onClick={() => this.editModalData(product)}
                    >
                      Edit
                    </button>
                    <span>&emsp;&emsp;&emsp;</span>
                    <button
                      className="btn btn-danger"
                      id="rmbutton"
                      onClick={() => this.removeitem(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    let edit = "";
    if (this.state.editproduct) {
      edit = (
        <Modal
          isOpen={this.state.editmodal}
          toggle={() => this.showModal()}
          className="modal-popup"
          transparent={true}
          scrollable
        >
          <ModalHeader
            toggle={() => this.showModal()}
            close={closeeditmodalBtn}
          >
            Edit Item
          </ModalHeader>
          <ModalBody className="modal-body">
            <form>
              <div className="form-group">
                <label className="font-weight-bold">Item Name:</label>
                <input
                  onChange={this.handleChange}
                  name="edititemName"
                  className="form-control"
                  type="text"
                  id="itemName"
                  defaultValue={this.state.editproduct.itemName}
                ></input>
                <label className="font-weight-bold">Quantity:</label>
                <input
                  onChange={this.handleChange}
                  name="editQuantity"
                  className="form-control"
                  type="number"
                  defaultValue={this.state.editproduct.quantity}
                ></input>
                <label className="font-weight-bold">Price:</label>
                <input
                  onChange={this.handleChange}
                  name="editPrice"
                  className="form-control"
                  type="number"
                  defaultValue={this.state.editproduct.price}
                ></input>
                <label className="font-weight-bold">Brand Name:</label>
                <input
                  onChange={this.handleChange}
                  name="editBrandName"
                  className="form-control"
                  type="text"
                  defaultValue={this.state.editproduct.brandName}
                ></input>
                <label className="font-weight-bold">Store:</label>
                <input
                  onChange={this.handleChange}
                  name="editStoreName"
                  className="form-control"
                  type="text"
                  defaultValue={this.state.editproduct.store}
                ></input>
                <br />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => this.edititem(this.state.editproduct._id)}
              >
                Submit
              </button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.showModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      );
    }

    return (
      <div>
        <CustomerNavbar />
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <NotificationAlert ref="notify" />
            <div className="row">
              <DisplayAddItems listid={this.props.match.params.listid} />
            </div>

            <div className="row justify-content-center align-items-center">
              <div className="col">
                <div className="dash-one">
                  <h4 className="font-weight-bold">Your items</h4>
                  {this.state.items.length > 0 ? (
                    <div className="row ">
                      <div className="col">
                        {/* <br /> */}
                        <div className="row">{products}</div>
                      </div>
                    </div>
                  ) : (
                      <div>
                        <h4 style={{ margin: "3em" }}>No items to display!</h4>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {edit}
      </div>
    );
  }
}

export default viewItems;