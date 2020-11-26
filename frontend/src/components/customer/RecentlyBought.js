import React, { Component } from 'react';
import axios from "axios";
import productimg from "../../images/grocery.jpg";
import "./Recommende.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';

class RecentlyBought extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lists: [],
          items:[],
          product_id:"",
          category:"",
          itemName:"",
          brandName:"",
          store:"",
          price:"",
          modal: false
        }
     }

     showModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    editModal = (product) => {
      this.setState({
        product_id : product.item.product_id,
        category : product.item.category,
        itemName : product.item.itemName,
        brandName : product.item.brandName,
        store : product.item.store,
        price: product.item.price,
        modal: !this.state.modal
      })
    }

    componentDidMount() {
    axios("/recentlyBought", {
      method: "get",
    }).then((res) => {
      this.setState({
        items: this.state.items.concat(res.data),
      });
      console.log("these are items ", this.state.items);
    });

    axios("/getList", {
      method: "get",
    }).then((response) => {
      this.setState({
        lists: this.state.lists.concat(response.data),
      });
      console.log("In list ",this.state.lists);
    });
    }

    addItem = (listid) => {
      const data = {
        list_id : listid,
        itemName: this.state.itemName,
        product_id: this.state.product_id,
        category: this.state.category,
        brandName : this.state.brandName,
        store : this.state.store,
        price: this.state.price
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
                window.location.reload();
              })
              .catch((error) => console.log(error.response.data));
            // var options = {};
            // options = {
            //   place: "tr",
            //   message: <div>Item added</div>,
            //   type: "info",
            //   icon: "fas fa-bell",
            //   autoDismiss: 5,
            //   closeButton: true,
            // };
            // this.refs.notify.notificationAlert(options);
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

    render() {
      const closeBtn = (
            <button className="close" onClick={() => this.showModal()}>
                &times;
            </button>
        );

    let products;
    let listnames = this.state.lists.map((list) => {
      return (
        <tr>
                        <td>{list.listName}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick = {() => this.addItem(list._id)}
                            >
                                Add Item
                            </button>
                        </td>
                    </tr>
      )
    })
    console.log("ITEMS ===", this.state.items[0]);

    if (this.state.items != undefined) {
      let items = this.state.items;
      console.log("ITEMS ARRAY ", items.item);
      products = items.map((product) => {
        //   let productimg = isFieldEmpty(product.products.productImage[0])
        //     ? product_image
        //     : product.products.productImage[0];
        // let productimg = product_image;
        return (
          <div>
            <div id="itemAdminRight">
              <div className="col">
                <div className="card" id="cardadminclass">
                  
                  <img
                    src={productimg}
                    className="card-img-top"
                    id="cardadmin-img-top"
                    alt="..."
                  />
                  <div className="card-block" id="cardadmin-title-text" style={{"height":"8em"}}>
                    <h6 className="card-title lead" id="cardadmin-title">
                      <span>{product.item.itemName}</span>
                      
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


        return (
            <div>
                <h2>Recently Bought:</h2>
                <div className="container" id="recom">
                    {products}
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
            </div>
        )
    }
}

export default RecentlyBought;