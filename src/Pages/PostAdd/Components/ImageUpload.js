import { CameraIcon } from "../../../Utils/Icons";

const ImageUpload = ({ images, setImages }) => {
  const handleImageUpload = (startIndex, event) => {
    const files = Array.from(event.target.files); // multiple files
    if (files.length) {
      const newImages = [...images];
      files.forEach((file, i) => {
        if (startIndex + i < 6) {
          // limit to 6 slots
          newImages[startIndex + i] = file;
        }
      });
      setImages(newImages);
    }
  };

  const getPreviewURL = (file) => {
    if (!file) return null;
    if (typeof file === "string") {
      return file; // In case API gave a URL
    }
    return URL.createObjectURL(file); // File preview
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="h-[18px] font-inter font-bold text-[16px] text-[#666666] leading-[18px]">
        Upload Photos
      </h1>

      {[0, 1].map((row) => (
        <div key={row} className="flex gap-3">
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            const preview = getPreviewURL(images[index]);
            return (
              <div key={index} className="relative group w-[33%]">
                <div className="flex items-center justify-center rounded h-[120px] bg-[#F5F5F5] cursor-pointer overflow-hidden">
                  {preview ? (
                    <>
                      <img
                        src={preview}
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
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
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
