import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export const renderTextField = ({ input, placeholder, label, meta: { touched, error, valid }, ...custom }) => (
  <FormGroup validationState={touched && error ? 'error' : touched && valid ? 'success': null}>
    <ControlLabel>{custom.placeholderAndLabel}</ControlLabel>
    <FormControl
      type="text"
      placeholder={custom.placeholderAndLabel}
      {...input}
    />
    <FormControl.Feedback />
    {
      touched && (error && <HelpBlock>{error}</HelpBlock>)
    }
  </FormGroup>
)

export const renderSelectField = ({ input, placeholder, label, options, meta: { touched, error, valid }, ...custom }) => (
  <FormGroup validationState={touched && error ? 'error' : touched && valid ? 'success': null}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" placeholder={placeholder} onChange={(event) => input.onChange(event.target.value)} {...input}>
      <option value="">{placeholder}</option>
      {
        options.map(option => (<option key={option.id} value={option.id}>{option.value}</option>))
      }
    </FormControl>
    <FormControl.Feedback />
    {
      touched && (error && <HelpBlock>{error}</HelpBlock>)
    }
  </FormGroup>
)