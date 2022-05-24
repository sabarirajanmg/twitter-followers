/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAmountUp,
  faSortAmountDown,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Loader from 'components/Loader';
import UserProfile from 'components/UserProfile';
import ErrorMessage from 'components/ErrorMessage';
import {
  getFollowersList as getFollowersListAction,
  toggleSort as toggleSortAction,
} from './actions';
import {
  makeFollowersSelector,
  makeLoadingSelector,
  makeErrorSelector,
  makeSortSelector,
  makePrevCusrorSelector,
  makeNextCursorSelector,
} from './selectors';

class FollowersList extends React.Component {
  componentDidMount() {
    this.props.getFollowersList();
  }

  movePrevious = () => {
    const { previousCursor, getFollowersList } = this.props;
    getFollowersList(previousCursor);
  };

  moveNext = () => {
    const { nextCursor, getFollowersList } = this.props;
    getFollowersList(nextCursor);
  };

  render() {
    const { followers, loading, sort, previousCursor, nextCursor, error, toggleSort } = this.props;
    const sortAsc = sort === 'asc';

    return (
      <div className="row">
        {loading && <Loader isLoading={loading} />}
        {error ? (
          <div className="col-sm-12 text-center">
            <ErrorMessage />
          </div>
        ) : (
          <>
            {followers.length ? (
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-12 text-right mb-3">
                    <button type="button" className="btn" onClick={toggleSort}>
                      <FontAwesomeIcon icon={sortAsc ? faSortAmountUp : faSortAmountDown} /> Sort{' '}
                      {sortAsc ? 'Ascending' : 'Descending'}
                    </button>
                  </div>
                </div>
                <div className="row">
                  {followers.map(follower => (
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3" key={follower.id}>
                      <UserProfile follower={follower} />
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="col-12 text-center mb-4">
                    <button
                      type="button"
                      className="btn btn-outline-primary mr-3"
                      onClick={this.movePrevious}
                      disabled={!previousCursor}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} /> Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={this.moveNext}
                      disabled={!nextCursor}
                    >
                      Next <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <span className="col-sm-12 text-center text-warning">
                You dont have any followers :(
              </span>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  followers: makeFollowersSelector(),
  loading: makeLoadingSelector(),
  error: makeErrorSelector(),
  sort: makeSortSelector(),
  previousCursor: makePrevCusrorSelector(),
  nextCursor: makeNextCursorSelector(),
});

const mapDispatchToProps = dispatch => {
  return {
    getFollowersList: params => {
      dispatch(getFollowersListAction(params));
    },
    toggleSort: () => dispatch(toggleSortAction()),
  };
};

FollowersList.propTypes = {
  followers: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  sort: PropTypes.string.isRequired,
  previousCursor: PropTypes.number.isRequired,
  nextCursor: PropTypes.number.isRequired,
  getFollowersList: PropTypes.func.isRequired,
  toggleSort: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowersList);
