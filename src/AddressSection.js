import React from 'react';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { Button } from 'react-bootstrap';
import { get } from 'lodash';
import { addressTypes, postalTypes, countries } from './referenceData';
import { renderTextField, renderSelectField } from './formRenderers';

const required = (value) => value ? undefined : 'This field is required';
const numeric = (value) => !value ? undefined : Number.isInteger(Number(value)) ? undefined: 'This field must be numeric';
const onlyOneAddressType = (value, allValues) => allValues.addresses.filter(address => address.addressTypeId === value).length <= 1 ? undefined: 'There can only be one of each address type specified';
const physicalRequired = (index, value, allValues) => get(allValues, `addresses[${index}].addressTypeId`) !== '1' ? undefined : value ? undefined : 'This field is required when address type is Physical';
const complexRequired = (index, value, allValues) => !get(allValues, `addresses[${index}].unitNumber`) ? undefined : value ? undefined : 'This field is required when unit number is specified';
const unitRequired = (index, value, allValues) => !get(allValues, `addresses[${index}].complex`) ? undefined : value ? undefined : 'This field is required when complex is specified';
const postalRequired = (index, value, allValues) => get(allValues, `addresses[${index}].addressTypeId`) !== '2' ? undefined : value ? undefined : 'This field is required when address type is Postal';
const privateBagRequired = (index, value, allValues) => get(allValues, `addresses[${index}].postalTypeId`) !== '2' ? undefined : value ? undefined : 'This field is required when postal type is Private Service';

const renderAddresses = ({ fields, meta: { touched, error, submitFailed }, allAddresses }) => (
    <div>
        {fields.map((address, index) => {
            const currentAddress = allAddresses[index];
            return (
                <div key={index}>
                    <h4>Address #{index + 1}</h4>
                    <Field name={`${address}.addressTypeId`} component={renderSelectField} placeholder="Select Address Type" label="Address Type" options={addressTypes} validate={[required, onlyOneAddressType]} />
                    {    
                        currentAddress.addressTypeId && 
                        <div>
                            {
                                currentAddress.addressTypeId === '1' && <Field name={`${address}.unitNumber`} component={renderTextField} type="text" placeholderAndLabel="Unit Number" validate={[numeric, unitRequired.bind(null, index)]} />
                            }
                            {
                                currentAddress.addressTypeId === '1' && <Field name={`${address}.complex`} component={renderTextField} type="text" placeholderAndLabel="Complex" validate={complexRequired.bind(null, index)} />
                            }
                            <Field name={`${address}.streetNumber`} component={renderTextField} type="text" placeholderAndLabel="Street Number" validate={[physicalRequired.bind(null, index), numeric]} />
                            <Field name={`${address}.streetName`} component={renderTextField} type="text" placeholderAndLabel="Street or Name of Farm" validate={physicalRequired.bind(null, index)} />
                            <Field name={`${address}.suburb`} component={renderTextField} type="text" placeholderAndLabel="Suburb" validate={required} />
                            <Field name={`${address}.city`} component={renderTextField} type="text" placeholderAndLabel="City" validate={required} />
                            {
                                currentAddress.addressTypeId === '2' && <Field name={`${address}.postalTypeId`} component={renderSelectField} type="text" placeholder="Select Postal Type" label="Postal Type" options={postalTypes} validate={postalRequired.bind(null, index)} />
                            }
                            {
                                currentAddress.addressTypeId === '2' && <Field name={`${address}.postalNumber`} component={renderTextField} type="text" placeholderAndLabel="Postal Number" validate={postalRequired.bind(null, index)} />
                            }
                            { 
                            currentAddress.postalTypeId === '2' && <Field name={`${address}.privateBagNumber`} component={renderTextField} type="text" placeholderAndLabel="Private Bag Number" validate={privateBagRequired.bind(null, index)} />
                            }
                            <Field name={`${address}.postalCode`} component={renderTextField} type="text" placeholderAndLabel="Postal Code" validate={[required, numeric]} />
                            <Field name={`${address}.countryId`} component={renderSelectField} type="text" placeholder="Select Country" label="Country" options={countries} validate={required} />
                            <Button bsStyle="danger" type="button" onClick={() => fields.remove(index)}>Remove Address</Button>
                        </div>
                    }
                </div>
                );
            }
        )}
        <div>
            <Button bsStyle="primary" type="button" disabled={fields.length > 1} onClick={() => fields.push({})}>Add Address</Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
    </div>
)

const AddressSection = ({ handleSubmit, pristine, reset, submitting, valid, addresses }) => {
    return (
        <form onSubmit={handleSubmit}>
            <FieldArray name="addresses" component={renderAddresses} allAddresses={addresses} />
            <div>
                <Button bsStyle="primary" type="submit" disabled={pristine || submitting || !valid}>Submit</Button>
                <Button bsStyle="danger" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
            </div>
        </form>
    )
}

AddressSection = reduxForm({
    form: 'address'
})(AddressSection);

const selector = formValueSelector('address');
AddressSection = connect(
    state => {
        const addresses = selector(state, 'addresses');
        return {
            addresses
        };
    }
)(AddressSection);

export default AddressSection;