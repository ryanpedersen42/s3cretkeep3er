import React from 'react';

import './header.styles.scss';

const Header = ({ handleLogout }) => (
  <div className='header'>
    <div className='logo'>
      s3cret keep3r
    </div>
    <div className='options'>
      <a className='option' href='https://github.com/ryanpedersen42/RP-3Box'>GitHub</a>
      <div className='option' onClick={handleLogout} >Sign Out</div>
    </div>
  </div>
);

export default Header;