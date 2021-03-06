import React, { Component } from "react";

// Reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";

import { connect } from "react-redux";
import { update } from "../actions/authActions";
import PropTypes from "prop-types";

class UserProfile extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.object,
    update: PropTypes.func,
  };

  state = {
    // name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    alertVisible: false,
    errorVisible: false,
  };

  checkInputValue = (e) => {
    if (e.target.value === e.target.defaultValue) {
      this.setState({ [e.target.name]: e.target.defaultValue });
    }
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log("Changed!");
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (
      !this.state.email ||
      !this.state.password ||
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.address
    ) {
      this.showErrorAlert();
      setTimeout(() => {
        this.setState({
          errorVisible: false,
        });
      }, 3000);
    } else {
      // Create user object
      const updatedUser = {
        // name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
      };

      // Attempt to register
      this.props.update(window.location.pathname.substring(7), updatedUser);

      this.showAlert();

      setTimeout(() => {
        window.location = "/";
      }, 1000);
    }
  };

  render() {
    return (
      <>
        <div className="content">
          {this.props.user ? (
            <div>
              <Alert color="success" isOpen={this.state.alertVisible}>
                Profile successfully updated!
              </Alert>
              <Alert color="danger" isOpen={this.state.errorVisible}>
                Please check all fields!
              </Alert>
              <Row>
                <Col md="12">
                  <Card
                    body
                    inverse
                    style={{ backgroundColor: "#333", borderColor: "#333" }}
                  >
                    <Col className="pr-md-1">
                      <h5 className="title">Edit Profile</h5>
                    </Col>
                    <CardBody>
                      <Form onSubmit={this.onSubmit}>
                        <Row>
                          <Col className="pr-md-3" md="3">
                            <FormGroup>
                              <label htmlFor="name">Username</label>
                              <Input
                                disabled
                                name="name"
                                defaultValue={this.props.user.name}
                                onChange={this.onChange}
                                onMouseLeave={this.checkInputValue}
                                placeholder="Username"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pl-md-3" md="5">
                            <FormGroup>
                              <label htmlFor="email">Email address</label>
                              <Input
                                name="email"
                                placeholder="username@email.com"
                                type="email"
                                defaultValue={this.props.user.email}
                                onChange={this.onChange}
                                onMouseLeave={this.checkInputValue}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-3" md="5">
                            <FormGroup>
                              <label htmlFor="password">Password</label>
                              <Input
                                name="password"
                                placeholder="********"
                                type="password"
                                defaultValue={this.props.user.password}
                                onChange={this.onChange}
                                onMouseLeave={this.checkInputValue}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-md-3" md="5">
                            <FormGroup>
                              <label htmlFor="firstName">First Name</label>
                              <Input
                                name="firstName"
                                defaultValue={this.props.user.firstName}
                                onChange={this.onChange}
                                onMouseLeave={this.checkInputValue}
                                placeholder="Company"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-3" md="5">
                            <FormGroup>
                              <label htmlFor="lastName">Last Name</label>
                              <Input
                                name="lastName"
                                defaultValue={this.props.user.lastName}
                                onChange={this.onChange}
                                onMouseLeave={this.checkInputValue}
                                placeholder="Last Name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="10">
                            <FormGroup>
                              <label htmlFor="address">Address</label>
                              <Input
                                name="address"
                                defaultValue={this.props.user.address}
                                onChange={this.onChange}
                                onMouseLeave={this.checkInputValue}
                                placeholder="Home Address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <div className="mt-5">
                          <Button
                            onClick={this.printState}
                            className="btn-fill"
                            color="warning"
                            type="submit"
                            style={{ width: "100px" }}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { update })(UserProfile);
