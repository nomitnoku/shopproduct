import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

function List({
  Component, idField, list, ...props
}) {
  return (
    <Row
      className="mx-n4"
    >
      {
        list.map((item, index) => (
          <Component
            {...props}
            index={index}
            key={item[idField]}
            item={item}
          />
        ))
      }
    </Row>
  );
}

List.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  idField: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
