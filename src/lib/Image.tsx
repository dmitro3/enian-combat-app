import React from 'react';
import { cn } from './utils';

interface ImageProps {
   src: string;
   alt: string;
   width?: string | number;
   height?: string | number;
   className?: string;
   onClick?: () => void;
}

const Image = ({ src, alt, width, height, className, onClick }: ImageProps) => {
   return (
      <img
         src={src}
         alt={alt}
         width={width}
         height={height}
         className={cn(className)}
         onClick={onClick}
         loading="eager"
         // style={{ display: "block", maxWidth: "100%" }} // optional styling to make images responsive
      />
   );
};

export default Image;
