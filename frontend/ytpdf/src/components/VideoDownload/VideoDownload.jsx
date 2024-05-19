import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const VideoDownload = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  const inputRef = useRef()
  
 
  // Handling focus of my input

  useEffect(()=>{
      inputRef.current.focus()
  },[])

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/users/download?url=${url}`);
      console.log("RES :",response)
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error downloading video. Please try again.");
      console.log("ERROR: ",error)
      setData(null);
    }
    setLoading(false);
    setUrl("");
  };
 




  return (
    
      
    
     <>
      <div className="flex justify-center mt-10">
       
          <input
            type="text"
            className="outline-none ml-[200px] p-2 h-14 w-[700px] text-black placeholder-white bg-transparent border-none rounded-md text-lg"
            value={url}
            ref={(input)=>(inputRef.current=input)}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder='Enter Your Youtube URL...'
          />
        </div>

      <div
        className='bg-black pb-3 pt-3 pl-2 mt-6  h-12 w-32 ml-[740px] text-white text-[15px] rounded-md cursor-pointer'
        onClick={(e) => handleDownload(e)}
      >
        Download Video
      </div>
      
    
      {loading && <div className="my-4 flex justify-center">Loading...</div>}
      {error && <div className="text-red-700 font-bold mt-4">{error}</div>}
      {data && (
        <>
          <div className="my-4 flex justify-center">
            <iframe
              width="570"
              height="320"
              src={data.url}
              title="video"
            />
          </div>
          <div className=' flex justify-center'>
          <table className='bg-blue-500 border border-black'>
            <thead className=' bg-red-300 p-2 border border-black '>
              <tr className=' text-xl border border-gray-600'>
                <th>Media Type</th>              
                <th>Resolution</th>               
                <th>Codec</th>
                <th>Download Link</th>
               
              </tr>
            </thead>
            <tbody className=' bg-blue-500'>
              {data.info.map((formatName, index) => (
                <tr key={index} className=' text-lg'>
                  <td>{formatName.mimeType.startsWith("video/") ? "Video" : "Audio"}</td>
                  <td>{formatName.hasVideo ? formatName.height + "p" : "-"}</td>
                  <td>{formatName.mimeType.split(";")[0]}</td>
                  <td>
                    <a
                      href={formatName.url}
                      target="_blank"
                      download
                      className="outline-none italic underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      
          
          
        </>
              
      )}
              
    </>
  );
};

export default VideoDownload;
