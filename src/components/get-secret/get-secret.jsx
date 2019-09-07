import React, { Component, Fragment } from 'react';

import FormInput from '../form-input/form-input';

import './get-secret.styles.scss';

class GetSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }

  handleChange = (e) => {
    const { handleKeyChange } = this.props;
    handleKeyChange(e.target.value);
  }

  toggleThisComponent = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden })
  }

  render() {
    const { displayValue, getSecret } = this.props;
    const { hidden } = this.state;
    return (
      <div>
        <h3 className='section-header' onClick={this.toggleThisComponent}>Get Secret</h3>
        { 
          hidden ? 
          null 
          : 
          <Fragment>
            <FormInput
              handleChange={this.handleChange}
              label='which secret do you want?'
            />
            <button 
              className='custom-button' 
              onClick={getSecret}
            >
              get secret
            </button> 
              {
                (displayValue.length > 1) && (
                  <div className='display-value'>
                    secret: {displayValue}
                  </div>
                )
            }
          </Fragment>
        }
      </div>
    )
  }
}

export default GetSecret;