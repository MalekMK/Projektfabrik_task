import React, { Component } from "react";
import {
  Col,
  CardDeck,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { FaShoppingBasket } from "react-icons/fa";

import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import PropTypes from "prop-types";
import OrderModal from "../orders/OrderModal";

export class ItemList extends Component {
  state = {
    item: [],
    search: "",
  };

  componentDidMount() {
    this.props.getItems();
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { items } = this.props.item;
    let filteredItem = items.filter(
      ({ _id, name, description, image, quantity, price }) => {
        return (
          name.toLowerCase().indexOf(this.state.search) !== -1 ||
          name.indexOf(this.state.search) !== -1
        );
      }
    );
    const itemCards = filteredItem.map(
      ({ _id, name, description, image, quantity, price }) => (
        <Col sm="4" key={_id}>
          <Card style={{ marginBottom: "50px" }}>
            <CardImg
              top
              width="100%"
              height="215px"
              src={image}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle
                className="pr-5"
                style={{ fontSize: "24px", color: "black", fontWeight: "500" }}
              >
                {name}
              </CardTitle>
              <CardSubtitle
                className="mb-2 mt-1"
                style={{ fontSize: "14px", color: "gray" }}
              >
                {description}
              </CardSubtitle>
              <CardText>
                <FaShoppingBasket
                  className="mb-1 mr-2"
                  style={{ fontSize: "20px" }}
                />
                <strong> {price} EUR </strong>
              </CardText>
              <CardText>
                {quantity === "0" ? (
                  <strong style={{ color: "red" }}>OUT OF STOCK</strong>
                ) : (
                  <strong>Quantity Remaining: {quantity} </strong>
                )}
              </CardText>
              <OrderModal
                id={_id}
                name={name}
                price={price}
                quantity={quantity}
              />
            </CardBody>
          </Card>
        </Col>
      )
    );
    return (
      <div>
        <div className="ml-3">
          <h1 className="display-3">Search for items</h1>
          <br />
          <input
            className="form-control col-4"
            placeholder="Search item by name"
            type="search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          <br />
        </div>
        <CardDeck className="row">{itemCards}</CardDeck>
      </div>
    );
  }
}

ItemList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, {
  getItems,
})(ItemList);
