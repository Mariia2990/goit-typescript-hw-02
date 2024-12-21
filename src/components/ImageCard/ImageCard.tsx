import { UnsplashImage } from '../../types/types';
import css from './ImageCard.module.css'

type ImageCardProps = {
  image: UnsplashImage;
  onClick: (image:UnsplashImage)=> void;
}

    function ImageCard({ image, onClick}: ImageCardProps) {
  return (
    <div className={css.imageCard} onClick={() => onClick(image)}>
      <img src={image.urls.small} alt={image.alt_description || 'Image'} className={css.image} />
    </div>
  );
}

export default ImageCard;

