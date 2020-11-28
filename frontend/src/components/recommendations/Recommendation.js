import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import product_image from "../../images/grocery.jpg";
import { isFieldEmpty } from "../auth/HelperApis";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';
import NotificationAlert from "react-notification-alert";
import "react-notification-alert/dist/animate.css";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      product_id: "",
      category: "",
      itemName: "",
      brandName: "",
      store: "",
      price: "",
      item_image: "",
      items: [],
      products: [],
      isLoaded: false,
      modal: false,
      error: null,
    };
  }

  showModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  editModal = (product) => {
    console.log("prod is", product)
    this.setState({
      product_id: product.product_id,
      category: product.category,
      itemName: product.name,
      brandName: product.brandName,
      store: product.store,
      price: product.price,
      item_image: product.item_image,
      modal: !this.state.modal
    })
  }

  componentDidMount = async () => {

    axios("/getList", {
      method: "get",
    }).then((response) => {
      this.setState({
        lists: this.state.lists.concat(response.data),
      });
      console.log("In list ", this.state.lists);
    });
    if (this.props.auth) {
      console.log("user is", this.props.auth.user.id);
    }
    await fetch(
      "http://localhost:5000/get_prediction/user_id=" + this.props.auth.user.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    const data = {
      product: this.state.items
    }
    console.log("this.state.items are: ", this.state.items)
    console.log("items are: ", data);
    axios("/getUserRecommendations", {
      method: "PUT",
      data: data
    }).then((res) => {
      this.setState({
        products: this.state.products.concat(res.data),
      });
      console.log("these are items ", this.state.products[0].data);
    });
  }

  addItem = (listid) => {
    const data = {
      list_id: listid,
      itemName: this.state.itemName,
      product_id: this.state.product_id,
      category: this.state.category,
      brandName: this.state.brandName,
      store: this.state.store,
      price: this.state.price,
      item_image: this.state.item_image
    }
    console.log("THIS IS PUT DATA", data);
    axios("/addItemToList", {
      method: "PUT",
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          swal({
            title: "Success",
            text: "Item added successfully",
            icon: "success",
            button: "OK",
          })
            .then(() => {
              this.showModal();
              var options = {};
              options = {
                place: "tr",
                message: <div>Item added</div>,
                type: "info",
                icon: "fas fa-bell",
                autoDismiss: 5,
                closeButton: true,
              };
              this.refs.notify.notificationAlert(options);

            })
            .catch((error) => console.log(error.response.data));

        } else if (response.status === 201) {
          swal({
            title: "Sorry",
            text: "Item already exists",
            icon: "error",
            button: "OK",
          })
            .catch((error) => console.log(error.response.data));
        }
      })
      .catch((error) => {
        console.log("add project not 2xx response");
      });

  }


  isFieldEmpty = (prop) => {
    if (prop === "" || prop === null || typeof prop === "undefined") {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    let productdet;
    let listnames = this.state.lists.map((list) => {
      return (
        <tr>
          <td>{list.listName}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => this.addItem(list._id)}
            >
              Add Item
                            </button>
          </td>
        </tr>
      )
    })
    if (this.state.products.length != 0) {
      let products = this.state.products[0].data;
      console.log("ITEMS ARRAY ", products);
      productdet = products.map((product) => {
        let productimg = isFieldEmpty(product.item_image)
          ? product_image
          : product.item_image;
        // let productimg = product_image;
        return (
          <div>
            {/* <div className="col-2">
              <SideBar />
            </div> */}
            <div id="itemAdminRight">
              <div className="col">

                <div className="card" id="cardadminclass">

                  <img
                    src={productimg}
                    className="card-img-top"
                    id="cardadmin-img-top"
                    alt="..."
                  />
                  <div className="card-block" id="cardadmin-title-text" style={{ "height": "8em" }}>
                    <h6 className="card-title lead" id="cardadmin-title">
                      <span>{product.name}</span>

                    </h6>
                    <p className="card-text lead" id="cardadmin-text">
                      {/* Quantity : {product.quantity} */}
                    </p>
                    <p className="card-text lead" id="cardadmin-text">
                      {/* Brand : {product.brandName} */}
                    </p>

                    <span>
                      <p className="card-text lead" id="cardadmin-text">
                        {/* Price : ${product.price} */}
                      </p>
                    </span>
                    <button
                      className="btn btn-primary"
                      id="rmbutton"
                      onClick={() => this.editModal(product)}
                    >
                      Add to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    return <div><h2>Recommendations</h2>
      <div className="container" id="recom" lg="4" md="6" xs="6">
        {productdet}
      </div>
      <Modal
        isOpen={this.state.modal}
        toggle={() => this.showModal()}
        className="modal-popup"
        scrollable
      >
        <ModalHeader
          toggle={() => this.showModal()}
          close={closeBtn}
        >
          Add Item to List
                    </ModalHeader>
        <ModalBody className="modal-body">
          {this.state.lists.length > 0 ? (
            <div className="col-10">
              <table className="table table-striped table-bordered lead">
                <thead>
                  <tr>
                    <th>List Name</th>
                  </tr>
                </thead>
                <tbody>{listnames}</tbody>
              </table>
            </div>
          ) : (
              <div>
                <h4 style={{ margin: "3em" }}>No Lists to display!</h4>
              </div>
            )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => this.showModal()}
          >
            Cancel
                      </Button>
        </ModalFooter>
      </Modal>
      <NotificationAlert ref="notify" />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Recommendation);
