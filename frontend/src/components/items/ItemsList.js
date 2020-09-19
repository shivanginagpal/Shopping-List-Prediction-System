import React, { Component } from 'react';
import {hostaddress} from "../auth/settings";
import CustomerNavbar from "../customer/CustomerNavbar";
import './ItemsList.css';

class ItemsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("http://"+hostaddress+":3000/items")
        .then(res => res.json())
        .then(
          result => {
            console.log(JSON.stringify(result));
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          error => {
            console.log(JSON.stringify(error));
            this.setState({
              isLoaded: true,
              error: error
            });
          }
        );
    }
  
    render() {
      
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        console.log(this.state.items);
        return (
         <div>
            <CustomerNavbar />
          <ul>
            <h3>Shop Popular Items</h3>
            {items.map(item => (
              <li className ="items_List" key={item._id}>
                <h3> {item.name}</h3>
                {/* <p>Quantity: {item.quantity}</p> */}
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Price:</strong> {item.price}</p>
                <input  type="number" id="number"  min="0" max="100" />
                <button>Add to List</button>
              </li>
            ))}
          </ul>
          </div>
        );
      }
    }
  }

  export default ItemsList;