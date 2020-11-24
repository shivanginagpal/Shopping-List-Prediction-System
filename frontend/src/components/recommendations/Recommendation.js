import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import product_image from "../../images/grocery.jpg";
import { isFieldEmpty } from "../auth/HelperApis";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      itemsNum: [120, 4261, 37761],
      items: [],
      products :[]
    };
  }
  componentDidMount() {
    if (this.props.auth) {
      console.log("user is", this.props.auth.user.id);
    }
    fetch(
      "http://localhost:5000/get_prediction/user_id=" + this.props.auth.user.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
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
      product : this.state.itemsNum
    }
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

   isFieldEmpty = (prop)=>{
    if(prop === "" || prop === null || typeof prop === "undefined"){
        return true;
    } else{
        return false;
    }
};
  render() {
    let productdet;
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

    return <div>"Recommended Products:"
      <div className="container" id="recom">
                    {productdet}
                </div>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Recommendation);
