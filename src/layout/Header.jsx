import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const Header = (props) => {
  const {
    isProductPage, totalCartItems, history,
  } = props;
  return (
    <Row
      className="mx-0 p-3 align-items-center justify-content-center
       bg-primary-dark text-white"
    >
      <Col
        xs="auto"
      >
        Home
      </Col>
      {
        isProductPage
        && !!totalCartItems
        && (
          <>
            <Col
              xs="auto"
              className="px-0"
            >
              &#9474;
            </Col>
            <Col
              xs="auto"
              className="cursor-pointer"
              onClick={() => {
                history.push('/cart');
              }}
            >
              {`Cart (${totalCartItems})`}
            </Col>
          </>
        )
      }
    </Row>
  );
};

Header.propTypes = {
  isProductPage: PropTypes.bool,
  totalCartItems: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Header.defaultProps = {
  isProductPage: false,
  totalCartItems: 0,
};

export default Header;
