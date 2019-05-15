import React, { Component } from "react";
import { getAllProducts } from "../../api/apiHandler";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../auth/utility";

export default class ProductsList extends Component {
  state = { products: [] };
  componentDidMount() {
    getAllProducts()
      .then(res => this.setState({ products: res.data }))
      .catch(err => console.error(err.response));
  }

  render() {
    const { products } = this.state;
    return isLoggedIn() ? (
      <ul className="list products">
        {products.map((product, index) => (
          <li className="clickable item product" key={index}>
            <Link to={`api/product`}>
              {product.isFrontPage === true && (
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-128x128">
                          <img
                            class="is-rounded"
                            src={product.image}
                            alt="ProductImage"
                          />
                        </figure>
                      </div>

                      <div class="media-content">
                        <p class="title is-4">
                          Product: {product.productBrand}
                        </p>
                        <p class="subtitle is-6">Price(€): {product.price}</p>
                      </div>
                    </div>

                    <div class="content">
                      <p>Comment: {product.comment}</p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <ul className="list products">
        <br />
        <br />
        <br />
        <p>Would you like to discover more? please login/signup</p>
        {products.map((product, index) => (
          <li className="clickable item product" key={index}>
            <Link to={`api/product`}>
              {product.isFrontPage === true && (
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-128x128">
                          <img
                            class="is-rounded"
                            src={product.image}
                            alt="ProductImage"
                          />
                        </figure>
                      </div>

                      <div class="media-content">
                        <p class="title is-4">
                          Product: {product.productBrand}
                        </p>
                        <p class="subtitle is-6">Price(€): {product.price}</p>
                      </div>
                    </div>

                    <div class="content">
                      <p>Comment: {product.comment}</p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
