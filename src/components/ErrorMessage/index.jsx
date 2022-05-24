import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return <span className="text-danger">{message}</span>;
}

ErrorMessage.defaultProps = {
  message: 'Oops! An unexpected error occurred. Please try again.',
};

ErrorMessage.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
