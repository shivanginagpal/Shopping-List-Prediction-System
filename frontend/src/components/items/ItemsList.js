import React, { Component } from 'react';
import { hostaddress } from "../auth/settings";
import CustomerNavbar from "../customer/CustomerNavbar";
import './ItemsList.css';
import CategoryList from '../categories/CategoryList';



  

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      category: 'Fruits and Vegetables',
      categoryList: []
    };
  }



  
  componentDidMount() {
    fetch("http://" + hostaddress + ":3000/categories")
    .then(res => res.json())
    .then(
      categories_result => {
        fetch("http://" + hostaddress + ":3000/items?category=" + this.state.category)
        .then(res => res.json())
        .then(
          items_result => {
            this.setState({
              isLoaded: true,
              items: items_result,
              categoryList: categories_result,
            });
          },
          error => {
            this.setState({
              isLoaded: true,
              error: error
            });
          }
        );
      },
      error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    );
  }

  handleCategoryChange(category) {
    this.setState({
      category: category,
    }, () => {
      this.componentDidMount();
    });

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
            
      <CategoryList categoriesList={this.state.categoryList} func={this.handleCategoryChange.bind(this)}/>
  
     
            < br />
            {items.map(item => (
              <li className="items_List" key={item._id}>
                <p> <strong>{item.name}</strong></p>
                {/* <p>Quantity: {item.quantity}</p> */}
                {/* <p><strong>Category:</strong> {item.category}</p> */}
                { <p><strong>Description:</strong> {item.description}</p> }
                <input type="number" id="number" min="0" max="100" />
                <button >Add to List</button>
              </li>
            ))}

          </ul>
           
        </div>
      );
    }
  }
}

export default ItemsList;