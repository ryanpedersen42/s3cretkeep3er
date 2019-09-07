import React from 'react';

import './auth-page.styles.scss';

const AuthPage = ({ handleAuth }) => (
  <div className='auth-page'>
    <button className='custom-button' onClick={handleAuth}>
      Auth with 3Box
    </button>
  </div>
);

export default AuthPage;