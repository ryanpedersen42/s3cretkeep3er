import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import AuthPage from './pages/auth-page/auth-page';
import MainPage from './pages/main-page/main-page';

import './App.styles.scss';

const Box = require('3box')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
      box: null,
      ethAddress: '',
      dappSpace: [],
      inputKey: '',
      inputValue:'',
      displayValueKey: '',
      displayValue: '',
      userProfile: {},
    }
  }

  async componentDidMount() {
    const { box } = this.state;
    const { history } = this.props;

    // if you haven't authenticated, keep authentication screen up
    if (!box) history.push('/');
    this.setState({ isAppReady: true });
  }

  // **Authentication Actions**
  handleAuth = async () => {
    const { history } = this.props

    // web3 actions to authenticate with metamask or other provider
    const ethAddresses = await window.ethereum.enable();
    const ethAddress = ethAddresses[0];
    
    // authenticate and get profile data
    const box = await Box.openBox(ethAddress, window.ethereum, {});
    
    // promise resolution.. waiting from 3Box onSyncDone confirmation
    await new Promise((resolve, reject) => box.onSyncDone(resolve));
    
    //open s3cretkeep3r space
    const dappSpace = await box.openSpace('s3cretkeep3r');

    // set all to state and continue
    await this.setState({ box, ethAddress, dappSpace });

    await this.getUserProfile();

    history.push('/main');
  }

  getUserProfile = async () => {
    const { ethAddress } = this.state;
    const userProfile = await Box.getProfile(ethAddress);

    await this.setState({ userProfile })
    await console.log(this.state.userProfile)
  }

  handleLogout = async () => {
    const { history } = this.props;
    const { box } = this.state;

    await box.logout();
    history.push('/');
  }

  // **Writing to Space (Storage)**
  // submit new key / value pair from input-form
  onSubmit = async () => {
    const { inputKey, inputValue, dappSpace } = this.state;

    // set private key / value pair from input form
    try {
      await dappSpace.private.set(inputKey, inputValue);
    } catch(err) {
      console.log(err);
    }
    // clear state
    await this.setState({ inputKey: '', inputValue: '' });
  }

  // change the key field for input
  handleKeyChange = (key) => {
    this.setState({inputKey: key});
  } 

  // change value field for input
  handleValueChange = (value) => {
    this.setState({inputValue: value});
  }

  //change value for key used to get displayValue in getSecret
  handleGetSecretKey = (key) => {
    this.setState({displayValueKey: key})
  }

  // **Getting info from Space (Storage)**
  getSecret = async () => {
    const { displayValueKey, dappSpace } = this.state;
    
    //returns string || object.. undefined if no such key
    const displayValue = await dappSpace.private.get(displayValueKey)

    if (displayValue) {
      await this.setState({ displayValue, displayValueKey: '' });
    }
  }

  render() {
    const { isAppReady, ethAddress, inputKey, inputValue, displayValue, userProfile } = this.state;
    return (
      <div className='App'>
        {isAppReady && (<Fragment>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
              <AuthPage 
                handleAuth={this.handleAuth} 
              />
              )}
            />
            <Route
              exact
              path='/main'
              render={() => (
                <MainPage
                  //state
                  ethAddress={ethAddress}
                  inputKey={inputKey}
                  inputValue={inputValue}
                  displayValue={displayValue} 
                  profileStatus={userProfile.status}

                  //functions
                  handleLogout={this.handleLogout}
                  onSubmit={this.onSubmit}
                  handleKeyChange={this.handleKeyChange}
                  handleValueChange={this.handleValueChange}
                  getSecret={this.getSecret}
                  handleGetSecretKey={this.handleGetSecretKey}
                 />
              )}
            />
          </Switch>
        </Fragment>)}
      </div>
    );
  }
}

export default withRouter(App);