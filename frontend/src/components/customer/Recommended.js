import React, { Component } from 'react';
import axios from "axios";
import productimg from "../../images/grocery.jpg";
import "./Recommende.css";

 class Recommended extends Component {
     constructor(props) {
        super(props);
        this.state = {
            items:[]
        }
     }

    componentDidMount() {
    axios("/items", {
      method: "get",
    }).then((res) => {
      this.setState({
        items: this.state.items.concat(res.data),
      });
      console.log("these are items ", this.state.items);
    });
     }

    render() {
    let products;


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
                  <div className="card-block" id="cardadmin-title-text">
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
                    //   onClick={() => this.editModal(product)}
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
                <h2>Recommendations</h2>
                <div className="container" id="recom">
                    
                    {products}
                </div>
                
            </div>
        )
    }
}

export default Recommended;
