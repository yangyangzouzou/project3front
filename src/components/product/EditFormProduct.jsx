import React, { Component } from "react";
import { getProduct, updateProduct } from "../../api/apiHandler";
import { isLoggedIn } from "../../auth/utility";
import { Redirect } from "react-router-dom";
import "./styling.css";

export default class EditFormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneProduct: {},
      productBrand: "",
      serialNumber: "",
      manufacturerInfo: "",
      price: "",
      rating: "",
      category: "",
      type: ""
    };
  }

  componentDidMount() {
    getProduct(this.props.match.params.id)
      .then(dbRes => {
        console.log("lol", dbRes.data);
        this.setState({
          oneProduct: dbRes.data,
          productBrand: dbRes.data.productBrand,
          serialNumber: dbRes.data.serialNumber,
          manufacturerInfo: dbRes.data.manufacturerInfo,
          price: dbRes.data.price,
          rating: dbRes.data.rating,
          category: dbRes.data.category,
          type: dbRes.data.type
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = evt => {
    console.log(evt.target.name, evt.target.value);
    var { name, value } = evt.target;
    if (evt.target.files) {
      value = evt.target.files[0];
    }
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const {
      productBrand,
      serialNumber,
      manufacturerInfo,
      price,
      rating,
      category,
      type
    } = this.state;
    updateProduct(this.props.match.params.id, {
      productBrand,
      serialNumber,
      manufacturerInfo,
      price,
      rating,
      category,
      type
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err.response));
  };

  render() {
    const { productBrand } = this.state;
    return isLoggedIn() ? (
      <section>
        <div className="field">
          <h1 className="title">Edit</h1>
          <form onSubmit={event => this.handleSubmit(event)}>
            <label className="label">Product:</label>
            <input
              class="input"
              type="text"
              id="productBrand"
              name="productBrand"
              value={productBrand || ""}
              onChange={this.handleInputChange}
            />
            <label className="label">Serial Number:</label>
            <input
              class="input"
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={this.state.serialNumber || ""}
              onChange={this.handleInputChange}
            />
            <label className="label">Manufacturer Information:</label>
            <input
              class="input"
              type="text"
              id="manufacturerInfo"
              name="manufacturerInfo"
              value={this.state.manufacturerInfo || ""}
              onChange={this.handleInputChange}
            />
            <label className="label">Price(€):</label>
            <input
              class="input"
              type="number"
              id="price"
              name="price"
              min="0"
              value={this.state.price || ""}
              onChange={this.handleInputChange}
            />
            <label className="label">Rating:</label>
            <input
              class="input"
              type="number"
              id="rating"
              name="rating"
              min="1"
              step="1"
              max="5"
              value={this.state.rating || ""}
              onChange={this.handleInputChange}
            />
            <label className="label">Category:</label>
            <input
              class="input"
              type="input"
              id="category"
              name="category"
              value={this.state.category || ""}
              onChange={this.handleInputChange}
            />
            <label className="label">Type:</label>
            <input
              class="input"
              type="input"
              id="type"
              name="type "
              value={this.state.type || ""}
              onChange={this.handleInputChange}
            />
            {/* <label className="label">Comment:</label>
          <textarea
            className="textarea is mobile "
            id="comment"
            name="comment"
            value={this.state.oneProduct.comment}
            placeholder="Tell us how you like/dislike the product"
            onChange={this.handleInputChange}
          /> */}
            {/* <input name="image" type="file" onChange={this.handleInputChange} /> */}
            <input className="button is-link" type="submit" value="Submit" />
          </form>
        </div>
      </section>
    ) : (
      window.confirm("please login/signup for Product Form") && (
        <Redirect to="/login" />
      )
    );
  }
}
