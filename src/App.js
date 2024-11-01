import React, { useRef, useState } from 'react';
import domtoimage from 'dom-to-image';

const HtmlToImageWithUploadAndBackground = () => {
  const elementRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  // Görsel Kaydetme Fonksiyonu
  const handleCapture = () => {
    const element = elementRef.current;

    domtoimage.toPng(element)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'my-image.png';
        link.click();
      })
      .catch((error) => {
        console.error('Görsel oluşturulurken hata oluştu!', error);
      });
  };

  // Görsel Dosya Yükleme Fonksiyonu
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Drag-and-Drop İşlemleri
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Görsel Alanı */}
      <div
        ref={elementRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-gray-300 flex items-center justify-center mb-4"
        style={{
          width: '400px',
          height: '400px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {/* Yüklenen Görsel */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Yüklenen Görsel"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p>Görseli buraya sürükleyip bırakın veya yükleyin</p>
        )}
      </div>

      {/* Dosya Yükleme Butonu */}
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

      {/* Kaydetme Butonu */}
      <button onClick={handleCapture} className="px-4 py-2 bg-green-500 text-white rounded">
        Görsel Olarak Kaydet
      </button>
    </div>
  );
};

export default HtmlToImageWithUploadAndBackground;