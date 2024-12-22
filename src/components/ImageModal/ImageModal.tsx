import Modal from 'react-modal';
import css from './ImageModal.module.css'
import React from 'react';

Modal.setAppElement('#root');

interface ImageModalProps{
  isOpen: boolean;
  onRequestClose:() => void;
  largeImageURL: string ;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps>= ({ isOpen, onRequestClose, largeImageURL, alt }) => {
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