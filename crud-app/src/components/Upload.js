import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import UploadModal from './UploadModal';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import './css/Upload.css';

const Upload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const canvasRef = useRef(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isPDF && uploadedFileUrl) {
      renderPDF(uploadedFileUrl);
    }
  }, [isPDF, uploadedFileUrl]);

  const renderPDF = (fileUrl) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      pdfjsLib.getDocument(fileUrl).promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          const viewport = page.getViewport({ scale: 1.5 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext);
        });
      });
    }
  };

  const handleFileUpload = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    setUploadedFileUrl(fileUrl);
    setIsPDF(file.type === 'application/pdf');

    const formData = new FormData();
    formData.append('file', file);

    try { // 서버로 파일 업로드 요청
      const response = await fetch('http://localhost:8003/ai', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();

      if (result === '0') {
        setResultMessage('문서가 조작되었습니다.');
      } else if (result === '1') {
        setResultMessage('문서가 조작되지 않았습니다.');
      } else {
        setResultMessage('알 수 없는 응답을 받았습니다.');
      }

      setIsFileUploaded(true);

    } catch (error) {
      setResultMessage('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      handleModalClose();
    }
  };
/* 파일 업로드 후 결과 메시지 표시 테스트용 코드
  const handleFileUpload = (file) => {
    const fileUrl = URL.createObjectURL(file);
    setUploadedFileUrl(fileUrl);
    setResultMessage('문서가 조작되지 않았습니다.');
    setIsFileUploaded(true);
    setIsPDF(file.type === 'application/pdf');  // 파일 타입이 PDF인지 확인
    
    handleModalClose();
  };
*/

  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <h1>{isFileUploaded ? 'Result' : 'File Upload'}</h1>  {/* 파일 업로드 후 제목 변경 */}
        
        {!isFileUploaded && (
          <button className="click-me-button3" onClick={handleModalOpen}>파일 업로드</button>
        )}

        {isFileUploaded && (
          <div className="result-section">
            {isPDF ? (
              <canvas ref={canvasRef} />
            ) : (
              <img src={uploadedFileUrl} alt="Uploaded file preview" />
            )}
            <p>{resultMessage}</p>  {/* 서버로부터 받은 결과 메시지 표시 */}
          </div>
        )}
      </div>
      <Footer />
      <UploadModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onUpload={handleFileUpload} 
      />
    </div>
  );
};

export default Upload;
