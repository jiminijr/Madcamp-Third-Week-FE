import React, { useRef, useState, useEffect } from 'react'; // useRef와 useEffect 추가
import { useParams } from 'react-router-dom'; 
import * as emailjs from "emailjs-com";
import "./style.css";
import Headermain from '../../header';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import Bok1 from '../../assets/images/bok1.png';
import Bok2 from '../../assets/images/bok2.png';
import Bok3 from '../../assets/images/bok3.png';
import Bok4 from '../../assets/images/bok4.png';


export const ContactUs = () => {
  const { userId } = useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]); // 여러 사진을 저장할 배열
  const [timer, setTimer] = useState(0); // 타이머 상태
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [captureCount, setCaptureCount] = useState(0); 
  const [loadedImages, setLoadedImages] = useState([]);


  const frameImages = [Bok1, Bok2, Bok3, Bok4];

  const frameImageDetails = [
    { src: Bok1, dx: 200, dy: 40, dWidth: 400, dHeight: 400 },
    { src: Bok2, dx: 200, dy: 44, dWidth: 400, dHeight: 400 },
    { src: Bok3, dx: 0, dy: 44, dWidth: 400, dHeight: 400 },
    { src: Bok4, dx: 250, dy: 60, dWidth: 500, dHeight: 500 },
  ];

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        console.log('Image loaded:', src); // 로드된 이미지 URL 출력
        resolve(img);
      };
      img.onerror = reject;
    });
  };
  
  
  
  useEffect(() => {
    Promise.all(frameImageDetails.map(imageDetail => loadImage(imageDetail.src)))
    .then(images => {
      console.log('All images loaded:', images); // 로드된 모든 이미지 출력
      setLoadedImages(images);
      setImagesLoaded(true);
    })
    .catch(error => {
      console.error('Failed to load images', error);
      setImagesLoaded(false);
    });

    const initializeWebcam = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.style.transform = 'scaleX(-1)';
          });
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    initializeWebcam();
  }, []);
  const handleCapture = (callback) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // 비디오의 현재 프레임을 캔버스에 그립니다
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    // 캡처 카운트에 해당하는 오버레이 이미지와 정보를 가져옵니다
    if (captureCount < frameImageDetails.length) {
      const { src, dx, dy, dWidth, dHeight } = frameImageDetails[captureCount];
      const img = loadedImages[captureCount]; // 이미 로드된 이미지
      // 위치와 크기를 지정하여 이미지를 그립니다
      context.drawImage(img, dx, dy, dWidth, dHeight);
    }
  
    // 렌더링을 위해 충분한 시간을 기다린 후에 사진을 저장합니다
    setTimeout(() => {
      const photoDataUrl = canvas.toDataURL('image/jpeg');
      setPhotos(prev => [...prev, photoDataUrl]);
    
      // 캡처가 완료되었음을 알리기 위해 콜백 함수를 호출합니다
      if (callback) callback();
    }, 100); // 100ms는 예시이며, 필요에 따라 조정할 수 있습니다
  };
  
  
  const startCaptureSequence = () => {
  setPhotos([]);
  setCaptureCount(0);
  capturePhoto(3, 0);
};


  const combinePhotos = () => {
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = 1000; // 2개의 사진을 가로로 배치
    combinedCanvas.height = 880; // 2개의 사진을 세로로 배치
    const ctx = combinedCanvas.getContext('2d');
  
    // 각 사진을 적절한 위치에 그립니다
    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      const x = (index % 2) * 500;
      const y = Math.floor(index / 2) * 440;
      img.onload = () => {
        ctx.drawImage(img, x, y, 500, 440);
      };
    });
  
    // 결합된 이미지 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(combinedCanvas.toDataURL('image/jpeg'));
      }, 0);
    });
  };
  
  
    const handleSave = () => {
      combinePhotos().then(imageToSave => {
        const link = document.createElement('a');
        link.href = imageToSave;
        link.download = 'photobooth.jpg';
        link.click();
      });
    };

    
    const capturePhoto = (countdown, currentCount) => {
      if (countdown > 0) {
        setTimer(countdown);
        setTimeout(() => capturePhoto(countdown - 1, currentCount), 1000);
      } else {
        setTimer(0);
        // 현재 이미지를 캡처하고 나면 다음 이미지를 준비합니다
        handleCapture(() => {
          if (currentCount < frameImages.length - 1) {
            setTimeout(() => {
              setCaptureCount(currentCount + 1); // 다음 이미지로 업데이트
              capturePhoto(3, currentCount + 1); // 다음 이미지 캡처
            }, 500); // 사진이 찍히고 다음 사진을 찍기 전의 짧은 지연
          }
        });
      }
    };
    useEffect(() => {
      const drawFrame = () => {
        if (videoRef.current && videoRef.current.readyState === 4 && imagesLoaded) {
          const context = canvasRef.current.getContext('2d');
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (captureCount < frameImageDetails.length) {
            const { dx, dy, dWidth, dHeight } = frameImageDetails[captureCount];
            const img = loadedImages[captureCount];
            if (img instanceof HTMLImageElement) {
              context.drawImage(img, dx, dy, dWidth, dHeight);
            } else {
              console.error('The loaded image is not a valid HTMLImageElement', img);
              // 이미지가 유효하지 않으면, 재귀 호출을 중단합니다.
              return;
            }
          }
    
          // 타이머 표시
          if (timer > 0) {
            context.font = '100px arial'; // 폰트 크기와 스타일을 설정합니다.
            context.fillStyle = 'white'; // 텍스트 색상을 설정합니다.
            context.textAlign = 'center'; // 텍스트를 캔버스의 가운데에 위치시킵니다.
            context.fillText(timer.toString(), canvasRef.current.width / 2, canvasRef.current.height / 2); // 타이머를 그립니다.
          }
          
          requestAnimationFrame(drawFrame);
        }
      };
    
      drawFrame();
    }, [captureCount, loadedImages, frameImageDetails, imagesLoaded, timer]); // 의존성 배열에 timer 추가
    
  return (
    <HelmetProvider>
      <Headermain userId={userId} />
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title> Photobooth</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Photobooth</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
          <button onClick={startCaptureSequence} className="take_pic_button">4컷 사진 찍기</button>
        </Row>
        
    {/* WebcamCapture 컴포넌트 추가 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {<video ref={videoRef} autoPlay style={{ display: 'none', transform: 'scaleX(-1)' }} />}
          <canvas ref={canvasRef} width={600} height={440} />
          <div className="WebcamCapture">
          {/* {timer > 0 && <div className="timer">{timer}</div>} */}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="PhotoGallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Capture ${index + 1}`} style={{ width: '100%', objectFit: 'cover' }} />
          ))}
        </div>
        <button onClick={handleSave} className="save_pic_button">사진 다운로드</button>
        <br></br>
        <br></br>
        <br></br>
         </div>
      </Container>
    </HelmetProvider>
  );
};
