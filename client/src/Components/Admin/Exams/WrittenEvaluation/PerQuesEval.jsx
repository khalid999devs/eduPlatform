import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CanvasDraw from 'react-canvas-draw';
import { FaUndo, FaTrash, FaEraser } from 'react-icons/fa';
import { AiOutlineRotateRight, AiOutlineRotateLeft } from 'react-icons/ai';
import './canvDraw.css';
import reqs, { reqImgWrapper } from '../../../../assets/requests';
import PrimaryButton from '../../../Buttons/PrimaryButton';
import ValuedInput from '../../../Form/ValuedInput';
import Popup from '../../../Alerts/Popup';

const PerQuesEval = ({
  fullQues,
  examId,
  courseId,
  clientId,
  setReloadTrigger,
}) => {
  const [images, setImages] = useState([]);
  const [canvasRefs, setCanvasRefs] = useState({});
  const [tool, setTool] = useState('pen'); // Default to pen
  const [isNoAns, setIsNoAns] = useState(false);
  const [scaledDimensions, setScaledDimensions] = useState({});
  const [rotations, setRotations] = useState({});
  const [mark, setMark] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ text: '', state: '' });

  useEffect(() => {
    setIsNoAns(false);
    if (fullQues?.stuAns) {
      getImgRefs(fullQues?.stuAns?.files);
      setMark(fullQues?.stuAns?.writtenScore || '');
    } else setIsNoAns(true);
  }, [fullQues]);

  // Fetch images and their dimensions
  const getImgRefs = (files) => {
    setImages(files);
    const refs = files.reduce((acc, img) => {
      acc[img.filename] = React.createRef();
      return acc;
    }, {});
    setCanvasRefs(refs);

    files.forEach((file) => {
      const img = new Image();
      img.src = reqImgWrapper(file.path);
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const maxWidth = 800; // Maximum allowed width
        const maxHeight = 900; // Maximum allowed height
        let width, height;

        if (img.naturalWidth > img.naturalHeight) {
          width = Math.min(maxWidth, img.naturalWidth);
          height = width / aspectRatio;
        } else {
          height = Math.min(maxHeight, img.naturalHeight);
          width = height * aspectRatio;
        }

        setScaledDimensions((prev) => ({
          ...prev,
          [file.filename]: {
            width,
            height,
          },
        }));
        setRotations((prev) => ({
          ...prev,
          [file.filename]: 0,
        }));
      };
    });
  };

  const dataURLtoBlob = async (dataUrl) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return blob;
  };

  const mergeCanvasWithBackground = (canvasDraw, imgSrc, width, height) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      const backgroundImg = new Image();
      backgroundImg.crossOrigin = 'anonymous';
      backgroundImg.src = imgSrc;

      backgroundImg.onload = () => {
        ctx.drawImage(backgroundImg, 0, 0, width, height);

        const drawing = new Image();
        drawing.crossOrigin = 'anonymous';

        drawing.src = canvasDraw.getDataURL('image/png');

        drawing.onload = () => {
          ctx.drawImage(drawing, 0, 0, width, height);
          resolve(canvas.toDataURL('image/png'));
        };

        drawing.onerror = (error) => {
          reject(error);
        };
      };

      backgroundImg.onerror = (error) => {
        reject(error);
      };
    });
  };

  const saveImages = async () => {
    const formData = new FormData();

    formData.append('examId', examId);
    formData.append('courseId', courseId);
    formData.append('questionId', fullQues.id);
    formData.append('clientId', clientId);
    formData.append('writtenScore', mark);
    formData.append('prevWrittenScore', fullQues.stuAns?.writtenScore);
    formData.append('mark', fullQues.mark);
    formData.append(
      'filenames',
      images.map((img) => img.filename)
    );

    setLoading(true);
    setPopup({ text: 'Getting the images ready...', state: '' });

    try {
      await Promise.all(
        images.map(async (image) => {
          const canvasRef = canvasRefs[image.filename].current;
          const imgSrc = reqImgWrapper(image.path);
          const width = scaledDimensions[image.filename].width;
          const height = scaledDimensions[image.filename].height;

          const dataUrl = await mergeCanvasWithBackground(
            canvasRef,
            imgSrc,
            width,
            height
          );
          const blob = await dataURLtoBlob(dataUrl);
          formData.append('examsAns', blob, image.filename);
        })
      );
    } catch (error) {
      setPopup({
        text: 'Error while processing images:' + error.message,
        state: 'error',
      });
      setLoading(false);
      return;
    }

    // Uncomment below to actually save images
    setPopup({ text: 'Submitting...', state: '' });

    axios
      .post(reqs.ADMIN_WRITTEN_EVALUATE_EXAM, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) {
          setPopup({ text: '', state: '' });
          setReloadTrigger((reloadTrigger) => !reloadTrigger);
        }
        setLoading(false);
      })
      .catch((err) => {
        setPopup({ text: err.response.data.msg, state: 'error' });
        setLoading(false);
      });
  };

  // Change the drawing tool (pen or eraser)
  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
    Object.values(canvasRefs).forEach((ref) => {
      if (ref.current) {
        ref.current.eraseMode = selectedTool === 'eraser';
      }
    });
  };

  // Undo last drawing action on a specific canvas
  const handleUndo = (filename) => {
    const canvasRef = canvasRefs[filename].current;
    if (canvasRef) {
      canvasRef.undo();
    }
  };

  // Clear all drawings on a specific canvas
  const handleClear = (filename) => {
    const canvasRef = canvasRefs[filename].current;
    if (canvasRef) {
      canvasRef.clear();
    }
  };

  // Rotate the image by 90 degrees clockwise or counterclockwise
  const handleRotate = (filename, direction) => {
    setRotations((prev) => ({
      ...prev,
      [filename]: prev[filename] + (direction === 'right' ? 90 : -90),
    }));
  };

  return (
    <div className='App bg-gray-100 py-8'>
      {popup.text && (
        <Popup
          loading={loading}
          state={popup.state}
          btnDisabled={loading}
          text={popup.text}
          buttonLable={'Close'}
          onClick={() => setPopup({ text: '', state: '' })}
        />
      )}
      <h1 className='text-lg font-bold mb-4 text-left'>Q. {fullQues.title}</h1>
      {!isNoAns ? (
        <>
          <div className='grid grid-cols-1 overflow-auto gap-6'>
            {images.map((image) => (
              <div
                key={image.filename}
                className='border rounded-lg relative w-fit m-auto'
              >
                <div className='flex flex-row justify-center w-full gap-1 mb-0.5'>
                  <button
                    onClick={() => handleUndo(image.filename)}
                    className='p-2 bg-onPrimary-main hover:bg-secondary-dark rounded-md'
                  >
                    <FaUndo className='text-lg text-white' />
                  </button>
                  <button
                    onClick={() => handleClear(image.filename)}
                    className='p-2 bg-onPrimary-main hover:bg-secondary-dark rounded-md'
                  >
                    <FaEraser className='text-lg text-white' />
                  </button>
                  {/* <button
                    onClick={() => handleRotate(image.filename, 'left')}
                    className='p-2 bg-onPrimary-main hover:bg-secondary-dark rounded-md'
                  >
                    <AiOutlineRotateLeft className='text-lg text-white' />
                  </button>
                  <button
                    onClick={() => handleRotate(image.filename, 'right')}
                    className='p-2 bg-onPrimary-main hover:bg-secondary-dark rounded-md'
                  >
                    <AiOutlineRotateRight className='text-lg text-white' />
                  </button> */}
                </div>
                <div
                  style={{
                    width: scaledDimensions[image.filename]?.width,
                    height: scaledDimensions[image.filename]?.height,
                    transform: `rotate(${rotations[image.filename]}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  {scaledDimensions[image.filename] && (
                    <CanvasDraw
                      ref={canvasRefs[image.filename]}
                      imgSrc={reqImgWrapper(image.path)}
                      canvasWidth={scaledDimensions[image.filename].width}
                      canvasHeight={scaledDimensions[image.filename].height}
                      brushRadius={tool === 'pen' ? 2 : 10} // Adjust brush size based on tool
                      brushColor='#ff0000'
                      catenaryColor='#ff0000'
                      style={{
                        transform: `rotate(${-rotations[image.filename]}deg)`,
                      }}
                    />
                  )}
                </div>

                <p className='text-center py-2 bg-gray-100'>
                  {image.originalname || image.filename}
                </p>
              </div>
            ))}
          </div>

          <div className='flex justify-center items-center mt-4'>
            <div className='grid grid-cols-[auto,1fr,auto,auto] shadow-sm'>
              <div className='bg-secondary-dark text-[1rem] p-2 grid place-items-center text-sm text-white'>
                Score:
              </div>
              <ValuedInput
                classes={'!rounded-none !text-[.9rem] w-[120px]'}
                labelClasses={'hidden'}
                inputProps={{
                  placeholder: 'Written Score',
                  id: fullQues.id,
                  name: `score_${fullQues.id}`,
                  value: mark,
                  onChange: (e) => setMark(e.target.value),
                }}
              />
              <div className='bg-white text-[1rem] p-2 grid place-items-center text-sm text-black'>
                / {fullQues.mark}
              </div>
              <PrimaryButton
                onClick={saveImages}
                classes={`bg-onPrimary-main text-primary-main !rounded-none h-full`}
              >
                {fullQues?.stuAns?.isChecked ? 'Save Edits' : 'Done'}
              </PrimaryButton>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full justify-center py-8 text-medium text-[.9rem] text-orange-600'>
          The Student did not answer this question
        </div>
      )}
    </div>
  );
};

export default PerQuesEval;
