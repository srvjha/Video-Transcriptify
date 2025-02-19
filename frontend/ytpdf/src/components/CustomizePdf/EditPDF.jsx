import { useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useSelector } from 'react-redux';

const EditPDF = () => {
  const viewer = useRef(null);
  const [pdfBuffer, setPdfBuffer] = useState(null);
  const file = useSelector((files)=>files.fileStatus.file)
  console.log(file)
  const blobUrl =  URL.createObjectURL(file);

  // useEffect(() => {
  //   const fetchPdf = async () => {
  //     try {
  //       const blobUrl =  URL.createObjectURL(file);
  //       console.log("blogURL: ",blobUrl)
  //       const response = await fetch(blobUrl);
  //       const blob = await response.blob();
  //       const arrayBuffer = await blob.arrayBuffer();

  //       setPdfBuffer(new Uint8Array(arrayBuffer)); // Convert ArrayBuffer to Uint8Array
  //     } catch (error) {
  //       console.error("Error fetching PDF:", error);
  //     }
  //   };

  //   fetchPdf();
  // }, []);

  useEffect(() => {
    if (blobUrl) {
      console.log({blobUrl})
      WebViewer(
        {
          path: 'updated-pdf',
          licenseKey: 'demo:1739605186710:617c1e7f03000000005d34f11c19de76826b932184c9fc7f4c853926ee',
          initialDoc: blobUrl, // Pass Uint8Array
        },
        viewer.current
      ).then((instance) => {
        const { documentViewer } = instance.Core;
        console.log("PDF Loaded:", documentViewer);
      });
    }
  }, [pdfBuffer]); // Runs when pdfBuffer is available

  return <div className="bg-red-100" ref={viewer} style={{ height: '100vh' }}></div>;
};

export default EditPDF;
