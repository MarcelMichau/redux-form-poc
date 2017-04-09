import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button } from 'react-bootstrap';
import { titles, races, genders, countries } from './referenceData';
import { renderTextField, renderSelectField } from './formRenderers';

const required = (value) => value ? undefined : 'This field is required';
const validIDNumber = (value) => value.length === 13 ? undefined : 'Invalid ID Number';
const otherRaceRequired = (value, allValues) => allValues.raceId !== '5' ? undefined : value ? undefined : 'This field is required when Race is Other';

const InformationSection = ({ handleSubmit, pristine, reset, submitting, valid, otherRace }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="titleId" component={renderSelectField} placeholder="Select Title" label="Title" options={titles} validate={required}/>
      <Field name="surname" component={renderTextField} type="text" placeholderAndLabel="Surname" validate={required}/>
      <Field name="firstNames" component={renderTextField} type="text" placeholderAndLabel="First Name(s)" validate={required}/>
      <Field name="nationality" component={renderSelectField} type="text" placeholder="Select Nationality" label="Nationality" options={countries} validate={required}/>
      <Field name="idNumber" component={renderTextField} type="text" placeholderAndLabel="ID Number" validate={[required, validIDNumber]}/>
      <Field name="countryOfBirth" component={renderSelectField} type="text" placeholder="Select Country of Birth" label="Country of Birth" options={countries} validate={required}/>
      <Field name="genderId" component={renderSelectField} type="text" placeholder="Select Gender" label="Gender" options={genders} validate={required}/>
      <Field name="raceId" component={renderSelectField} type="text" placeholder="Select Race" label="Race" options={races} validate={required}/>
      {
        otherRace === '5' && <Field name="otherRace" component={renderTextField} type="text" placeholderAndLabel="Other Race" validate={otherRaceRequired}/>
      }
      <div>
        <Button bsStyle="primary" type="submit" disabled={pristine || submitting || !valid}>Submit</Button>
        <Button bsStyle="danger" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
      </div>
    </form>
  )
}

InformationSection = reduxForm({
  form: 'information'
})(InformationSection);

const selector = formValueSelector('information');
InformationSection = connect(
  state => {
    const otherRace = selector(state, 'raceId');
    return {
      otherRace
    };
  }
)(InformationSection);

export default InformationSection;