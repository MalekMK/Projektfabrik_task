import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { addOrder } from "../../actions/orderActions";
import { editItem } from "../../actions/itemActions";
import PropTypes from "prop-types";

class OrderModal extends Component {
  state = {
    orderModal: false,
    alertVisible: false,
    errorVisible: false,
    errorQuantityVisible: false,
    quantity: "0",
    totalAmount: "0",
    name: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    quantity: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
    addOrder: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
  };

  showAlert = () => {
    this.setState({
      alertVisible: true,
    });
  };

  showErrorAlert = () => {
    this.setState({
      errorVisible: true,
    });
  };

  showErrorQuantity = () => {
    this.setState({
      errorQuantityVisible: true,
    });
  };

  toggle = () => {
    this.setState({
      orderModal: !this.state.orderModal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "quantity" && e.target.value) {
      let totalAmount = parseInt(this.props.price) * parseInt(e.target.value);
      this.setState({ totalAmount: totalAmount });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      parseInt(this.state.quantity) > parseInt(this.props.quantity) ||
      parseInt(this.state.quantity) <= 0
    ) {
      this.showErrorQuantity();
      setTimeout(() => {
        this.setState({
          errorQuantityVisible: false,
        });
      }, 3000);
    } else {
      const newOrder = {
        name: this.props.name,
        quantity: this.state.quantity,
        total: this.state.totalAmount
      };
      const updatedItem = {
        quantity: this.props.quantity - this.state.quantity,
      };

      // Add order via addOrder action
      this.props.addOrder(newOrder);

      //modify the stock quantity
      this.props.editItem(this.props.id, updatedItem);

      this.showAlert();

      setTimeout(() => {
        // Close modal
        this.toggle();
        this.setState({
          alertVisible: false,
        });
        window.location = "/items";
      }, 2000);
    }
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            outline
            color="dark"
            className="mb-2 mt-2"
            width="150px"
            onClick={this.toggle}
            disabled={this.props.quantity === "0"}
          >
            Order
          </Button>
        ) : (
          <Alert color="danger">
            Please <strong>Log In</strong> or <strong>Register</strong> to order
            item
          </Alert>
        )}

        <Modal isOpen={this.state.orderModal} toggle={this.toggle}>
          <Alert
            className="mx-3 my-3"
            color="success"
            isOpen={this.state.alertVisible}
          >
            Your item has been successfully ordered
          </Alert>
          <Alert
            className="mx-3 my-3"
            color="danger"
            isOpen={this.state.errorVisible}
          >
            Please enter all fields
          </Alert>
          <Alert
            className="mx-3 my-3"
            color="danger"
            isOpen={this.state.errorQuantityVisible}
          >
            Please choose quantity less or equal to {this.props.quantity}
          </Alert>
          <ModalHeader toggle={this.toggle}>Add To Ordering List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name" className="my-3">
                  <strong>{this.props.name}</strong>
                </Label>

                <Label for="quantity" className="my-3">
                  <strong>Quantity</strong>
                </Label>
                <Input
                  type="number"
                  name="quantity"
                  min="0"
                  id="quantity"
                  placeholder="Quantity"
                  onChange={this.onChange}
                  className="my-3"
                />

                <Label for="total_amount" className="my-3">
                  <strong style={{ color: "red" }}>
                    TOTAL AMOUNT: {this.state.totalAmount} EUR
                  </strong>
                </Label>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add to ordering list
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addOrder, editItem })(OrderModal);
