import React, { Fragment } from 'react';
import Header from '../../components/header/header';
import InputForm from '../../components/input-form/input-form';
import GetSecret from '../../components/get-secret/get-secret';

import ProfileHover from 'profile-hover';

import './main-page.styles.scss';

const MainPage = ({ ethAddress, handleLogout, onSubmit, handleValueChange, handleKeyChange, getSecret, displayValue }) => (
  <Fragment>
    <Header
        handleLogout={handleLogout}
      />
    <div className='main-page'>
      <div className='profile-hover'>
        <ProfileHover 
          address={ethAddress}
          showName
          orientation='left'
        />
      </div>
      <div className='main-page-section'>
        <InputForm
          handleKeyChange={handleKeyChange}
          handleValueChange={handleValueChange}
          onSubmit={onSubmit}
        />
      </div>
      <div className='main-page-section'>
        <GetSecret
          getSecret={getSecret}
          handleKeyChange={handleKeyChange}
          displayValue={displayValue}
        />
      </div>
    </div>
  </Fragment>
);

export default MainPage;