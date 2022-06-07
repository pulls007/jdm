import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { v4 as uuidv4 } from 'uuid';

import AddressForm from './AddressForm';
import './address.scss';
import { RadioGroup, Radio } from '@mui/material';

function AddressPage(props) {
  const [open, setOpen] = useState(false);
  const [isNewForm, setIsNewForm] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const currentAddressList = props.addressList;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    width: '50vw',
    maxWidth: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsNewForm(true);
    setSelectedIndex(-1);
    setOpen(false);
  };

  const updateAddress = (formValues) => {
    let previosAddress = [...props.addressList];
    if (!isNewForm) {
      previosAddress[selectedIndex] = formValues;
    } else {
      formValues.id = uuidv4();
      previosAddress.push(formValues);
    }
    props.updateAddressList(previosAddress);
    handleClose();
  };
  const handleModify = (val, index) => {
    setIsNewForm(false);
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleChange = (val) => {
    const p = val.target.value;
    console.log(p, typeof p);
    let abc = parseInt(p);

    setSelectedAddressId(p);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddressForm
            updateAddress={updateAddress}
            closeForm={handleClose}
            isNewForm={isNewForm}
            selectedIndex={selectedIndex}
            addressList={props.addressList}
          />
        </Box>
      </Modal>
      <div>
        <div>
          <RadioGroup
            value={selectedAddressId}
            onChange={handleChange}
            className='radioBtnAddress'
            sx={{ margin: '10px' }}
          >
            <h3> Select an address to deliver </h3>
            {currentAddressList &&
              currentAddressList.map((val, index) => {
                return (
                  <div>
                    <label htmlFor={val.id} className='customizes_radio'>
                      <Radio
                        sx={{
                          alignSelf: 'flex-start',
                          padding: '9px !important',
                        }}
                        value={val.id}
                        name={val.id}
                        id={val.id}
                        onChange={(p) => {
                          console.log(
                            typeof val.id,
                            typeof p.target.value,
                            val.id == p.target.value
                          );
                        }}
                      />
                      <div className='addressInfo'>
                        <div className='address_one'>
                          <h3>Home</h3>
                          <span>{val.addressLine1}</span>
                          <span>{val.addressLine2}</span>
                          <span>{val.city}</span>
                          <span>{val.state}</span>
                        </div>
                        <div className='address_two'>
                          <span>{val.phoneNumber}</span>
                          <span>GSTIN:{val.gstNumber}</span>
                        </div>
                      </div>
                      <Button
                        // variant='outlined']

                        onClick={(erat) => handleModify(val, index)}
                        sx={{
                          width: 'fit-content',
                          height: 'fit-content',
                          border: 'none',
                          ':hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        disableElevation
                      >
                        Edit
                      </Button>
                    </label>
                  </div>
                );
              })}
          </RadioGroup>
        </div>
        <div>
          <Button
            // sx={{ margin: '10px' }}
            variant='outlined'
            // fullWidth={true}
            className={'saved'}
            onClick={handleOpen}
          >
            Add New Address
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddressPage;
