import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import CartCounter from '../cart/CartCounter';

const Product = (props) => {
  const { item } = props;
  return (
    <Col
      xs={12}
      md={8}
      lg={6}
      className="p-2 online-product"
    >
      <div
        className="border p-2 h-100"
      >
        <div
          className="product-image-div mb-1"
        >
          <img
            src={item.imageUrl}
            alt=""
          />
        </div>
        <div
          className="text-truncate-2 mb-1"
        >
          {item.name}
        </div>
        <div
          className="mb-2"
        >
          <b>
            {`₹${item.price}`}
          </b>
        </div>
        <div
          className="d-flex"
        >
          <CartCounter
            item={item}
            {...props}
          />
        </div>
      </div>
    </Col>
  );
};

Product.propTypes = {
  item: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default Product;
