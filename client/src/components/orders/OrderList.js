import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";
import PropTypes from "prop-types";

export class OrderList extends Component {
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    order: [],
    search: "",
  };

  componentDidMount() {
    this.props.getOrders();
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { order, auth } = this.props;
    let filteredOrders = order.orders.filter(
      ({ _id, name, username, date }) => {
        return (
          name.toLowerCase().indexOf(this.state.search) !== -1 ||
          name.indexOf(this.state.search) !== -1
        );
      }
    );

    const orderTableRows = filteredOrders.map(
      ({ _id, name, quantity, username, date, total }, i) => {
        if (auth.user != null && auth.user.name === username) {
          return (
            <tr key={_id}>
              <th scope="row">{i + 1}</th>
              <td style={{ textAlign: "center" }}>{name}</td>
              <td style={{ textAlign: "center" }}>{quantity}</td>
              <td style={{ textAlign: "center" }}>{username}</td>
              <td style={{ textAlign: "center" }}>{date.substring(0, 10)}</td>
              <td style={{ textAlign: "center" }}>{total} EUR</td>
            </tr>
          );
        } else {
          return null;
        }
      }
    );

    return (
      <div>
        <h1 className="display-3">Search for orders</h1>
        <br />
        <input
          className="form-control col-4"
          placeholder="Search orders by name"
          type="search"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <br />
        { auth.isAuthenticated ? (
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Username</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Amount</th>
              </tr>
            </thead>
            <tbody>{orderTableRows}</tbody>
          </Table>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrders,
})(OrderList);
