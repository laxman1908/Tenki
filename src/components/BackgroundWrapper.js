import React, { useEffect, useState } from "react";

const BackgroundWrapper = ({ backgroundImage }) => {
  const [currentImage, setCurrentImage] = useState(backgroundImage);
  const [previousImage, setPreviousImage] = useState(null);

  useEffect(() => {
    if (backgroundImage !== currentImage) {
      // Update the previous image for the fade-out effect
      setPreviousImage(currentImage);
      setCurrentImage(backgroundImage);
    }
  }, [backgroundImage, currentImage]);
  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Fading-out layer for the previous image */}
      {previousImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out opacity-0"
          style={{ backgroundImage: previousImage }}
          onTransitionEnd={() => setPreviousImage(null)} // Remove after fade-out
        />
      )}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out opacity-100"
        style={{ backgroundImage: currentImage }}
      />
    </div>
  );
};

export default BackgroundWrapper;
