import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';
import denemeimage from "./assets/111.jpeg"

const HtmlToImage = () => {
  // Kaydetmek istediğimiz elemanın referansı
  const elementRef = useRef(null);

  // Görsel Olarak Kaydetme Fonksiyonu
  const handleCapture = () => {
    const element = elementRef.current;

    domtoimage.toPng(element)
      .then((dataUrl) => {
        // Data URL'yi indirme işlemi
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'my-image.png';
        link.click();
      })
      .catch((error) => {
        console.error('Görsel oluşturulurken hata oluştu!', error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
  {/* Görsel olarak kaydedilecek içerik */}
  <div ref={elementRef} className="bg-blue-500 text-white p-10 rounded-md text-center">
    <h1 className="text-3xl">Merhaba, bu bir test görselidir!</h1>
    <img src={denemeimage} width="400px" />
    <p>Bu içerik görsel olarak kaydedilecek.</p>

    {/* Kaydetme Butonu */}
    <button onClick={handleCapture} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
      Görsel Olarak Kaydet
    </button>
  </div>
</div>
  );
};

export default HtmlToImage;