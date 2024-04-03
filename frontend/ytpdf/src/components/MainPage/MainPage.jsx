import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import GeneratePDF from '../GeneratePDF/GeneratePDF';



const MainPage = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('name');
  const [activePDF, setActivePDF] = useState(false);
  const inputRef = useRef()
  
 
  // Handling focus of my input

  useEffect(()=>{
      inputRef.current.focus()
  },[])

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/download?url=${url}`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error downloading video. Please try again.");
      setData(null);
    }
    setLoading(false);
    setUrl("");
  };
 




  return (
    <>
      <div>
      <div className='flex flex-row bg-black  text-white w-[610px] ml-[500px] mt-6  rounded-full font-semibold p-5 justify-end text-[15px]'>
                        <div className=' flex flex-row '>
                            <div className=' flex flex-row mr-10  '>
                               
                                <div className=' hover:bg-blue-800 rounded-xl p-2 cursor-pointer' onClick={()=>setActivePDF(true)} >GENERATE NOTES-PDF</div>
                               
                                <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer'  onClick={()=>setActivePDF(false)}>DOWNLOAD VIDEO</div>
                                
                               
                            </div>
                            <div className=' flex flex-row space-x-3'>
                                <div className=" bg-yellow-300 text-black rounded-lg p-2">{name}</div>
                                <Link to="/">
                                <div className=' cursor-pointer hover:bg-blue-800 rounded-md p-2' >LOGOUT</div>
                                </Link>
                            </div>
                        </div>
                    </div>
      </div>
     {activePDF ? <GeneratePDF/> :
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
      </>
     }
      {loading && <div>Loading...</div>}
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

export default MainPage;
