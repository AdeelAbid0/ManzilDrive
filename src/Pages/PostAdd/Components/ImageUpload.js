import React, { useState } from "react";
import { CameraIcon } from "../../../Utils/Icons";

const ImageUpload = () => {
  const [images, setImages] = useState(Array(6).fill(null));

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {[0, 1].map((row) => (
        <div key={row} className="flex gap-3">
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <div key={index} className="relative group">
                <div className="flex items-center justify-center w-[208px] rounded h-[120px] bg-[#F5F5F5] cursor-pointer overflow-hidden">
                  {images[index] ? (
                    <>
                      <img
                        src={images[index]}
                        alt="Uploaded"
                        className="w-full h-full object-contain group-hover:brightness-50 transition-all duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CameraIcon className="text-white" />
                      </div>
                    </>
                  ) : (
                    <CameraIcon />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(index, e)}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
