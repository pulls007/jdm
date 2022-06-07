import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressPage from './Address/AddressPage';
import useMediaQuery from '@mui/material/useMediaQuery';
import './cart.scss';
import CartHeader from './CartHeader';
const steps = ['Address', 'Select Payment', 'Confirmation'];

export default function Cart(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [addressList, setAddressList] = useState([]);

  const updateAddressList = (addressList) => {
    localStorage.setItem('addresses', JSON.stringify(addressList));
    setAddressList(addressList);
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('addresses') || '[]');
    updateAddressList(items);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderSelectionComponent = () => {
    if (activeStep == 0) {
      return (
        <AddressPage
          updateAddressList={updateAddressList}
          addressList={addressList}
        />
      );
    } else if (activeStep == 1) {
      return <h2>step 2</h2>;
    } else {
      return <h2>step 3</h2>;
    }
  };
  const matches = useMediaQuery('(max-width:320px)');
  return (
    <div className='cart_container'>
      <div className='cartPage_header'>
        <CartHeader />
      </div>
      <main>
        <Stepper
          style={{ padding: 10, background: '#8080800d' }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            return (
              <Step size='small' className='pulkit' key={label}>
                <StepLabel
                  sx={{
                    flexWrap: matches ? 'wrap' : 'nowrap',
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className='cart-content'>{renderSelectionComponent()}</div>
      </main>
      <div className='cart_footer'>
        <div className='first'>
          <div>
            <div>30 Items</div>
            <span className='price'>
              ₹7,49,332 <span className='original_price '>₹8,49,332</span>
            </span>
          </div>
          {activeStep > 0 && (
            <>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: 'black' }}
              >
                Back
              </Button>
            </>
          )}
        </div>

        <div className={'second'}>
          <Button
            variant='contained'
            sx={{ ml: 'auto', bgcolor: 'red !important', color: 'red' }}
            style={{ marginLeft: 'auto', textTransform: 'capitalize' }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
