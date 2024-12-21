import Modal from 'react-modal';
import css from './ImageModal.module.css'

Modal.setAppElement('#root');


function ImageModal({ isOpen, onRequestClose, largeImageURL, alt }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img src={largeImageURL} alt={alt} className={css.largeImage} />
    </Modal>
  );
}

export default ImageModal;