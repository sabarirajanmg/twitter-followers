import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

export default function Loader({ isLoading }) {
  return <div className={classnames('loading', { hide: !isLoading })}></div>;
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
