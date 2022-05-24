import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { getRequestToken } from './actions';
import { makeLoadingSelector, makeErrorSelector } from './selectors';

class Authentication extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getRequestToken();
  }

  render() {
    const { loading, error } = this.props;
    return (
      <div className="row">
        {loading && <Loader isLoading={loading} />}
        {error && (
          <div className="col-sm-12 text-center">
            <ErrorMessage />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeLoadingSelector(),
  error: makeErrorSelector(),
});

Authentication.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  getRequestToken: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    getRequestToken,
  },
)(Authentication);
