import { useState} from 'react';
import pdfUpload from '../../assets/pdfUpload.png'
import { useNavigate } from 'react-router-dom';
import {str10_36} from 'hyperdyperid/lib/str10_36';
import { useDispatch} from 'react-redux';
import {upload} from '../../Redux/slices/fileSlice.js'

const CustomizePdf = () => {
  
   
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const edit_pdf_id = str10_36();
    const handleFileUpload = (e)=>{
     // console.log("clicked ",e.target.files[0])
      const fileSize = (e.target.files[0].size) / (1024 * 1024)  // in mb
      if(fileSize > 4){
        setError("File size limit(4mb) exceeded.")
      }
      else {
        const file = e.target.files[0];
        console.log("file: ",file)
        console.log("URL: ",URL.createObjectURL(file))
       
       alert("Feature Coming soon")
        // Dispatch with the new object
        // dispatch(upload({ fileStatus: true, file }));
        // navigate(`/edit-pdf/${edit_pdf_id}`)
      }
      
    }
   
  return (
    <div className='w-[1200px] mx-auto'>
         
        
         <div className= "flex flex-col justify-center items-center gap-4 bg-white w-full h-72 rounded-lg border-2 border-black shadow-lg shadow-black inset-0 ">
         <div className = "p-2 border-2 rounded-lg border-dotted border-black h-[93%] w-[98%] flex flex-col justify-center items-center gap-4">
          <div>
            <img src={pdfUpload} alt="pdf-icon" width={50} height={50} />
          </div>
          <p className='text-xl font-semibold'> Drop document here to upload</p>
          <label className="bg-black text-white px-14 py-3 rounded-lg cursor-pointer inline-block">
            Select from device
            <input
              type="file"
              className="hidden"
              accept='application/pdf,.pdf'
              id='pdf'
              
              onChange={(e)=>handleFileUpload(e)}
            />
          </label>
         {error.length>0 && <div className='text-red-500 font-semibold mt-2'>{error}</div>}
          </div>
         </div>
        
    </div>
  )
}

export default CustomizePdf

