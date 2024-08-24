"use client";
import React, { useCallback, useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
type Props = {
  src: string;
  alt: string;
};
const ZoomImage = ({ src, alt }: Props) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleZoomChange = useCallback((isZoomed: boolean) => {
    setIsZoomed(isZoomed);
  }, []);
  return (
    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
      <Image
        alt={alt}
        src={src}
        width={1920}
        height={1080}
        className="w-auto h-auto"
      />
    </ControlledZoom>
  );
};

export default ZoomImage;
