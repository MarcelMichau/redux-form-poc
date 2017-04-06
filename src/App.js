import React, { Component } from 'react';
import SimpleForm from './SimpleForm';
import logo from './logo.svg';

class App extends Component {
submit = (values) => {
    // Do something with the form values
    console.log(values);
  }

  displayProgress = () => {
    const totalFields = this.props.formDetails.registeredFields && Object.keys(this.props.formDetails.registeredFields).length;
    const completedFields = this.props.formDetails.values && Object.keys(this.props.formDetails.values).length;

    return `Completed ${completedFields || 0} / ${totalFields} fields.`
  }

  render() {
    return (
      <div className="App">
        <SimpleForm onSubmit={this.submit}/>
        <span>Form Progress: {this.props.formDetails && this.displayProgress()}</span>
      </div>
    );
  }
}

export default App;
