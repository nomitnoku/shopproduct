import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { cart } from '../../../api/api';

class CartCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      processing: false,
    };
  }

  handleCartItems = (factor) => {
    const { item, index, updateProduct } = this.props;
    const quantity = item.cartQuantity + factor;
    this.setState({
      processing: true,
    });
    cart(
      item.id, quantity,
    ).then(() => {
      this.setState({
        processing: false,
      });
      updateProduct(index, quantity);
    }).catch(() => {});
  }

  render() {
    const { item } = this.props;
    const { processing } = this.state;
    if (processing) {
      return (
        <div
          className="cart-counter overflow-hidden p-2 mb-1"
        >
          <div
            className="process-add-to-cart"
          />
        </div>
      );
    }
    if (!item.cartQuantity) {
      return (
        <Row
          className="mx-0 cursor-pointer cart-counter"
          onClick={() => {
            this.handleCartItems(1);
          }}
        >
          <Col
            xs="auto"
            className="px-2 rounded-1 bg-primary-light
            text-white"
          >
            <b>
              +
            </b>
          </Col>
          <Col
            xs="auto"
            className="pl-1 pr-0 text-primary-light"
          >
            ADD
          </Col>
        </Row>
      );
    }
    return (
      <Row
        className="mx-0 px-2 cart-counter border rounded-1 align-items-center"
      >
        <Col
          xs="auto"
          className="px-0 cursor-pointer"
          onClick={() => {
            this.handleCartItems(-1);
          }}
        >
          -
        </Col>
        <Col
          className="px-0 flex-grow-1 text-center fs-5"
        >
          {item.cartQuantity}
        </Col>
        <Col
          xs="auto"
          className="px-0 cursor-pointer"
          onClick={() => {
            this.handleCartItems(1);
          }}
        >
          +
        </Col>
      </Row>
    );
  }
}

CartCounter.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateProduct: PropTypes.func.isRequired,
};

export default CartCounter;
