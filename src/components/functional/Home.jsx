import React, { Component } from "react";
import { getAllProducts } from "../../api/apiHandler";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../auth/utility";
import Typed from "react-typed";
import "./styling.css";

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
      <section>
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
      </section>
    ) : (
      <section>
        <ul className="list products">
          <br />
          <br />
          <br />
          <div>
            <Typed
              strings={[
                "Welcome to our community, here you can find anything <3"
              ]}
              typeSpeed={60}
            />
            <br />

            <Typed
              strings={[
                "Search for products",
                "Search for categories",
                "Search for brands"
              ]}
              typeSpeed={40}
              backSpeed={50}
              attr="placeholder"
              loop
            >
              <input type="text" />
            </Typed>
          </div>
          <br />
          <p>
            Would you like to discover more?{" Please Login/Sign Up "}
            <br />
            <br />
            <div class="control">
              <a href="/login" class="button is-link">
                Login
              </a>
            </div>
            <br />
            <div class="control">
              <a href="/signup" class="button is-link">
                Sign Up
              </a>
            </div>
          </p>
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
      </section>
    );
  }
}
