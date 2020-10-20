import React, { Component } from 'react';
import axios from "axios";
import swal from "sweetalert";
import "./additem.css";

class DisplayAddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      suggestions: [],
      text: "",
      itemObj:""
    };
  }

  componentDidMount = () => {
    axios("/items", {
      method: "get",
    }).then((res) => {
      this.setState({
        items: this.state.items.concat(res.data),
      });
      console.log("these are items ", this.state.items);
    });
  };
  onTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "gi");
      suggestions = this.state.items.sort().filter((item) => {
        return item.name.match(regex);
      });
      console.log("THESE ARE MATCHES", suggestions);
    }
    this.setState(() => ({ suggestions, text: value }));
  }; 
    

     i

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li onClick={() => this.suggestionSelected(item)}>{item.name}</li>
        ))}
      </ul>
    );
  }

  suggestionSelected(value) {
      console.log("THIS IS VALUE", value);
    this.setState(() => ({
        itemObj:value,
      text: value.name,
      suggestions: [],
    }));
  }

  addItem = () => {
      const listid = this.props.listid;
      const data = {
          list_id : listid,
          itemName: this.state.itemObj.name,
          product_id: this.state.itemObj.product_id,
      };
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
console.log("THIS IS THE SELECTED ITEM", this.state.itemObj);
      this.setState({
          text:''
      })
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <div className="additem">
              <input
                className="form-control form-control-lg"
                placeholder="Enter item name"
                value={text}
                onChange={this.onTextChange}
                type="text"
              />
              {this.renderSuggestions()}
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          id="rmbutton"
          onClick={() => this.addItem()}
        >
          Add Item
        </button>
      </div>
    );
  }
}

export default DisplayAddItems;
