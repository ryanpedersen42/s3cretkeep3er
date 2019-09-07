import React, { Component, Fragment } from 'react';
import FormInput from '../form-input/form-input';

import './input-form.styles.scss'

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      hidden: true,
    }
  }
  
  handleInputFormKeyChange = (e) => {
    const { handleKeyChange } = this.props;
    handleKeyChange(e.target.value);
  }
  
  handleInputFormValueChange = (e) => {
    const { handleValueChange } = this.props;
    handleValueChange(e.target.value);
  }
  
  showAlert = () => {
    const { onSubmit } = this.props;

    onSubmit()
    this.setState({ showAlert: true})
  
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 1000);
  }

  toggleThisComponent = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden })
  }
  
  render() {
    const { inputValue, inputKey } = this.props;
    const { showAlert, hidden } = this.state;
    return (
      <div>
        <h3 className='section-header' onClick={this.toggleThisComponent}>
          Add New Secret
        </h3>
        { 
          hidden ? 
          null 
          : <Fragment>
              <FormInput 
                name='key' 
                label='key'
                input={inputKey}
                onChange={this.handleInputFormKeyChange}
                required
                />
              <FormInput 
                name='value' 
                label='value'
                value={inputValue}
                onChange={this.handleInputFormValueChange}
                required
                />
                <button 
                  className='custom-button'
                  onClick={this.showAlert}
                >
                  Submit
                </button>
                { 
                  showAlert && (
                  <div className='submission-alert'>
                    Successfully Submitted!
                  </div>
                  )
                }
            </Fragment>
        }
      </div>
    )
  }
}

export default InputForm;