import css from './ImageGallery.module.css'
import ImageCard from '../ImageCard/ImageCard';

function ImageGallery({ images, onImageClick, lastImageRef }) { 
  return (
    <ul className={css.gallery}>
      {images.map ((image, index) => (
        <li key={image.id} className={css.galleryItem} ref={index === images.length - 1 ? lastImageRef : null} >
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;