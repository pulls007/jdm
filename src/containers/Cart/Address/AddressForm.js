import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';
const defaultValues = {
  id: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pinCode: '',
  phoneNumber: null,
  gstNumber: null,
};
const AddressForm = (props) => {
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if (!props.isNewForm) {
      let obj = props.addressList[props.selectedIndex];
      setFormValues(obj);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateAddress(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems='start'
        justify='start'
        direction='column'
        spacing={2}
      >
        <FormControl style={{ margin: '10px 0px' }}>
          <TextField
            // id='a-input'
            name='addressLine1'
            label='Address Line 1'
            type='text'
            value={formValues.addressLine1}
            onChange={handleInputChange}
          />

          <TextField
            // id='a-input'
            name='addressLine2'
            label='Address Line 2'
            type='text'
            value={formValues.addressLine2}
            onChange={handleInputChange}
          />

          <TextField
            // id='a-input'
            name='city'
            label='City'
            type='text'
            value={formValues.city}
            onChange={handleInputChange}
          />

          <TextField
            // id='a-input'
            name='state'
            label='State'
            type='text'
            value={formValues.state}
            onChange={handleInputChange}
          />

          <TextField
            // id='age-input'
            name='phoneNumber'
            label='Mobile Number'
            type='number'
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
          <TextField
            // id='age-input'
            name='gstNumber'
            label='GSTIN'
            type='text'
            value={formValues.gstNumber}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default AddressForm;
