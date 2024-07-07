import imageCompression from 'browser-image-compression';

export async function handleCompressImg(imageFile, maxSize, widthOrHeight) {
  const options = {
    maxSizeMB: maxSize,
    maxWidthOrHeight: widthOrHeight,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
