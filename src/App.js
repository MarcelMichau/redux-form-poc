import React, { Component } from 'react';
import InformationSection from './InformationSection';
import AddressSection from './AddressSection';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  submit = (values) => {
    // Do something with the form values
    console.log(values);
  }

  displayProgress = (fields) => {
    const totalFields = fields.registeredFields && Object.keys(fields.registeredFields).length;
    const completedFields = fields.values && Object.keys(fields.values).length;

    return `Completed ${completedFields || 0} / ${totalFields} required fields.`;
  }

  render() {
    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={6}>
              <h1>Information</h1>
              <InformationSection onSubmit={this.submit} />
            </Col>
            <Col md={6}>
              <span>Form Progress: {this.props.informationDetails && this.displayProgress(this.props.informationDetails)}</span>
              <pre>{JSON.stringify(this.props.informationDetails, null, '\t')}</pre>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h1>Address</h1>
              <AddressSection onSubmit={this.submit} />
            </Col>
            <Col md={6}>
              <span>Form Progress: {this.props.addressDetails && this.displayProgress(this.props.addressDetails)}</span>
              <pre>{JSON.stringify(this.props.addressDetails, null, '\t')}</pre>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;