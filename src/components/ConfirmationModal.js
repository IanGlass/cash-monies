import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal = (props) => (
  <div>
    <Dialog
      open={props.showModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.closeModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.message}</DialogTitle>
      <DialogActions>
        <Button onClick={props.closeModal} color="primary">{props.closeLabel}</Button>
        <Button onClick={props.confirmAction} color="primary">{props.confirmLabel}</Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default ConfirmationModal;