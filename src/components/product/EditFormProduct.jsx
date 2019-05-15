import React, { Component } from "react";
import { getProduct, updateProduct } from "../../api/apiHandler";
import { isLoggedIn } from "../../auth/utility";
import { Redirect } from "react-router-dom";

export default class EditFormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneProduct: {},
      inputProductBrand: "",
      inputSN: "",
      inputMI: "",
      inputPrice: "",
      inputRating: "",
      inputCat: "",
      inputType: ""
    };
  }

  componentDidMount() {
    getProduct(this.props.match.params.id)
      .then(dbRes => {
        console.log("lol", dbRes.data);
        this.setState({
          oneProduct: dbRes.data,
          inputProductBrand: dbRes.data.productBrand,
          inputSN: dbRes.data.serialNumber,
          inputMI: dbRes.data.manufacturerInfo,
          inputPrice: dbRes.data.price,
          inputRating: dbRes.data.rating,
          inputCat: dbRes.data.category,
          inputType: dbRes.data.type
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

  handleSubmit = () => {
    const {
      inputProductBrand,
      inputSN,
      inputMI,
      inputPrice,
      inputRating,
      inputCat,
      inputType
    } = this.state;
    updateProduct(
      this.props.match.params.id,
      inputProductBrand,
      inputSN,
      inputMI,
      inputPrice,
      inputRating,
      inputCat,
      inputType
    )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err.response));
  };

  render() {
    const { inputProductBrand } = this.state;
    return isLoggedIn() ? (
      <div className="field">
        <h1 className="title">Edit</h1>
        <form>
          <label className="label">Product:</label>
          <input
            type="text"
            id="productBrand"
            name="inputProductBrand"
            value={inputProductBrand || ""}
            onChange={this.handleInputChange}
          />
          <label className="label">Serial Number:</label>
          <input
            type="text"
            id="serialNumber"
            name="inputSN"
            value={this.state.inputSN || ""}
            onChange={this.handleInputChange}
          />
          <label className="label">Manufacturer Information:</label>
          <input
            type="text"
            id="manufacturerInfo"
            name="inputMI"
            value={this.state.inputMI || ""}
            onChange={this.handleInputChange}
          />
          <label className="label">Price(€):</label>
          <input
            type="number"
            id="price"
            name="inputPrice"
            min="0"
            value={this.state.inputPrice || ""}
            onChange={this.handleInputChange}
          />
          <label className="label">Rating:</label>
          <input
            type="number"
            id="rating"
            name="inputRating"
            min="1"
            step="1"
            max="5"
            value={this.state.inputRating || ""}
            onChange={this.handleInputChange}
          />
          <label className="label">Category:</label>
          <input
            type="input"
            id="category"
            name="inputCat"
            value={this.state.inputCat || ""}
            onChange={this.handleInputChange}
          />
          <label className="label">Type:</label>
          <input
            type="input"
            id="type"
            name="inputType"
            value={this.state.inputType || ""}
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
    ) : (
      window.confirm("please login/signup for Product Form") && (
        <Redirect to="/login" />
      )
    );
  }
}
