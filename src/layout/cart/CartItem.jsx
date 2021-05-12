import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const CartItem = (props) => {
  const { index, item, handleCartItem } = props;
  const options = [];
  for (let i = 1; i <= 8; i += 1) {
    options.push(
      <option
        key={i}
        value={i}
      >
        {i}
      </option>,
    );
  }
  return (
    <tr
      className="cart-item"
    >
      <td>
        <Row
          className="mx-0"
        >
          <Col
            xs="auto"
            className="product-image-div border rounded"
          >
            <img
              src={item.imageUrl}
              alt=""
              className="product-image"
            />
          </Col>
          <Col>
            <Row
              className="flex-column h-100"
            >
              <Col
                className="flex-grow-1"
              >
                {item.name}
              </Col>
              <Col
                className="flex-grow-0 fs-6 cursor-pointer"
                onClick={() => {
                  handleCartItem(index, item.id, 0);
                }}
              >
                <b>
                  X Remove
                </b>
              </Col>
            </Row>
          </Col>
        </Row>
      </td>
      <td>
        <select
          value={item.cartQuantity}
          onChange={(e) => {
            handleCartItem(index, item.id, Number(e.target.value));
          }}
        >
          {options}
        </select>
      </td>
      <td>
        {`₹${item.price}`}
      </td>
      <td>
        {`₹${item.cartQuantity * item.price}`}
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  handleCartItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default CartItem;
