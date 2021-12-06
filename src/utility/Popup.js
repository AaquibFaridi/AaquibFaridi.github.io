import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { logoutWithJWT } from 'redux/actions/auth/logoutActions'

export const Popup = ({
  modalMessage,
  handleConfirm,
  isOpen,
  closeModal,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  warning = '' //if warning then no option to cancel
}) => {
  const msg = modalMessage || 'Are you sure you want to delete this record?'
  return (
    <div>
      <Modal
        isOpen={isOpen}
        className="modal-dialog-centered"
        backdrop="static"
      >
        <ModalBody> {msg}</ModalBody>
        <ModalFooter>
          {!warning && (
            <Button
              color="primary"
              onClick={closeModal}
              className="button-label"
            >
              {cancelText}
            </Button>
          )}
          <Button
            color="danger"
            onClick={handleConfirm}
            className="button-label"
          >
            {warning ? 'Ok' : confirmText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutWithJWT())
  }
}

export default connect(null, mapDispatchToProps)(Popup)
