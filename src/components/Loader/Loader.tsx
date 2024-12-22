import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

interface LoaderProps {
  width?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  width = "200",
  color = "blue",
}) => {
  return (
    <div className={css.loader} role="status" aria-live="polite">
      <InfinitySpin 
        width={width} 
        color={color} 
      />
    </div>
  );
};

export default Loader;
