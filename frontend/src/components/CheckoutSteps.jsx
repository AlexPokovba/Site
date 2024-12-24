import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { label: 'Sign In', link: '/login', completed: step1 },
    { label: 'Shipping', link: '/shipping', completed: step2 },
    { label: 'Place Order', link: '/placeorder', completed: step3 },
  ];

  return (
    <Box sx={{ width: '100%', marginBottom: 4 }}>
      <Stepper activeStep={steps.findIndex((step) => !step.completed)}>
        {steps.map((step, index) => (
          <Step key={index} completed={step.completed}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: step.completed ? 'lime' : '#9e9e9e',
                  textDecoration: step.completed ? 'none' : 'line-through',
                  fontWeight: 'bold',
                },
                '& .MuiStepIcon-root': {
                  color: step.completed ? 'lime' : '#9e9e9e',
                },
              }}
            >
              {step.completed ? (
                <Link
                  to={step.link}
                  style={{
                    textDecoration: 'none',
                    color: 'lime',
                  }}
                >
                  {step.label}
                </Link>
              ) : (
                step.label
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
