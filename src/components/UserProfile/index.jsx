import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ follower }) => {
  return (
    <div className="card">
      <img
        src={follower.profile_image_url_https}
        className="card-img-top"
        alt={follower.screen_name}
      />
      <div className="card-body">
        <h5 className="card-title">{follower.name}</h5>
        <h6 className="card-subtitle text-muted">{follower.screen_name}</h6>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  follower: PropTypes.shape({
    screen_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profile_image_url_https: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
