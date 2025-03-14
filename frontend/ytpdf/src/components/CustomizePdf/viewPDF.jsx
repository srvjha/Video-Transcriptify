import { useState } from "react";
import { Document, Page } from "react-pdf";
import { useSelector } from "react-redux";

const PdfViewer = () => {
  const [pdfData, setPdfData] = useState(null);
  const file = useSelector((files) => files.fileStatus.file);
  console.log("View wala: ",file);
//   const selectedFile = file;
   
      //setPdfData(URL.createObjectURL(selectedFile));    

  return (
    <div>
     
      {/* {pdfData && (
        <Document file={pdfData}>
          <Page pageNumber={1} />
        </Document>
      )} */}

      pdf
    </div>
  );
};

export default PdfViewer;
