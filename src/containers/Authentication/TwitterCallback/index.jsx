/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { createStructuredSelector } from 'reselect';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { getAccessToken } from '../actions';
import { makeLoadingSelector, makeErrorSelector } from '../selectors';

class TwitterCallback extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { oauth_verifier } = qs.parse(this.props.location.search);
    this.props.getAccessToken(oauth_verifier);
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

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: oauthVerifier => dispatch(getAccessToken(oauthVerifier)),
  };
};

TwitterCallback.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  getAccessToken: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitterCallback);
