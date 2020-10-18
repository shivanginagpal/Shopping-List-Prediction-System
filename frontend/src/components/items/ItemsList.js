import React, { Component } from 'react';
import { hostaddress } from "../auth/settings";
import CustomerNavbar from "../customer/CustomerNavbar";
import './ItemsList.css';
import CategoryList from '../categories/CategoryList';
import ItemListSelector from './ItemListSelector';
import product_image from "../../images/grocery.jpg";




class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      category: 'Fruits and Vegetables',
      categoryList: [],
      showItemListSelector: false,
    };
  }

  toggleItemListSelector() {
    this.setState({
      showItemListSelector: !this.state.showItemListSelector
    });
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
      return (
        <div>
          <CustomerNavbar />
          
            <h3>Shop Popular Items</h3>
            
            < br />
            <CategoryList categoriesList={this.state.categoryList} func={this.handleCategoryChange.bind(this)} />

          

            < br />
            < br />
            <div class ="row">
            {items.map(item => (
             
              <div id="itemAdminRight">
                <div className="col">
                  <div className="card" id="cardadminclass">
                    {/* {unknown} */}
                    <img
                      src={product_image}
                      className="card-img-top"
                      id="cardadmin-img-top"
                      alt="..."
                    />
                    <div className="card-block" id="cardadmin-title-text">
                  
              <div className="dash-one" key={item._id}>
              <h6 className="card-title lead" id="cardadmin-title">{item.name} </h6>
                {/* <p>Quantity: {item.quantity}</p> */}
                {/* <p><strong>Category:</strong> {item.category}</p> */}
                {<p><strong>Description:</strong> {item.description}</p>}
                <input type="number" id="number" min="0" max="100" />
                <button onClick={this.toggleItemListSelector.bind(this)}>Add to List</button>
                {this.state.showItemListSelector ?
                  <ItemListSelector
                    item={item}
                    closeItemListSelector={this.toggleItemListSelector.bind(this)} onClick={this.handleClick}
                  />
                  : null
                }
              </div>
              </div>
              </div>
              </div>
              </div>
             
            ))}
             </div>

          

        </div>
      );
    }
  }
}

export default ItemsList;

