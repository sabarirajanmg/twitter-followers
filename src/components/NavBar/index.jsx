/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <a className="navbar-brand" href="#">
        <FontAwesomeIcon icon={faTwitter} className="mr-2" />
        Twitter Followers
      </a>
    </nav>
  );
}
