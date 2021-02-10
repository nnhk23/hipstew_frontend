import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteModal = ({ closeModal, show, handleDelete }) => {
    return(
        <>
            <Modal
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Delete Account Confirmation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to permanently delete your account?
                </Modal.Body>

                <Modal.Footer>
                <Button variant="primary" onClick={handleDelete}> Yes </Button>
                <Button variant="secondary" onClick={closeModal}> No </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default DeleteModal