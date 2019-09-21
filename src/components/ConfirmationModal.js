import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = (props) => (
  <Modal
    isOpen={props.showModal}
    onRequestClose={props.closeModal}
    ariaHideApp={false}
    className="modal"
    contentLabel="Confirm Action"
  >
    <p>Are you sure?</p>
    <div className="button--group">
      <button className="button" onClick={props.confirmAction}>Yes</button>
      <button className="button" onClick={props.closeModal}>No</button>
    </div>
  </Modal>
);

export default ConfirmationModal;