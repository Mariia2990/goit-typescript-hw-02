import { useState, useEffect, useMemo, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import ImageModal from './components/ImageModal/ImageModal'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import Loader from './components/Loader/Loader'
import { fetchImages } from './components/api';
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import {UnsplashImage} from './types/types'

const App = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage|null>(null);
  const lastImageRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setLoading(true);
        const { images: newImages, totalPages } = await fetchImages(query, page);

        if (newImages.length === 0) {
          toast.error("No results found for your search.");
        }

        if (page === 1) {
          setImages(newImages);
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
        
        setTotalPages(totalPages);
        if (page >= totalPages && newImages.length > 0) {
          toast.success('You have reached the end of the results.');
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

 const uniqueImages = useMemo(() => {
  const seen:Record<string,boolean> = {}; 
  return images.filter((image) => {
    if (seen[image.id]) {
      return false; 
    }
    seen[image.id] = true; 
    return true;
  });
}, [images]);


  const handleSearchSubmit = (newQuery:string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalPages(1);
    setError(null);
  };

  const handleLoadMore = () => {
     setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: UnsplashImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  }
  

useEffect(() => {
  if (lastImageRef.current) {
    lastImageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}, [images]);

return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchSubmit} />
      
      {loading && <Loader />}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
            <ImageGallery images={uniqueImages} onImageClick={handleImageClick} lastImageRef={lastImageRef} />
          {uniqueImages.length > 0 && page < totalPages && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          largeImageURL={selectedImage.urls.regular || ''} 
          alt={selectedImage?.alt_description || 'No description available'} 
        />
      )}
    </>
  );
};


export default App;
