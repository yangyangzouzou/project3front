import React, { Component } from "react";
import { getAllProducts, deleteProduct } from "../../api/apiHandler";
import { getLocalToken } from "./../../auth/utility";
import { isLoggedIn } from "../../auth/utility";
import { Redirect, Link } from "react-router-dom";

export default class DashboardProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.user = getLocalToken();
  }
  componentDidMount() {
    getAllProducts()
      .then(res => this.setState({ products: res.data }))
      .catch(err => console.error(err.response));
  }

  handleDelete = e => {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    deleteProduct(id)
      .then(res => this.setState({ products: res.data }))
      .catch(err => console.error(err.response));
  };
  render() {
    console.log(this.state.products[0], "aaaaaaaaaaaaaaa");

    return isLoggedIn() ? (
      <table class="table">
        <thead>
          <tr className="row">
            <th>
              <abbr title="ProductBrand">Product</abbr>
            </th>
            <th>
              <abbr title="Price">Price</abbr>
            </th>
            <th>
              <abbr title="Rating">Rating</abbr>
            </th>

            <th>
              <abbr title="Edit">Edit</abbr>
            </th>

            {this.user && this.user.role === "admin" && (
              <th>
                <abbr title="Delete" />
              </th>
            )}
          </tr>
        </thead>
        <tbody className="body">
          {!this.state.products.length ? (
            <tr className="row">
              <td className="cell" colSpan="10">
                no products yet
              </td>
            </tr>
          ) : (
            this.state.products.map((product, index) => (
              <tr className="row" key={index}>
                <th>
                  <abbr title="ProductBrand">{product.productBrand}</abbr>
                </th>
                <th>
                  <abbr title="Price">{product.price}</abbr>
                </th>
                <th>
                  <abbr title="Rating">{product.rating}</abbr>
                </th>
                <th>
                  <Link to={`/edit/${product._id}`}>Edit</Link>
                </th>

                {this.user && this.user.role === "admin" && (
                  <th
                    className="delete"
                    data-id={product._id}
                    onClick={this.handleDelete}
                  />
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    ) : (
      window.confirm("please login/signup for Product Form") && (
        <Redirect to="/login" />
      )
    );
  }
}
