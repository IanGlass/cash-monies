import React from 'react';
import { Snackbar } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';


const ErrorSnackbar = (props) => (
  <Snackbar
    open={props.open}
    message={
      <div className="error-snackbar__container">
        <ErrorIcon />
        <p>{props.message}</p>      
      </div>
    }
    anchorOrigin={props.anchorOrigin}
  />
);

export default ErrorSnackbar;