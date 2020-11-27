import React, { Component } from 'react';
import productimg1 from "../../images/2.jpeg";
import productimg2 from "../../images/grocery.jpg";
import productimg3 from "../../images/3.jpeg";

class Carousel extends Component {

  render() {
    return (
      <div>
        <div className="carcontent">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={productimg1} alt="First slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={productimg2} alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={productimg3} alt="Third slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel;
