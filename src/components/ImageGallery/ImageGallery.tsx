import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { UnsplashImage } from '../../types/types';
import React, { RefObject } from 'react';

interface ImageGalleryProps {
  images: UnsplashImage[]; 
  onImageClick: (image: UnsplashImage) => void; 
  lastImageRef?: RefObject<HTMLLIElement | null>; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick, lastImageRef }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <li
          key={image.id}
          className={css.galleryItem}
          ref={index === images.length - 1 ? lastImageRef : undefined} 
        >
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
