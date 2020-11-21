import React, { Component } from 'react';
import { hostaddress } from "../auth/settings";
import CustomerNavbar from "../customer/CustomerNavbar";
// import './ItemsList.css';
import CategoryList from '../categories/CategoryList';
import ItemListSelector from './ItemListSelector';
import product_image from "../../images/grocery.jpg";
import '../../App.css';
import { isFieldEmpty } from "../auth/HelperApis";

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      category: 'Fruits and Vegetables',
      categoryList: [],
      showItemListSelector: false,
      selectedItem: null
    };
  }

  toggleItemListSelector(selectedItem) {
    this.setState({
      showItemListSelector: !this.state.showItemListSelector,
      selectedItem: selectedItem
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
    console.log(items);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div>
          <CustomerNavbar />
          <div className="container">
          <h3>Shop Popular Items</h3>

          < br />
          <CategoryList categoriesList={this.state.categoryList} func={this.handleCategoryChange.bind(this)} />

          < br />
          < br />
          <div className="row">
            {items.map(item => (

              < div id="itemAdminRight" key={item._id} >
                <div className="col">
                  <div className="card" id="cardadminclass">
                    {/* {unknown} */}
                    <img
                      src={isFieldEmpty(item.item_image)
                        ? product_image
                        : item.item_image
                      }
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
                        <button onClick={this.toggleItemListSelector.bind(this, item)}>Add to List</button>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  this.state.showItemListSelector ?

                    <ItemListSelector
                      item={item}
                      selectedItem={this.state.selectedItem}
                      closeItemListSelector={this.toggleItemListSelector.bind(this, item)} onClick={this.handleClick}
                    />
                    : null
                }


              </div>

            ))}
          </div>


                </div>
        </div >
      );
    }
  }
}

export default ItemsList;


