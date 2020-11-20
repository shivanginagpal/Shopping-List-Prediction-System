import React, { Component } from 'react';
import CustomerNavbar from "../customer/CustomerNavbar";
import SideBar from "../layout/SideBar";
import axios from "axios";
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {hostaddress} from "../auth/settings";

class addList extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      listName: "",
      listType: "",
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
  componentDidMount() {
    axios("/getList", {
      method: "get",
    }).then((response) => {
      this.setState({
        lists: this.state.lists.concat(response.data),
      });
      console.log(this.state.lists);
    });
  }
  deletelist = (listid) => {
    const data = {
      list_id : listid
    }
    axios("/deleteList", {
      method: "delete",
      data: data,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        swal({
          title: "Success",
          text: "List removed successfully",
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
  addlist = (e) => {
    const data = {
      listName: this.state.listName,
      listType: this.state.listType,
    };
    axios("/createNewList", {
      method: "post",
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.showModal();
          swal({
            title: "Success",
            text: "List added successfully",
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

    let listheaders = this.state.lists.map((viewlist) => {
      let url = "http://" + hostaddress + ":3000/viewItems/" + viewlist._id;
      return (
        <div class="card w-100" id="eventscard">
          <div class="card-body">
            <div className="row">
              <h5 class="card-title col-7" id="eventtext">
                List name: {viewlist.listName}
              </h5>
              <div className="col-3"></div>
              <div className="col-2">
                <span>
                  <div className="row">
                    <button
                      type="button"
                      className="close"
                      id="deletebtnlist"
                      aria-label="Close"
                      onClick={() => this.deletelist(viewlist._id)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </span>
                <a href={url} type="button" class="btn btn-outline-success">
                  view items
                </a>
              </div>
            </div>
            <p class="card-text" id="eventtext">
              No.of items in the list: {viewlist.item.length}
            </p>
            <div className="row">
              <div className="col-10"></div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <CustomerNavbar />
        <div className="row">
          <div className="col-4">
            <SideBar />
          </div>

          <div className="col-8">
            <button
              type="button"
              class="btn btn-success"
              id="addListbtn"
              onClick={() => this.showModal()}
            >
              Create List
            </button>
            <div className="row justify-content-center align-items-center">
              <div className="col-12">
                <div className="dash-one">
                  <h4 className="font-weight-bold">Your Lists</h4>
                  {this.state.lists.length > 0 ? (
                    <div className="col-10">{listheaders}</div>
                  ) : (
                    <div>
                      <h4 style={{ margin: "3em" }}>No lists to display!</h4>
                    </div>
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
            Add List
          </ModalHeader>
          <ModalBody className="modal-body">
            {/* <form > */}
            <div className="form-group">
              <label className="font-weight-bold">List Name:</label>
              <input
                onChange={this.handleChange}
                name="listName"
                className="form-control"
                type="text"
                required
              ></input>
              <br />
            </div>

            <div class="form-group">
              <label className="font-weight-bold">List Type:</label>
              <select
                class="form-control"
                name="listType"
                onChange={this.handleChange}
              >
                <option>Grocery List</option>
                <option>Shopping List</option>
                <option>Accessory List</option>
                <option>Casual List</option>
                <option>Any List</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={() => this.addlist()}>
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

export default addList;