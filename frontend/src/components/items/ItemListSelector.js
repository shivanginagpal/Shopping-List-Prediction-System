import React from 'react';
import './ItemsList.css';
import axios from "axios";
import swal from "sweetalert";
import { hostaddress } from "../auth/settings";

class ItemListSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lists: [],
      selectedListName: null,
      listMap: new Map()
    };
  }

  componentDidMount() {
    axios("/getList", {
      method: "get",
    }).then((response) => {
      var listMap = response.data.reduce(function (map, obj) {
        map[obj.listName] = obj;
        return map;
      });
      this.setState({
        isLoaded: true,
        lists: response.data,
        selectedListName: response.data[0].listName,
        listMap: listMap
      });
    });
  }

  handleAddToList() {
    const data = {
      list_id: this.state.listMap[this.state.selectedListName]._id,
      itemName: 'test',
      quantity: 2,
      price: 10,
      brandName: 'test_brand',
    };
    axios("/addItemToList", {
      method: "put",
      data: data,
    })
      .then((response) => {
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
  }

  render() {
    console.log(this.props.selectedItem._id);
    console.log(this.props.item._id);
    if(this.props.selectedItem._id !== this.props.item._id) {
      console.log('returning....');
      return null;
    }
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{'Select from the below list'}</h1>
          <select id="list_dropdown" onChange={(event) => {
            this.setState({
              selectedListName: event.target.value,
            });
          }}>
            {this.state.lists.map((list) => <option key={list._id}>{list.listName}</option>)}
          </select>
          <br></br>
          <br></br>
          <button id="add_me" onClick={this.handleAddToList.bind(this)}>Add to List</button>
          <button id="close_me" onClick={this.props.closeItemListSelector} >Close</button>
        </div>
        </div>
    );
  }
}

export default ItemListSelector;