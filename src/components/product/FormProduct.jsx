import React, { Component } from "react";
import { createProduct } from "../../api/apiHandler";
import { isLoggedIn } from "../../auth/utility";
import { Redirect } from "react-router-dom";
import { getLocalToken } from "./../../auth/utility";

export default class FormProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productBrand: "",
      serialNumber: "",
      manufacturerInfo: "",
      price: "",
      rating: "",
      category: "",
      type: "",
      comment: "",
      image: null,
      isFrontPage: false
    };
    this.user = getLocalToken();
  }

  handleFormSubmit = evt => {
    evt.preventDefault();

    const productData = new FormData();

    productData.set("productBrand", this.state.productBrand);
    productData.set("serialNumber", this.state.serialNumber);
    productData.set("manufactureInfo", this.state.manufacturerInfo);
    productData.set("price", this.state.price);
    productData.set("category", this.state.category);
    productData.set("rating", this.state.rating);
    productData.set("type", this.state.type);
    productData.set("comment", this.state.comment);
    productData.append("image", this.state.image);
    productData.set("isFrontPage", this.state.isFrontPage);

    createProduct(productData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err.response));
  };

  handleInputChange = evt => {
    console.log(evt.target.name, evt.target.value);
    var { name, value } = evt.target;
    if (evt.target.files) {
      value = evt.target.files[0];
    }
    this.setState({ [name]: value });
  };

  render() {
    return isLoggedIn() ? (
      <div class="field">
        <h1 className="title">Add a new cosmestic</h1>
        <form onSubmit={this.handleFormSubmit}>
          {this.user && this.user.role === "admin" && (
            <div>
              <label class="label">On the front Page: </label>
              <input
                type="radio"
                id="isFrontPage"
                name="isFrontPage"
                value="true"
                onChange={this.handleInputChange}
              />{" "}
              True
              <input
                type="radio"
                id="isFrontPage"
                name="isFrontPage"
                value="false"
                onChange={this.handleInputChange}
              />
              False
            </div>
          )}

          <label class="label">Product:</label>
          <input
            type="text"
            id="productBrand"
            name="productBrand"
            onChange={this.handleInputChange}
          />

          <label class="label">Serial Number:</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            onChange={this.handleInputChange}
          />

          <label class="label">Manufacturer Information:</label>
          <input
            type="text"
            id="manufacturerInfo"
            name="manufacturerInfo"
            onChange={this.handleInputChange}
          />

          <label class="label">Price(€):</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            onChange={this.handleInputChange}
          />

          <label class="label">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            step="1"
            max="5"
            onChange={this.handleInputChange}
          />

          <label class="label">Category:</label>
          <input
            type="input"
            id="category"
            name="category"
            onChange={this.handleInputChange}
          />

          <label class="label">Type:</label>
          <input
            type="input"
            id="type"
            name="type"
            onChange={this.handleInputChange}
          />

          <label class="label">Comment:</label>
          <textarea
            class="textarea is mobile "
            id="comment"
            name="comment"
            placeholder="Tell us how you like/dislike the product"
            onChange={this.handleInputChange}
          />
          <p class="help is-success">Never stop bitching Yo!:p</p>

          <input name="image" type="file" onChange={this.handleInputChange} />
          <input class="button is-link" type="submit" value="Submit" />
        </form>
      </div>
    ) : (
      window.confirm("please login/signup for Product Form") && (
        <Redirect to="/login" />
      )
    );
  }
}
