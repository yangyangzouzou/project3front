import React, { Component } from "react";
import { createProduct } from "../../api/apiHandler";
import { isLoggedIn } from "../../auth/utility";
import { Redirect } from "react-router-dom";
import { getLocalToken } from "./../../auth/utility";
import "./styling.css";

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
      <section>
        <h1 className="title">Add a new product</h1>
        <form onSubmit={this.handleFormSubmit}>
          {this.user && this.user.role === "admin" && (
            <div>
              <div class="field" />{" "}
              <label class="label">On the front Page: </label>
              <input
                type="radio"
                id="isFrontPage"
                name="isFrontPage"
                value="true"
                onChange={this.handleInputChange}
              />{" "}
              <span> &nbsp; </span>
              True <br />
              <input
                type="radio"
                id="isFrontPage"
                name="isFrontPage"
                value="false"
                onChange={this.handleInputChange}
              />{" "}
              <span> &nbsp; </span>
              False
            </div>
          )}
          <br />
          <div class="field">
            <label class="label">Product:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="productBrand"
                name="productBrand"
                placeholder="e.g BB Cream Guerlin"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div class="field">
            {" "}
            <label class="label">Serial Number:</label>
            <input
              class="input"
              type="text"
              id="serialNumber"
              name="serialNumber"
              onChange={this.handleInputChange}
              placeholder="e.g SD456"
            />
          </div>
          <div class="field">
            {" "}
            <label class="label">Manufacturer Information:</label>
            <input
              class="input"
              type="text"
              id="manufacturerInfo"
              name="manufacturerInfo"
              placeholder="e.g France"
              onChange={this.handleInputChange}
            />
          </div>
          <div class="field">
            {" "}
            <label class="label">Price(€):</label>
            <input
              class="input"
              type="number"
              id="price"
              name="price"
              min="0"
              placeholder="e.g 13.5"
              onChange={this.handleInputChange}
            />
          </div>
          <div class="field">
            {" "}
            <label class="label">Rating:</label>
            <input
              class="input"
              type="number"
              id="rating"
              name="rating"
              min="1"
              step="1"
              max="5"
              placeholder="From 1 - 5, don't be so nice <3"
              onChange={this.handleInputChange}
            />
          </div>
          <div class="field">
            {" "}
            <label class="label">Category:</label>
            <input
              class="input"
              type="input"
              id="category"
              name="category"
              placeholder="e.g Face Primer"
              onChange={this.handleInputChange}
            />
          </div>
          <div class="field">
            {" "}
            <label class="label">Type:</label>
            <input
              class="input"
              type="input"
              id="type"
              name="type"
              placeholder="e.g Mineral"
              onChange={this.handleInputChange}
            />
          </div>
          <div class="field">
            {" "}
            <label class="label">Comment:</label>
            <textarea
              class="textarea "
              id="comment"
              name="comment"
              placeholder="Tell us how you like/dislike the product"
              onChange={this.handleInputChange}
            />
            <p class="help is-success">Never stop bitching Yo!:p</p>
          </div>
          <input name="image" type="file" onChange={this.handleInputChange} />
          <br />
          <br />
          <input class="button is-link" type="submit" value="Submit" />
        </form>
      </section>
    ) : (
      window.confirm("please login/signup for Product Form") && (
        <Redirect to="/login" />
      )
    );
  }
}
